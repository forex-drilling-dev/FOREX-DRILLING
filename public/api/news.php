<?php
/**
 * Forex Drilling CMS — API de LECTURE publique des actualités (GET only).
 * Ne renvoie QUE les articles publiés (jamais les brouillons, jamais de chemin
 * fichier). Consommée au runtime par la section /news du site (fetch même origine).
 *
 *   GET /api/news.php            → { "articles": [ <entrées d'index publiées> ] }
 *   GET /api/news.php?slug=xxx   → { "article": <article complet> }  ou 404
 */
declare(strict_types=1);
require_once __DIR__ . '/../admin/lib/store.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=60');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(['error' => 'method_not_allowed']);
    exit;
}

$slug = isset($_GET['slug']) ? (string) $_GET['slug'] : '';

if ($slug !== '') {
    if (!cms_valid_slug($slug)) {
        http_response_code(404);
        echo json_encode(['error' => 'not_found']);
        exit;
    }
    $article = news_get($slug);
    if (!$article || ($article['status'] ?? '') !== 'published') {
        http_response_code(404);
        echo json_encode(['error' => 'not_found']);
        exit;
    }
    echo json_encode(['article' => $article], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['articles' => news_list(false)], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
