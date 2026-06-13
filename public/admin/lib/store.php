<?php
/**
 * Forex Drilling CMS — stockage des actualités en fichiers JSON.
 * Un fichier par article : cms-data/news/<slug>.json. Un cache d'index
 * (_index.json, sans le corps) reconstruit à chaque écriture sert la liste.
 *
 * Écritures atomiques (tmp + rename) sous verrou exclusif (flock) → pas de
 * fichier à moitié écrit, pas de course entre deux éditeurs (OWASP A08).
 */
declare(strict_types=1);
require_once __DIR__ . '/config.php';

/** Chemin du fichier article, ou null si le slug est invalide. */
function news_path(string $slug): ?string {
    if (!cms_valid_slug($slug)) return null;
    return CMS_NEWS_DIR . '/' . $slug . '.json';
}

function news_read_file(string $path): ?array {
    if (!is_readable($path)) return null;
    $doc = json_decode((string) file_get_contents($path), true);
    return is_array($doc) ? $doc : null;
}

/** Un article complet par slug (publié ou brouillon). */
function news_get(string $slug): ?array {
    $p = news_path($slug);
    return $p !== null ? news_read_file($p) : null;
}

/** Entrée d'index allégée (sans le corps) pour la liste. */
function news_index_entry(array $doc): array {
    return [
        'id'          => $doc['id'] ?? '',
        'slug'        => $doc['slug'] ?? '',
        'status'      => $doc['status'] ?? 'draft',
        'title'       => $doc['title'] ?? '',
        'excerpt'     => $doc['excerpt'] ?? '',
        'publishedAt' => $doc['publishedAt'] ?? '',
        'updatedAt'   => $doc['updatedAt'] ?? '',
        'cover'       => $doc['cover'] ?? null,
    ];
}

/** Liste triée (récent d'abord). $includeDrafts=false → publiés uniquement. */
function news_list(bool $includeDrafts = false): array {
    $items = [];
    if (is_readable(CMS_INDEX_FILE)) {
        $idx = json_decode((string) file_get_contents(CMS_INDEX_FILE), true);
        if (is_array($idx)) $items = $idx;
    } else {
        $items = news_scan_entries();
    }
    if (!$includeDrafts) {
        $items = array_values(array_filter(
            $items,
            static fn($d) => ($d['status'] ?? '') === 'published'
        ));
    }
    return $items;
}

/** Scanne les fichiers et renvoie les entrées d'index triées (fallback / rebuild). */
function news_scan_entries(): array {
    $items = [];
    if (is_dir(CMS_NEWS_DIR)) {
        foreach (glob(CMS_NEWS_DIR . '/*.json') ?: [] as $f) {
            if (basename($f) === '_index.json') continue;
            $doc = news_read_file($f);
            if ($doc) $items[] = news_index_entry($doc);
        }
    }
    usort($items, static fn($a, $b) => strcmp((string)($b['publishedAt'] ?? ''), (string)($a['publishedAt'] ?? '')));
    return $items;
}

/** Verrou exclusif global sur les écritures CMS. Renvoie le handle ou null. */
function cms_lock() {
    if (!cms_ensure_dir(CMS_DATA_DIR)) return null;
    $fp = @fopen(CMS_LOCK_FILE, 'c');
    if ($fp && flock($fp, LOCK_EX)) return $fp;
    if ($fp) fclose($fp);
    return null;
}
function cms_unlock($fp): void {
    if ($fp) { flock($fp, LOCK_UN); fclose($fp); }
}

/** Écriture atomique : tmp dans le même dossier puis rename (même FS). */
function news_atomic_write(string $path, string $contents): bool {
    if (!cms_ensure_dir(dirname($path))) return false;
    $tmp = @tempnam(dirname($path), '.tmp');
    if ($tmp === false) return false;
    if (@file_put_contents($tmp, $contents) === false) { @unlink($tmp); return false; }
    @chmod($tmp, 0640);
    if (!@rename($tmp, $path)) { @unlink($tmp); return false; }
    return true;
}

/** Enregistre un article et reconstruit l'index, sous verrou. */
function news_save(array $doc): bool {
    $p = news_path((string)($doc['slug'] ?? ''));
    if ($p === null) return false;
    $lock = cms_lock();
    try {
        $json = json_encode($doc, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if ($json === false) return false;
        if (!news_atomic_write($p, $json)) return false;
        news_rebuild_index();
        return true;
    } finally {
        cms_unlock($lock);
    }
}

/** Supprime un article et reconstruit l'index, sous verrou. */
function news_delete(string $slug): bool {
    $p = news_path($slug);
    if ($p === null) return false;
    $lock = cms_lock();
    try {
        $ok = !is_file($p) || @unlink($p);
        if ($ok) news_rebuild_index();
        return $ok;
    } finally {
        cms_unlock($lock);
    }
}

/** Reconstruit _index.json à partir des fichiers (appelé sous verrou). */
function news_rebuild_index(): void {
    $items = news_scan_entries();
    news_atomic_write(CMS_INDEX_FILE, json_encode($items, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
}
