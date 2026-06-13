<?php
/**
 * Forex Drilling CMS — enveloppe SEO des pages article.
 *
 * Le site est en export statique : impossible de pré-générer une page par
 * article. On sert donc la MÊME coquille statique (news/article/index.html)
 * pour tout slug, mais on INJECTE dans le <head> les balises meta/OpenGraph
 * de l'article (titre, description, image) — pour le SEO et le partage social.
 * Le corps, lui, est rendu côté client (React) par la coquille.
 *
 * Apache réécrit /news/<slug>/ → /article.php?slug=<slug> (voir .htaccess),
 * l'URL affichée reste /news/<slug>/.
 *
 * Toute valeur injectée est échappée (htmlspecialchars) — anti XSS (A03).
 */
declare(strict_types=1);
require_once __DIR__ . '/admin/lib/store.php';

$shellPath = __DIR__ . '/news/article/index.html';
$notFoundPath = __DIR__ . '/404.html';

$slug = isset($_GET['slug']) ? (string) $_GET['slug'] : '';
$article = ($slug !== '' && cms_valid_slug($slug)) ? news_get($slug) : null;
$published = $article && ($article['status'] ?? '') === 'published';

if (!$published) {
    http_response_code(404);
    if (is_readable($notFoundPath)) {
        readfile($notFoundPath);
    } else {
        header('Content-Type: text/plain; charset=utf-8');
        echo 'Not found';
    }
    exit;
}

$shell = @file_get_contents($shellPath);
if ($shell === false) {
    // La coquille devrait toujours exister après un build ; repli défensif.
    http_response_code(500);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Article shell missing';
    exit;
}

$e = static fn(string $s): string => htmlspecialchars($s, ENT_QUOTES, 'UTF-8');

$origin   = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http')
          . '://' . ($_SERVER['HTTP_HOST'] ?? 'forex-drilling.com');
$title    = $e(($article['title'] ?? 'News') . ' — Forex Drilling');
$desc     = $e(mb_substr((string)($article['excerpt'] ?? ''), 0, 300));
$canon    = $e($origin . '/news/' . $article['slug'] . '/');
$coverRel = is_array($article['cover'] ?? null) ? (string)($article['cover']['url'] ?? '') : '';
$cover    = $coverRel !== '' ? $e((str_starts_with($coverRel, 'http') ? $coverRel : $origin . $coverRel)) : '';

$tags  = "\n<title>{$title}</title>\n";
// La coquille statique est en noindex (protège l'URL nue /news/article/) ; pour
// un vrai article on la rend indexable.
$tags .= "<meta name=\"robots\" content=\"index, follow\">\n";
$tags .= "<meta name=\"description\" content=\"{$desc}\">\n";
$tags .= "<link rel=\"canonical\" href=\"{$canon}\">\n";
$tags .= "<meta property=\"og:type\" content=\"article\">\n";
$tags .= "<meta property=\"og:title\" content=\"{$title}\">\n";
$tags .= "<meta property=\"og:description\" content=\"{$desc}\">\n";
$tags .= "<meta property=\"og:url\" content=\"{$canon}\">\n";
$tags .= "<meta name=\"twitter:card\" content=\"summary_large_image\">\n";
$tags .= "<meta name=\"twitter:title\" content=\"{$title}\">\n";
$tags .= "<meta name=\"twitter:description\" content=\"{$desc}\">\n";
if ($cover !== '') {
    $tags .= "<meta property=\"og:image\" content=\"{$cover}\">\n";
    $tags .= "<meta name=\"twitter:image\" content=\"{$cover}\">\n";
}

// Retire les balises SEO génériques de la coquille (title, description, robots,
// canonical, og:*, twitter:*) pour éviter tout doublon/conflit, puis injecte
// celles de l'article. Le HTML brut servi aux scrapers sociaux (sans JS) est
// ainsi propre et correct ; après hydratation React peut regérer ses balises,
// mais les robots sociaux lisent le HTML initial — c'est l'objectif visé.
$shell = preg_replace('#<title>.*?</title>#is', '', $shell, 1);
$shell = preg_replace('#<meta[^>]+name=["\'](?:description|robots)["\'][^>]*>#i', '', $shell);
$shell = preg_replace('#<link[^>]+rel=["\']canonical["\'][^>]*>#i', '', $shell);
$shell = preg_replace('#<meta[^>]+property=["\']og:[^"\']*["\'][^>]*>#i', '', $shell);
$shell = preg_replace('#<meta[^>]+name=["\']twitter:[^"\']*["\'][^>]*>#i', '', $shell);
$shell = preg_replace('#(<head[^>]*>)#i', '$1' . $tags, $shell, 1);

header('Content-Type: text/html; charset=utf-8');
echo $shell;
