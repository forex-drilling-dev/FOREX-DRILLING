<?php
/**
 * Forex Drilling CMS — protection CSRF (OWASP A01). Jeton par session,
 * comparé en temps constant (hash_equals). Requis sur TOUTE action mutante
 * (save / delete / upload). En plus du cookie SameSite=Strict (défense en profondeur).
 */
declare(strict_types=1);
require_once __DIR__ . '/auth.php';

function csrf_token(): string {
    auth_boot();
    if (empty($_SESSION['cms_csrf'])) {
        $_SESSION['cms_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['cms_csrf'];
}

function csrf_check(?string $token): bool {
    auth_boot();
    return is_string($token)
        && !empty($_SESSION['cms_csrf'])
        && hash_equals($_SESSION['cms_csrf'], $token);
}

/** Refuse la requête (403) si le jeton est absent/invalide. */
function csrf_require(?string $token): void {
    if (!csrf_check($token)) {
        http_response_code(403);
        header('Content-Type: text/plain; charset=utf-8');
        echo 'CSRF token invalid';
        exit;
    }
}
