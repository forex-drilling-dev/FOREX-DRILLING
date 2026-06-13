<?php
/**
 * Forex Drilling CMS — rendu Markdown → HTML SÛR, repli serveur uniquement
 * (aperçu sans JS dans l'admin). Le rendu FAISANT FOI est côté site React
 * (react-markdown + rehype-sanitize). Ici, approche « échapper d'abord, puis
 * autoriser un sous-ensemble » : on ne réintroduit jamais de HTML arbitraire.
 *
 * Sous-ensemble : titres (##, ###), gras, italique, listes, liens, images,
 * citations, paragraphes. Tout le reste est échappé littéralement.
 */
declare(strict_types=1);

function md_to_safe_html(string $md): string {
    $md = str_replace("\r\n", "\n", $md);
    $lines = explode("\n", $md);
    $html = '';
    $inUl = false;
    $para = [];

    $flushPara = function () use (&$para, &$html) {
        if ($para) {
            $html .= '<p>' . md_inline(implode(' ', $para)) . "</p>\n";
            $para = [];
        }
    };
    $closeUl = function () use (&$inUl, &$html) {
        if ($inUl) { $html .= "</ul>\n"; $inUl = false; }
    };

    foreach ($lines as $line) {
        $t = trim($line);
        if ($t === '') { $flushPara(); $closeUl(); continue; }
        if (preg_match('/^###\s+(.*)$/', $t, $m)) { $flushPara(); $closeUl(); $html .= '<h3>' . md_inline($m[1]) . "</h3>\n"; continue; }
        if (preg_match('/^##\s+(.*)$/', $t, $m))  { $flushPara(); $closeUl(); $html .= '<h2>' . md_inline($m[1]) . "</h2>\n"; continue; }
        if (preg_match('/^>\s?(.*)$/', $t, $m))    { $flushPara(); $closeUl(); $html .= '<blockquote>' . md_inline($m[1]) . "</blockquote>\n"; continue; }
        if (preg_match('/^[-*]\s+(.*)$/', $t, $m)) {
            $flushPara();
            if (!$inUl) { $html .= "<ul>\n"; $inUl = true; }
            $html .= '<li>' . md_inline($m[1]) . "</li>\n";
            continue;
        }
        $para[] = $t;
    }
    $flushPara(); $closeUl();
    return $html;
}

/** Inline : échappe TOUT, puis réautorise gras/italique/liens/images/code. */
function md_inline(string $s): string {
    $s = htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
    // Image ![alt](url) — url limitée à des chemins/URLs http(s) ou /uploads.
    $s = preg_replace_callback('/!\[([^\]]*)\]\(([^)\s]+)\)/', static function ($m) {
        $url = md_safe_url($m[2]);
        return $url ? '<img src="' . $url . '" alt="' . $m[1] . '">' : $m[0];
    }, $s);
    // Lien [texte](url)
    $s = preg_replace_callback('/\[([^\]]+)\]\(([^)\s]+)\)/', static function ($m) {
        $url = md_safe_url($m[2]);
        return $url ? '<a href="' . $url . '" rel="noopener noreferrer">' . $m[1] . '</a>' : $m[0];
    }, $s);
    $s = preg_replace('/\*\*([^*]+)\*\*/', '<strong>$1</strong>', $s);
    $s = preg_replace('/(?<!\*)\*([^*]+)\*(?!\*)/', '<em>$1</em>', $s);
    $s = preg_replace('/`([^`]+)`/', '<code>$1</code>', $s);
    return $s;
}

/** N'autorise que http(s):// et les chemins absolus internes (anti javascript:). */
function md_safe_url(string $url): ?string {
    if (preg_match('#^https?://#i', $url) || str_starts_with($url, '/')) {
        return $url; // déjà échappé par htmlspecialchars en amont
    }
    return null;
}
