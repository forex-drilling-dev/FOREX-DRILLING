<?php
/**
 * Forex Drilling CMS — sitemap XML dynamique des actualités publiées.
 * Référencé depuis robots.txt. Reflète instantanément les articles publiés
 * (pas de rebuild). URLs construites à partir de l'hôte de la requête.
 */
declare(strict_types=1);
require_once __DIR__ . '/admin/lib/store.php';

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: public, max-age=300');

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'forex-drilling.com';
$base   = $scheme . '://' . $host;
$e      = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach (news_list(false) as $a) {
    $slug = (string)($a['slug'] ?? '');
    if (!cms_valid_slug($slug)) continue;
    $loc     = $e($base . '/news/' . $slug . '/');
    $lastmod = $e(substr((string)($a['updatedAt'] ?: ($a['publishedAt'] ?? '')), 0, 10));
    echo "  <url>\n    <loc>{$loc}</loc>\n";
    if ($lastmod !== '') echo "    <lastmod>{$lastmod}</lastmod>\n";
    echo "    <changefreq>monthly</changefreq>\n  </url>\n";
}
echo '</urlset>' . "\n";
