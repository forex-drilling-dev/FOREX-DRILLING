<?php
/**
 * Forex Drilling CMS — upload d'images durci (OWASP A03/A05).
 *  - type réel vérifié par getimagesize() (jamais l'extension envoyée ni le
 *    Content-Type déclaré, tous deux falsifiables) ;
 *  - allowlist d'images, SVG REFUSÉ (vecteur XSS) ;
 *  - taille plafonnée ;
 *  - nom de fichier aléatoire (pas de nom utilisateur → ni traversal ni écrasement) ;
 *  - le dossier uploads/ a l'exécution PHP coupée (uploads/.htaccess).
 *
 * Renvoie ['url'=>..., 'alt'=>''] en cas de succès, ou ['error'=>code].
 */
declare(strict_types=1);
require_once __DIR__ . '/config.php';

function upload_image(array $file): array {
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        return ['error' => 'upload_failed'];
    }
    if (!is_uploaded_file($file['tmp_name'] ?? '')) {
        return ['error' => 'not_uploaded'];
    }
    if (($file['size'] ?? 0) > CMS_MAX_UPLOAD || ($file['size'] ?? 0) <= 0) {
        return ['error' => 'too_large'];
    }

    $info = @getimagesize($file['tmp_name']);
    if ($info === false) {
        return ['error' => 'not_an_image']; // contenu non-image (ex. .php renommé .jpg)
    }
    $allowed = cms_allowed_image_types();
    $type = $info[2] ?? 0;
    if (!isset($allowed[$type])) {
        return ['error' => 'unsupported_type']; // ex. SVG, GIF, BMP…
    }
    $ext = $allowed[$type];

    if (!cms_ensure_dir(CMS_UPLOADS_DIR)) {
        return ['error' => 'storage_unavailable'];
    }
    $name = bin2hex(random_bytes(8)) . '.' . $ext;
    $dest = CMS_UPLOADS_DIR . '/' . $name;
    if (!@move_uploaded_file($file['tmp_name'], $dest)) {
        return ['error' => 'move_failed'];
    }
    @chmod($dest, 0644);

    return ['url' => CMS_UPLOADS_URL . '/' . $name, 'alt' => ''];
}
