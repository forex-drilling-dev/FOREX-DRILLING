<?php
/**
 * Forex Drilling CMS — vues du panneau (HTML). Tout est échappé via h().
 * Présentation uniquement ; la logique vit dans index.php + lib/.
 */
declare(strict_types=1);

/** Échappement HTML court. */
function h(?string $s): string { return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8'); }

function layout_head(string $title): void {
    $flash = flash_take();
    ?><!doctype html>
<html lang="fr">
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
  <a class="brand" href="/admin/">
    <span class="brand__mark">FOREX</span><span class="brand__sub">DRILLING · CMS</span>
  </a>
  <nav class="topbar__nav">
    <a class="btn btn--ghost" href="/news/" target="_blank" rel="noopener">Voir le site ↗</a>
    <a class="btn btn--ghost" href="/admin/?action=logout">Déconnexion</a>
  </nav>
</header>
<?php
}

// ----------------------------------------------------------------- LOGIN
function render_login(): void {
    layout_head('Connexion');
    ?>
<main class="auth">
  <form class="auth__card" method="post" action="/admin/?action=login" autocomplete="off">
    <div class="auth__brand"><span class="brand__mark">FOREX</span><span class="brand__sub">DRILLING · CMS</span></div>
    <h1 class="auth__title">Connexion</h1>
    <label class="field">
      <span class="field__label">Mot de passe</span>
      <input class="field__input" type="password" name="password" autofocus required>
    </label>
    <button class="btn btn--primary btn--block" type="submit">Entrer</button>
    <p class="auth__hint">Accès réservé à l’équipe éditoriale.</p>
  </form>
</main>
<?php
    layout_foot();
}

// ----------------------------------------------------------------- SETUP
function render_setup(): void {
    layout_head('Configuration');
    ?>
<main class="auth">
  <form class="auth__card" method="post" action="/admin/?action=setup" autocomplete="off">
    <div class="auth__brand"><span class="brand__mark">FOREX</span><span class="brand__sub">DRILLING · CMS</span></div>
    <h1 class="auth__title">Première configuration</h1>
    <p class="auth__hint" style="text-align:left">Définissez le mot de passe de l’équipe éditoriale. Il sera stocké haché (jamais en clair) sur le serveur.</p>
    <label class="field">
      <span class="field__label">Mot de passe (10 caractères min.)</span>
      <input class="field__input" type="password" name="password" minlength="10" autofocus required>
    </label>
    <label class="field">
      <span class="field__label">Confirmer le mot de passe</span>
      <input class="field__input" type="password" name="password2" minlength="10" required>
    </label>
    <button class="btn btn--primary btn--block" type="submit">Définir le mot de passe</button>
  </form>
</main>
<?php
    layout_foot();
}

// ------------------------------------------------------------- DASHBOARD
function render_dashboard(array $items): void {
    layout_head('Tableau de bord');
    topbar();
    ?>
<main class="wrap">
  <div class="page-head">
    <div>
      <p class="eyebrow">Actualités</p>
      <h1 class="h1">Articles</h1>
    </div>
    <a class="btn btn--primary" href="/admin/?action=new">+ Nouvel article</a>
  </div>

  <?php if (!$items): ?>
    <div class="empty">
      <p class="empty__title">Aucun article pour l’instant.</p>
      <p class="empty__sub">Créez le premier — il apparaîtra sur le site dès qu’il sera publié.</p>
      <a class="btn btn--primary" href="/admin/?action=new">+ Créer le premier article</a>
    </div>
  <?php else: ?>
    <ul class="cards">
      <?php foreach ($items as $a): $pub = ($a['status'] ?? '') === 'published'; ?>
        <li class="card">
          <a class="card__media" href="/admin/?action=edit&slug=<?= h(urlencode($a['slug'] ?? '')) ?>">
            <?php if (!empty($a['cover']['url'])): ?>
              <img src="<?= h($a['cover']['url']) ?>" alt="" loading="lazy">
            <?php else: ?>
              <span class="card__noimg">Pas d’image</span>
            <?php endif; ?>
          </a>
          <div class="card__body">
            <span class="chip <?= $pub ? 'chip--pub' : 'chip--draft' ?>"><?= $pub ? '● Publié' : '○ Brouillon' ?></span>
            <h2 class="card__title"><?= h($a['title'] ?? '') ?></h2>
            <p class="card__meta"><?= h(substr((string)($a['publishedAt'] ?? ''), 0, 10)) ?></p>
            <div class="card__actions">
              <a class="btn btn--ghost btn--sm" href="/admin/?action=edit&slug=<?= h(urlencode($a['slug'] ?? '')) ?>">Éditer</a>
              <form method="post" action="/admin/?action=delete" onsubmit="return confirm('Supprimer définitivement cet article ?');">
                <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
                <input type="hidden" name="slug" value="<?= h($a['slug'] ?? '') ?>">
                <button class="btn btn--danger btn--sm" type="submit">Supprimer</button>
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
    // Repli sur la saisie conservée en session après une erreur de validation.
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

    layout_head($isNew ? 'Nouvel article' : 'Modifier');
    topbar();
    ?>
<main class="wrap">
  <div class="page-head">
    <div>
      <p class="eyebrow"><a class="back" href="/admin/">← Tous les articles</a></p>
      <h1 class="h1"><?= $isNew ? 'Nouvel article' : 'Modifier l’article' ?></h1>
    </div>
  </div>

  <form class="editor" method="post" action="/admin/?action=save" id="editor-form">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <input type="hidden" name="mode" value="<?= $isNew ? 'new' : 'edit' ?>">
    <?php if (!$isNew): ?><input type="hidden" name="slug" value="<?= h($slug) ?>"><?php endif; ?>
    <input type="hidden" name="cover_url" id="cover_url" value="<?= h($covUrl) ?>">

    <p class="help">Remplissez les champs, puis cliquez sur <strong>Publier</strong> pour mettre l’article en ligne immédiatement, ou <strong>Enregistrer en brouillon</strong> pour le garder caché.</p>

    <!-- Titre -->
    <label class="field">
      <span class="field__label">Titre de l’article</span>
      <input class="field__input field__input--title" type="text" name="title" maxlength="160" required value="<?= h($title) ?>" placeholder="Ex. Mobilisation d’une nouvelle foreuse en Papouasie">
    </label>

    <!-- Image de couverture -->
    <div class="field">
      <span class="field__label">Image principale</span>
      <div class="cover">
        <img class="cover__img" id="cover-img" src="<?= h($covUrl) ?>" alt="" <?= $covUrl === '' ? 'hidden' : '' ?>>
        <p class="cover__empty" id="cover-empty" <?= $covUrl !== '' ? 'hidden' : '' ?>>Aucune image pour l’instant</p>
      </div>
      <input class="upload-input" type="file" id="cover-file" accept="image/png,image/jpeg,image/webp,image/avif">
      <label class="btn btn--ghost btn--block" for="cover-file">📷 Choisir une image</label>
      <label class="field" style="margin-top:12px;margin-bottom:0">
        <span class="field__label">Description de l’image (pour l’accessibilité)</span>
        <input class="field__input" type="text" name="cover_alt" id="cover_alt" value="<?= h($covAlt) ?>" placeholder="Ex. Foreuse sur un site au coucher du soleil">
      </label>
    </div>

    <!-- Résumé -->
    <label class="field">
      <span class="field__label">Résumé court</span>
      <span class="field__hint">Affiché sur la liste des actualités et lors du partage sur les réseaux.</span>
      <textarea class="field__input" name="excerpt" rows="3" minlength="20" maxlength="300" required placeholder="Une ou deux phrases qui résument l’article."><?= h($excerpt) ?></textarea>
    </label>

    <!-- Contenu -->
    <div class="field">
      <span class="field__label">Contenu de l’article</span>
      <span class="field__hint">Écrivez normalement. Utilisez les boutons pour mettre en forme — l’aperçu à droite montre le rendu réel.</span>
      <div class="md-toolbar" aria-label="Mise en forme">
        <button type="button" data-md="bold" title="Gras"><strong>Gras</strong></button>
        <button type="button" data-md="italic" title="Italique"><em>Italique</em></button>
        <button type="button" data-md="h2" title="Grand titre">Titre</button>
        <button type="button" data-md="h3" title="Sous-titre">Sous-titre</button>
        <button type="button" data-md="ul" title="Liste à puces">• Liste</button>
        <button type="button" data-md="link" title="Lien">🔗 Lien</button>
        <button type="button" data-md="quote" title="Citation">❝ Citation</button>
        <button type="button" data-md="image" title="Insérer une image">🖼 Image</button>
      </div>
      <div class="md-pane">
        <div>
          <p class="md-col-label">Votre texte</p>
          <textarea class="field__input md-input" name="body" id="md-input" rows="16" placeholder="Rédigez votre article ici…"><?= h($body) ?></textarea>
        </div>
        <div>
          <p class="md-col-label">Aperçu</p>
          <div class="md-preview" id="md-preview" aria-live="polite"></div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="actions">
      <span class="status-now">
        <?php if ($isNew): ?>Nouvel article<?php else: ?>État actuel : <?= $isPub ? 'En ligne' : 'Brouillon' ?><?php endif; ?>
      </span>
      <span class="spacer"></span>
      <button class="btn btn--lg" type="submit" name="status" value="draft">Enregistrer en brouillon</button>
      <button class="btn btn--primary btn--lg" type="submit" name="status" value="published"><?= $isPub ? 'Mettre à jour' : 'Publier' ?></button>
    </div>
  </form>
</main>
<?php
    layout_foot(true);
}
