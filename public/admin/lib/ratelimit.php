<?php
/**
 * Forex Drilling CMS — limitation de débit par IP des tentatives de login
 * (OWASP A07, anti brute-force). Même approche fichier que contact.php :
 * fenêtre glissante, fail-open si le stockage est indisponible (la limite est
 * une protection, pas un contrôle d'accès — l'auth reste exigée par ailleurs).
 *
 * REMOTE_ADDR (non falsifiable). Derrière un CDN, lire X-Forwarded-For.
 */
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function rl_ok(string $bucket, int $max = 5, int $window = 600): bool {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!cms_ensure_dir(CMS_RL_DIR)) return true; // stockage indispo → fail-open
    $file = CMS_RL_DIR . '/' . hash('sha256', $bucket . '|' . $ip) . '.json';
    $fp = @fopen($file, 'c+');
    if ($fp === false) return true;

    $allowed = true;
    if (flock($fp, LOCK_EX)) {
        $now    = time();
        $cutoff = $now - $window;
        $hits   = json_decode((string) stream_get_contents($fp), true);
        if (!is_array($hits)) $hits = [];
        $hits = array_values(array_filter($hits, static fn($t) => is_int($t) && $t > $cutoff));
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
