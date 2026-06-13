<?php
/**
 * Forex Drilling CMS — panel views (HTML). Everything is escaped via h().
 * Presentation only; logic lives in index.php + lib/.
 */
declare(strict_types=1);

/** Short HTML escape. */
function h(?string $s): string { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

function layout_head(string $title): void {
    $flash = flash_take();
    ?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title><?= h($title) ?> — Forex Drilling CMS</title>
<link rel="stylesheet" href="/admin/assets/admin.css">
</head>
<body>
<?php if ($flash): ?>
  <div class="flash flash--<?= h($flash['type']) ?>" role="status"><?= h($flash['msg']) ?></div>
<?php endif; ?>
<?php
}

function layout_foot(bool $withJs = false): void {
    if ($withJs) echo '<script src="/admin/assets/admin.js" defer></script>';
    echo "\n</body>\n</html>";
}

function topbar(): void {
    ?>
<header class="topbar">
  <a class="brand" href="/admin/" aria-label="Forex Drilling CMS — home">
    <img class="brand__logo" src="/logo-mark.svg" alt="Forex Drilling" width="880" height="200">
    <span class="brand__sub">CMS</span>
  </a>
  <nav class="topbar__nav">
    <a class="btn btn--ghost" href="/news/" target="_blank" rel="noopener">View site ↗</a>
    <a class="btn btn--ghost" href="/admin/?action=logout">Sign out</a>
  </nav>
</header>
<?php
}

// ----------------------------------------------------------------- LOGIN
function render_login(): void {
    layout_head('Sign in');
    ?>
<main class="auth">
  <form class="auth__card" method="post" action="/admin/?action=login" autocomplete="off">
    <div class="auth__brand"><img class="auth__logo" src="/logo-mark.svg" alt="Forex Drilling" width="880" height="200"><span class="brand__sub">CMS</span></div>
    <h1 class="auth__title">Sign in</h1>
    <label class="field">
      <span class="field__label">Password</span>
      <input class="field__input" type="password" name="password" autofocus required>
    </label>
    <button class="btn btn--primary btn--block" type="submit">Enter</button>
    <p class="auth__hint">Restricted to the editorial team.</p>
  </form>
</main>
<?php
    layout_foot();
}

// ----------------------------------------------------------------- SETUP
function render_setup(): void {
    layout_head('Setup');
    ?>
<main class="auth">
  <form class="auth__card" method="post" action="/admin/?action=setup" autocomplete="off">
    <div class="auth__brand"><img class="auth__logo" src="/logo-mark.svg" alt="Forex Drilling" width="880" height="200"><span class="brand__sub">CMS</span></div>
    <h1 class="auth__title">First-time setup</h1>
    <p class="auth__hint" style="text-align:left">Choose the editorial team password. It is stored hashed (never in plain text) on the server.</p>
    <label class="field">
      <span class="field__label">Password (10 characters min.)</span>
      <input class="field__input" type="password" name="password" minlength="10" autofocus required>
    </label>
    <label class="field">
      <span class="field__label">Confirm password</span>
      <input class="field__input" type="password" name="password2" minlength="10" required>
    </label>
    <button class="btn btn--primary btn--block" type="submit">Set password</button>
  </form>
</main>
<?php
    layout_foot();
}

// ------------------------------------------------------------- DASHBOARD
function render_dashboard(array $items): void {
    layout_head('Dashboard');
    topbar();
    ?>
<main class="wrap">
  <div class="page-head">
    <div>
      <p class="eyebrow">News</p>
      <h1 class="h1">Articles</h1>
    </div>
    <a class="btn btn--primary" href="/admin/?action=new">+ New article</a>
  </div>

  <?php if (!$items): ?>
    <div class="empty">
      <p class="empty__title">No articles yet.</p>
      <p class="empty__sub">Create the first one — it appears on the site as soon as it’s published.</p>
      <a class="btn btn--primary" href="/admin/?action=new">+ Create the first article</a>
    </div>
  <?php else: ?>
    <ul class="cards">
      <?php foreach ($items as $a): $pub = ($a['status'] ?? '') === 'published'; ?>
        <li class="card">
          <a class="card__media" href="/admin/?action=edit&slug=<?= h(urlencode($a['slug'] ?? '')) ?>">
            <?php if (!empty($a['cover']['url'])): ?>
              <img src="<?= h($a['cover']['url']) ?>" alt="" loading="lazy">
            <?php else: ?>
              <span class="card__noimg">No image</span>
            <?php endif; ?>
          </a>
          <div class="card__body">
            <span class="chip <?= $pub ? 'chip--pub' : 'chip--draft' ?>"><?= $pub ? '● Published' : '○ Draft' ?></span>
            <h2 class="card__title"><?= h($a['title'] ?? '') ?></h2>
            <p class="card__meta"><?= h(substr((string)($a['publishedAt'] ?? ''), 0, 10)) ?></p>
            <div class="card__actions">
              <a class="btn btn--ghost btn--sm" href="/admin/?action=edit&slug=<?= h(urlencode($a['slug'] ?? '')) ?>">Edit</a>
              <form method="post" action="/admin/?action=delete" onsubmit="return confirm('Permanently delete this article?');">
                <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
                <input type="hidden" name="slug" value="<?= h($a['slug'] ?? '') ?>">
                <button class="btn btn--danger btn--sm" type="submit">Delete</button>
              </form>
            </div>
          </div>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>
</main>
<?php
    layout_foot();
}

// ----------------------------------------------------------------- EDIT
function render_edit(?array $article): void {
    // Fall back to the input kept in session after a validation error.
    $draft = $_SESSION['cms_draft'] ?? null; unset($_SESSION['cms_draft']);
    $isNew = $article === null && !($draft['isNew'] ?? false) ? true : ($article === null);

    $title   = $draft['title']    ?? ($article['title'] ?? '');
    $slug    = $draft['slug']     ?? ($article['slug'] ?? '');
    $status  = $draft['status']   ?? ($article['status'] ?? 'draft');
    $excerpt = $draft['excerpt']  ?? ($article['excerpt'] ?? '');
    $body    = $draft['body']     ?? ($article['body'] ?? '');
    $covUrl  = $draft['coverUrl'] ?? ($article['cover']['url'] ?? '');
    $covAlt  = $draft['coverAlt'] ?? ($article['cover']['alt'] ?? '');
    $isPub   = $status === 'published';

    layout_head($isNew ? 'New article' : 'Edit');
    topbar();
    ?>
<main class="wrap">
  <div class="page-head">
    <div>
      <p class="eyebrow"><a class="back" href="/admin/">← All articles</a></p>
      <h1 class="h1"><?= $isNew ? 'New article' : 'Edit article' ?></h1>
    </div>
  </div>

  <form class="editor" method="post" action="/admin/?action=save" id="editor-form">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <input type="hidden" name="mode" value="<?= $isNew ? 'new' : 'edit' ?>">
    <?php if (!$isNew): ?><input type="hidden" name="slug" value="<?= h($slug) ?>"><?php endif; ?>
    <input type="hidden" name="cover_url" id="cover_url" value="<?= h($covUrl) ?>">

    <p class="help">Fill in the fields, then click <strong>Publish</strong> to put the article online immediately, or <strong>Save as draft</strong> to keep it hidden.</p>

    <!-- Title -->
    <label class="field">
      <span class="field__label">Article title</span>
      <input class="field__input field__input--title" type="text" name="title" maxlength="160" required value="<?= h($title) ?>" placeholder="e.g. New drill rig mobilised in Papua New Guinea">
    </label>

    <!-- Cover image -->
    <div class="field">
      <span class="field__label">Main image</span>
      <div class="cover">
        <img class="cover__img" id="cover-img" src="<?= h($covUrl) ?>" alt="" <?= $covUrl === '' ? 'hidden' : '' ?>>
        <p class="cover__empty" id="cover-empty" <?= $covUrl !== '' ? 'hidden' : '' ?>>No image yet</p>
      </div>
      <input class="upload-input" type="file" id="cover-file" accept="image/png,image/jpeg,image/webp,image/avif">
      <label class="btn btn--ghost btn--block" for="cover-file">📷 Choose an image</label>
      <label class="field" style="margin-top:12px;margin-bottom:0">
        <span class="field__label">Image description (for accessibility)</span>
        <input class="field__input" type="text" name="cover_alt" id="cover_alt" value="<?= h($covAlt) ?>" placeholder="e.g. Drill rig on site at sunset">
      </label>
    </div>

    <!-- Summary -->
    <label class="field">
      <span class="field__label">Short summary</span>
      <span class="field__hint">Shown on the news list and when shared on social media.</span>
      <textarea class="field__input" name="excerpt" rows="3" minlength="20" maxlength="300" required placeholder="One or two sentences summarising the article."><?= h($excerpt) ?></textarea>
    </label>

    <!-- Content -->
    <div class="field">
      <span class="field__label">Article content</span>
      <span class="field__hint">Write directly below, like in a document. Select text, then click a button to format it.</span>
      <div class="md-toolbar" id="md-toolbar" aria-label="Formatting" role="toolbar">
        <button type="button" data-md="bold" title="Bold (Ctrl+B)"><strong>Bold</strong></button>
        <button type="button" data-md="italic" title="Italic (Ctrl+I)"><em>Italic</em></button>
        <span class="md-sep" aria-hidden="true"></span>
        <button type="button" data-md="h2" title="Heading">Heading</button>
        <button type="button" data-md="h3" title="Subheading">Subheading</button>
        <button type="button" data-md="ul" title="Bulleted list">• List</button>
        <button type="button" data-md="quote" title="Quote">❝ Quote</button>
        <span class="md-sep" aria-hidden="true"></span>
        <button type="button" data-md="link" title="Insert a link">🔗 Link</button>
        <button type="button" data-md="image" title="Insert an image">🖼 Image</button>
      </div>
      <div class="wysiwyg" id="wysiwyg" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Article content" data-placeholder="Write your article here…"></div>
      <textarea name="body" id="md-input" hidden><?= h($body) ?></textarea>
    </div>

    <!-- Actions -->
    <div class="actions">
      <span class="status-now">
        <?php if ($isNew): ?>New article<?php else: ?>Current status: <?= $isPub ? 'Online' : 'Draft' ?><?php endif; ?>
      </span>
      <span class="spacer"></span>
      <button class="btn btn--lg" type="submit" name="status" value="draft">Save as draft</button>
      <button class="btn btn--primary btn--lg" type="submit" name="status" value="published"><?= $isPub ? 'Update' : 'Publish' ?></button>
    </div>
  </form>
</main>
<?php
    layout_foot(true);
}
