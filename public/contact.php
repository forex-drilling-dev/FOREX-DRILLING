<?php
/**
 * Forex Drilling — endpoint d'envoi du formulaire de contact.
 * ---------------------------------------------------------------------------
 * Reçoit le POST du formulaire (JSON), valide, puis envoie un e-mail via
 * l'API Resend (https://resend.com). La clé API reste côté serveur.
 *
 * Hébergement : mutualisé Yulpa (Apache + PHP). Ce fichier est dans public/,
 * donc `next build` (output: export) le copie à la racine de out/ et il part
 * dans le zip FTP. Il est servi à l'URL  /contact.php.
 *
 * CONFIG DE LA CLÉ (par ordre de priorité) :
 *   1. Variable d'environnement RESEND_API_KEY (si réglable dans le manager iWal)
 *   2. Fichier  contact.secret.php  placé À CÔTÉ via FTP (NON versionné, NON
 *      inclus dans le zip), qui retourne :
 *          <?php return ['RESEND_API_KEY' => 're_xxx', 'CONTACT_TO' => 'admin@forexdrilling.com'];
 * ---------------------------------------------------------------------------
 */

header('Content-Type: application/json; charset=utf-8');

// — Même origine uniquement : pas d'en-tête CORS (le site et l'endpoint
//   partagent le domaine). La CSP du .htaccess impose déjà connect-src 'self'.

// 1) Méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// 2) Lecture du corps (JSON, avec repli sur $_POST)
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

function field($d, $k) { return isset($d[$k]) ? trim((string) $d[$k]) : ''; }

/**
 * Limitation de débit par IP, sans dépendance (stockage fichier dans le tmp
 * système). Fenêtre glissante : au plus $max envois par $window secondes et par
 * IP. Anti-spam / anti-épuisement du quota Resend.
 *
 * Fail-open assumé : si le tmp n'est pas inscriptible (selon l'hébergement), on
 * N'EMPÊCHE PAS l'envoi — la limite est une protection anti-abus, pas un
 * contrôle d'accès ; on ne bloque jamais un vrai client à cause d'un souci I/O.
 *
 * Utilise REMOTE_ADDR (non falsifiable). Derrière un CDN/proxy (Cloudflare…),
 * il faudrait lire X-Forwarded-For à la place.
 */
function rate_limit_ok($max, $window) {
    $ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $dir = sys_get_temp_dir() . '/forex_contact_rl';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return true; // stockage indisponible → fail-open
    }
    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $fp = @fopen($file, 'c+');
    if ($fp === false) return true; // I/O impossible → fail-open

    $allowed = true;
    if (flock($fp, LOCK_EX)) {
        $now    = time();
        $cutoff = $now - $window;
        $hits   = json_decode(stream_get_contents($fp), true);
        if (!is_array($hits)) $hits = [];
        $hits = array_values(array_filter($hits, static function ($t) use ($cutoff) {
            return is_int($t) && $t > $cutoff;     // ne garde que la fenêtre courante
        }));
        if (count($hits) >= $max) {
            $allowed = false;
        } else {
            $hits[] = $now;
            ftruncate($fp, 0);
            rewind($fp);
            fwrite($fp, json_encode($hits));
        }
        flock($fp, LOCK_UN);
    }
    fclose($fp);
    return $allowed;
}

// 3) Honeypot anti-spam : champ « website » caché. Rempli = bot → on renvoie
//    un faux succès sans rien envoyer (le bot ne réessaie pas).
if (field($data, 'website') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

// 3 bis) Limitation de débit : au plus 5 envois / 10 min / IP. APRÈS le honeypot,
//        pour que les bots piégés n'incrémentent pas le compteur.
if (!rate_limit_ok(5, 600)) {
    http_response_code(429);
    header('Retry-After: 600');
    echo json_encode(['ok' => false, 'error' => 'rate_limited']);
    exit;
}

// 4) Validation (miroir du schéma Zod côté client)
$name    = field($data, 'name');
$email   = field($data, 'email');
$company = field($data, 'company');
$role    = field($data, 'role');
$country = field($data, 'country');
$scope   = field($data, 'scope');
$message = field($data, 'message');

$allowedScopes = ['mining', 'exploration', 'civil', 'groundwater', 'other'];
$errors = [];
if (mb_strlen($name) < 2)                                   $errors[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))             $errors[] = 'email';
if (mb_strlen($company) < 2)                                $errors[] = 'company';
if (mb_strlen($country) < 2)                                $errors[] = 'country';
if (!in_array($scope, $allowedScopes, true))                $errors[] = 'scope';
if (mb_strlen($message) < 20)                               $errors[] = 'message';

if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'validation', 'fields' => $errors]);
    exit;
}

// 5) Récupération de la configuration (clé + destinataire)
$apiKey    = getenv('RESEND_API_KEY') ?: '';
$contactTo = getenv('CONTACT_TO_EMAIL') ?: '';
$secretPath = __DIR__ . '/contact.secret.php';
if (is_readable($secretPath)) {
    $secret = include $secretPath;
    if (is_array($secret)) {
        if ($apiKey === '' && !empty($secret['RESEND_API_KEY'])) $apiKey = $secret['RESEND_API_KEY'];
        if ($contactTo === '' && !empty($secret['CONTACT_TO']))  $contactTo = $secret['CONTACT_TO'];
    }
}
if ($contactTo === '') $contactTo = 'admin@forexdrilling.com';
// TODO : une fois forexdrilling.com vérifié dans Resend (resend.com/domains),
// repasser le défaut à 'website@forexdrilling.com' (ou définir CONTACT_FROM
// dans contact.secret.php). Tant que le domaine n'est pas vérifié, Resend
// n'accepte QUE onboarding@resend.dev comme expéditeur, et UNIQUEMENT vers
// l'adresse du compte Resend (admin@forexdrilling.com).
$fromEmail = getenv('CONTACT_FROM_EMAIL') ?: '';
if ($fromEmail === '' && isset($secret) && is_array($secret) && !empty($secret['CONTACT_FROM'])) {
    $fromEmail = $secret['CONTACT_FROM'];
}
if ($fromEmail === '') $fromEmail = 'onboarding@resend.dev';

if ($apiKey === '') {
    // Mauvaise config serveur : on logge mais on ne révèle rien au client.
    error_log('[contact.php] RESEND_API_KEY manquante.');
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'server_misconfigured']);
    exit;
}

// 6) Construction de l'e-mail
$subject = "New enquiry — {$company} ({$scope})";
$lines = [
    "Name: {$name}",
    "Email: {$email}",
    "Company: {$company}",
    "Role: " . ($role !== '' ? $role : '—'),
    "Country: {$country}",
    "Scope: {$scope}",
    '',
    $message,
];
$text = implode("\n", $lines);

$payload = json_encode([
    'from'     => "Forex Drilling Website <{$fromEmail}>",
    'to'       => [$contactTo],
    'reply_to' => $email,
    'subject'  => $subject,
    'text'     => $text,
]);

// 7) Appel de l'API Resend — cURL si dispo, sinon repli sur les flux HTTP
$endpoint = 'https://api.resend.com/emails';
$httpCode = 0;
$respBody = '';

if (function_exists('curl_init')) {
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_HTTPHEADER     => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
    ]);
    $respBody = curl_exec($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($respBody === false) error_log('[contact.php] cURL: ' . curl_error($ch));
    curl_close($ch);
} else {
    $ctx = stream_context_create([
        'http' => [
            'method'        => 'POST',
            'header'        => "Authorization: Bearer {$apiKey}\r\nContent-Type: application/json\r\n",
            'content'       => $payload,
            'timeout'       => 15,
            'ignore_errors' => true,
        ],
    ]);
    $respBody = @file_get_contents($endpoint, false, $ctx);
    if (isset($http_response_header[0]) &&
        preg_match('#\s(\d{3})\s#', $http_response_header[0], $m)) {
        $httpCode = (int) $m[1];
    }
}

// 8) Réponse
if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['ok' => true]);
} else {
    error_log("[contact.php] Resend HTTP {$httpCode}: {$respBody}");
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
