<?php
/**
 * Forex Drilling CMS — contrôleur frontal du panneau d'admin.
 * Route sur ?action= ; toute action non-publique exige une session (2e barrière,
 * derrière l'Apache Basic Auth posée par .htaccess). Toute mutation exige le CSRF.
 *
 * Pattern Post-Redirect-Get : les POST redirigent vers un GET (flash en session).
 */
declare(strict_types=1);

require_once __DIR__ . '/lib/store.php';
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/csrf.php';
require_once __DIR__ . '/lib/ratelimit.php';
require_once __DIR__ . '/lib/audit.php';
require_once __DIR__ . '/lib/upload.php';
require_once __DIR__ . '/views/render.php';

auth_boot();

$action = isset($_GET['action']) ? (string) $_GET['action'] : 'dashboard';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

/** Flash message via session (affiché une fois). */
function flash_set(string $type, string $msg): void { $_SESSION['cms_flash'] = ['type' => $type, 'msg' => $msg]; }
function flash_take(): ?array { $f = $_SESSION['cms_flash'] ?? null; unset($_SESSION['cms_flash']); return $f; }

function redirect(string $to): void { header('Location: ' . $to); exit; }

/** slugify simple, borné au même alphabet que CMS_SLUG_RE. */
function cms_slugify(string $s): string {
    $s = strtolower(trim($s));
    $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
    $s = trim($s, '-');
    return substr($s, 0, 96);
}

// — En-têtes anti-cache pour tout le panneau (jamais de page admin en cache).
header('Cache-Control: no-store, max-age=0');

// =========================== ACTIONS PUBLIQUES ============================

if ($action === 'login') {
    if ($method === 'POST') {
        // Rate-limit AVANT toute vérif (anti brute-force).
        if (!rl_ok('login', 5, 600)) {
            audit('login_ratelimited');
            http_response_code(429);
            flash_set('error', 'Trop de tentatives. Réessayez dans quelques minutes.');
            redirect('/admin/?action=login');
        }
        $pw = isset($_POST['password']) ? (string) $_POST['password'] : '';
        if (auth_login($pw)) {
            audit('login_ok');
            redirect('/admin/');
        }
        audit('login_failed');
        flash_set('error', 'Identifiants invalides.');
        redirect('/admin/?action=login');
    }
    render_login();
    exit;
}

if ($action === 'logout') {
    auth_logout();
    redirect('/admin/?action=login');
}

// ===================== À PARTIR D'ICI : SESSION REQUISE ===================

auth_require();

if ($action === 'upload' && $method === 'POST') {
    header('Content-Type: application/json; charset=utf-8');
    if (!csrf_check($_POST['csrf'] ?? ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? null))) {
        http_response_code(403);
        echo json_encode(['error' => 'csrf']);
        exit;
    }
    $res = upload_image($_FILES['image'] ?? []);
    if (isset($res['error'])) {
        audit('upload_rejected', $res['error']);
        http_response_code(422);
        echo json_encode($res);
        exit;
    }
    audit('upload_ok', $res['url']);
    echo json_encode($res);
    exit;
}

if ($action === 'save' && $method === 'POST') {
    csrf_require($_POST['csrf'] ?? null);

    $isNew    = (($_POST['mode'] ?? 'new') === 'new');
    $title    = trim((string)($_POST['title'] ?? ''));
    $status   = (string)($_POST['status'] ?? 'draft');
    $excerpt  = trim((string)($_POST['excerpt'] ?? ''));
    $body     = (string)($_POST['body'] ?? '');
    $coverUrl = trim((string)($_POST['cover_url'] ?? ''));
    $coverAlt = trim((string)($_POST['cover_alt'] ?? ''));
    $pubInput = trim((string)($_POST['publishedAt'] ?? ''));

    // Slug : fourni (création) ou identité existante (édition). Toujours validé.
    $slug = $isNew
        ? ((trim((string)($_POST['slug'] ?? '')) !== '') ? cms_slugify((string)$_POST['slug']) : cms_slugify($title))
        : (string)($_POST['slug'] ?? '');

    // Validation serveur (miroir de l'éditeur) — A03/A04.
    $errors = [];
    if (mb_strlen($title) < 1 || mb_strlen($title) > CMS_TITLE_MAX) $errors[] = 'titre (1–' . CMS_TITLE_MAX . ')';
    if (!cms_valid_slug($slug))                                     $errors[] = 'slug (a-z 0-9 tiret)';
    if (!in_array($status, ['draft', 'published'], true))           $errors[] = 'statut';
    if (mb_strlen($excerpt) < CMS_EXCERPT_MIN || mb_strlen($excerpt) > CMS_EXCERPT_MAX) $errors[] = 'extrait (' . CMS_EXCERPT_MIN . '–' . CMS_EXCERPT_MAX . ')';
    if ($coverUrl !== '' && !preg_match('#^/uploads/news/[A-Za-z0-9._-]+$#', $coverUrl)) $errors[] = 'image (chemin invalide)';
    if ($coverUrl !== '' && $coverAlt === '')                       $errors[] = 'texte alternatif de l’image';

    if ($isNew && cms_valid_slug($slug) && news_get($slug) !== null) $errors[] = 'slug déjà utilisé';

    if ($errors) {
        flash_set('error', 'Champs invalides : ' . implode(', ', $errors) . '.');
        // On renvoie vers le formulaire en conservant la saisie via session.
        $_SESSION['cms_draft'] = compact('title','slug','status','excerpt','body','coverUrl','coverAlt','pubInput','isNew');
        redirect('/admin/?action=' . ($isNew ? 'new' : 'edit&slug=' . urlencode($slug)));
    }

    $existing = $isNew ? null : news_get($slug);
    $publishedAt = $pubInput !== ''
        ? gmdate('Y-m-d\TH:i:s.000\Z', strtotime($pubInput) ?: time())
        : ($existing['publishedAt'] ?? gmdate('Y-m-d\TH:i:s.000\Z'));

    $doc = [
        'id'          => $existing['id'] ?? bin2hex(random_bytes(8)),
        'slug'        => $slug,
        'status'      => $status,
        'title'       => $title,
        'excerpt'     => $excerpt,
        'publishedAt' => $publishedAt,
        'updatedAt'   => gmdate('Y-m-d\TH:i:s.000\Z'),
        'cover'       => $coverUrl !== '' ? ['url' => $coverUrl, 'alt' => $coverAlt] : null,
        'body'        => $body,
    ];

    if (news_save($doc)) {
        audit($isNew ? 'create' : 'update', $slug);
        flash_set('success', 'Article enregistré (' . ($status === 'published' ? 'publié' : 'brouillon') . ').');
        redirect('/admin/?action=edit&slug=' . urlencode($slug));
    }
    flash_set('error', 'Échec de l’enregistrement.');
    redirect('/admin/?action=' . ($isNew ? 'new' : 'edit&slug=' . urlencode($slug)));
}

if ($action === 'delete' && $method === 'POST') {
    csrf_require($_POST['csrf'] ?? null);
    $slug = (string)($_POST['slug'] ?? '');
    if (news_delete($slug)) { audit('delete', $slug); flash_set('success', 'Article supprimé.'); }
    else                    { flash_set('error', 'Suppression impossible.'); }
    redirect('/admin/');
}

if ($action === 'new') {
    render_edit(null);
    exit;
}

if ($action === 'edit') {
    $slug = (string)($_GET['slug'] ?? '');
    $article = cms_valid_slug($slug) ? news_get($slug) : null;
    if (!$article) { flash_set('error', 'Article introuvable.'); redirect('/admin/'); }
    render_edit($article);
    exit;
}

// Défaut : tableau de bord.
render_dashboard(news_list(true));
