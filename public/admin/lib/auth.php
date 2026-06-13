<?php
/**
 * Forex Drilling CMS — authentification (2e barrière, derrière l'Apache Basic
 * Auth posée par admin/.htaccess). Session PHP durcie + mot de passe hashé.
 *
 * Le hash vit dans cms-data/config.secret.php (hors web, NON versionné) :
 *   <?php return ['PASSWORD_HASH' => '$2y$...'];
 * Générer le hash :  php -r "echo password_hash('motdepasse', PASSWORD_DEFAULT);"
 */
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function auth_boot(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    session_name('forex_cms');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/admin',
        'secure'   => true,       // HTTPS uniquement
        'httponly' => true,       // inaccessible au JS
        'samesite' => 'Strict',   // pas d'envoi cross-site (anti-CSRF de fond)
    ]);
    session_start();
}

function auth_password_hash(): ?string {
    if (!is_readable(CMS_SECRET_FILE)) return null;
    $secret = include CMS_SECRET_FILE;
    return (is_array($secret) && !empty($secret['PASSWORD_HASH'])) ? (string) $secret['PASSWORD_HASH'] : null;
}

/** Aucun mot de passe défini → premier démarrage (écran de configuration). */
function auth_needs_setup(): bool {
    return auth_password_hash() === null;
}

/**
 * Définit le mot de passe éditeur au premier démarrage : écrit le HASH (jamais
 * le clair) dans cms-data/config.secret.php. Refuse d'écraser un secret existant
 * (la config ne peut être posée qu'une fois ; pour changer ensuite, éditer/
 * supprimer le fichier sur l'hôte). 10 caractères minimum.
 */
function auth_set_password(string $password): bool {
    if (!auth_needs_setup()) return false;       // ne jamais écraser
    if (strlen($password) < 10) return false;
    if (!cms_ensure_dir(CMS_DATA_DIR)) return false;
    $php = "<?php\nreturn " . var_export(['PASSWORD_HASH' => password_hash($password, PASSWORD_DEFAULT)], true) . ";\n";
    $tmp = @tempnam(CMS_DATA_DIR, '.sec');
    if ($tmp === false) return false;
    if (@file_put_contents($tmp, $php) === false) { @unlink($tmp); return false; }
    @chmod($tmp, 0600);
    if (!@rename($tmp, CMS_SECRET_FILE)) { @unlink($tmp); return false; }
    return true;
}

function auth_is_logged_in(): bool {
    auth_boot();
    return !empty($_SESSION['cms_authed']);
}

/** Vérifie le mot de passe ; régénère l'ID de session en cas de succès. */
function auth_login(string $password): bool {
    auth_boot();
    $hash = auth_password_hash();
    if ($hash === null) { error_log('[cms] config.secret.php / PASSWORD_HASH manquant'); return false; }
    if (!password_verify($password, $hash)) return false;
    session_regenerate_id(true);            // anti fixation de session (A07)
    $_SESSION['cms_authed'] = true;
    $_SESSION['cms_login_at'] = time();
    return true;
}

function auth_logout(): void {
    auth_boot();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'] ?? '', $p['secure'], $p['httponly']);
    }
    session_destroy();
}

/** À appeler en tête de toute action non-publique : redirige vers le login sinon. */
function auth_require(): void {
    if (!auth_is_logged_in()) {
        header('Location: /admin/?action=login');
        exit;
    }
}
