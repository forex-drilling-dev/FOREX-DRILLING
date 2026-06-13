<?php
/**
 * Forex Drilling CMS — configuration centrale (chemins + contraintes).
 * AUCUN secret ici (le hash du mot de passe vit dans cms-data/config.secret.php).
 *
 * Hébergement mutualisé Yulpa (Apache + PHP). Ce dossier `public/admin/` est
 * copié à la racine de out/ par `next build` puis livré par FTP.
 *   __DIR__ = .../admin/lib   →   racine web = realpath(__DIR__/../..)
 */
declare(strict_types=1);

// — Erreurs journalisées, JAMAIS affichées au client (OWASP A05).
@ini_set('display_errors', '0');
error_reporting(E_ALL);

$WEB_ROOT = realpath(__DIR__ . '/../..') ?: dirname(__DIR__, 2);

/**
 * Racine des données : par défaut `cms-data/` à la racine web, durci par
 * .htaccess (Require all denied). Pour la déplacer AU-DESSUS de la racine web
 * (plus sûr si l'hébergeur le permet), définir la variable d'env CMS_DATA_DIR.
 */
if (!defined('CMS_DATA_DIR')) {
    $envDir = getenv('CMS_DATA_DIR');
    define('CMS_DATA_DIR', ($envDir !== false && $envDir !== '')
        ? rtrim($envDir, '/')
        : $WEB_ROOT . '/cms-data');
}

define('CMS_NEWS_DIR',    CMS_DATA_DIR . '/news');
define('CMS_INDEX_FILE',  CMS_NEWS_DIR . '/_index.json');
define('CMS_SECRET_FILE', CMS_DATA_DIR . '/config.secret.php');
define('CMS_RL_DIR',      CMS_DATA_DIR . '/ratelimit');
define('CMS_AUDIT_FILE',  CMS_DATA_DIR . '/audit.log');
define('CMS_LOCK_FILE',   CMS_DATA_DIR . '/.lock');

// Uploads : servis aux visiteurs → obligatoirement dans la racine web.
define('CMS_UPLOADS_DIR', $WEB_ROOT . '/uploads/news');
define('CMS_UPLOADS_URL', '/uploads/news');

// Contraintes de contenu (miroir des validations côté éditeur).
define('CMS_SLUG_RE',     '/^[a-z0-9-]{1,96}$/');
define('CMS_MAX_UPLOAD',  6 * 1024 * 1024); // 6 Mo
define('CMS_TITLE_MAX',   160);
define('CMS_EXCERPT_MIN', 20);
define('CMS_EXCERPT_MAX', 300);

/** Types image autorisés → extension de sortie (SVG volontairement EXCLU : vecteur XSS). */
function cms_allowed_image_types(): array {
    $t = [IMAGETYPE_JPEG => 'jpg', IMAGETYPE_PNG => 'png'];
    if (defined('IMAGETYPE_WEBP')) $t[IMAGETYPE_WEBP] = 'webp';
    if (defined('IMAGETYPE_AVIF')) $t[IMAGETYPE_AVIF] = 'avif';
    return $t;
}

function cms_ensure_dir(string $dir): bool {
    return is_dir($dir) || @mkdir($dir, 0700, true) || is_dir($dir);
}

/** Validation stricte du slug AVANT toute construction de chemin (anti path-traversal). */
function cms_valid_slug(string $s): bool {
    return (bool) preg_match(CMS_SLUG_RE, $s);
}
