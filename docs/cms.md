# CMS — self-hosted PHP (operations guide)

The News section is powered by a **self-hosted CMS that runs on the existing
Apache/PHP host (Yulpa)** — no third-party service. PHP code ships with the
site (via `public/`); content is stored as JSON on the host and served at
runtime, so **publishing is instant — no rebuild required**.

```
forex-drilling.com/admin        ← editor panel (Apache Basic Auth + PHP login)
forex-drilling.com/api/news.php ← public read API (published articles only)
forex-drilling.com/news/        ← list (client-rendered, fetches the API)
forex-drilling.com/news/<slug>/ ← article (article.php injects SEO/OG meta)
```

## Architecture in one picture

```
EDITOR → /admin (2 auth barriers) → writes cms-data/news/<slug>.json + uploads/news/*.jpg
VISITOR → /news → fetch /api/news.php (published only)
        → /news/<slug>/ → article.php (per-article meta) → shell → fetch body
```

- **Code vs data:** PHP files live in `public/` and are redeployed every build.
  **Content is NOT in the repo** — it lives in `cms-data/` and `uploads/` on the
  host and must survive redeploys.
- `cms-data/` is hardened with `.htaccess` (`Require all denied`) — never web
  readable. Its location is one constant (`CMS_DATA_DIR` in
  `admin/lib/config.php`, overridable via the env var) so it can be moved above
  the web root if the host allows it.

## First-run setup (once, on the host)

1. **Deploy** the site (`rm -rf out && pnpm build`, then FTP `out/`). This ships
   `admin/`, `api/news.php`, `article.php`, `sitemap-news.php`, and the hardened
   `cms-data/.htaccess` + `uploads/.htaccess`.

2. **Set the editor password** (PHP login — barrier 2). Generate a hash and put
   it in `cms-data/config.secret.php` (next to the data, never in the repo):
   ```bash
   php -r "echo password_hash('YOUR_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
   ```
   ```php
   <?php // cms-data/config.secret.php
   return ['PASSWORD_HASH' => '$2y$....'];
   ```
   (See `admin/lib/config.secret.example.php`.)

3. **Enable Apache Basic Auth on `/admin` (barrier 1).** Easiest on Yulpa:
   cPanel → **Directory Privacy** → protect the `admin` folder, add a user.
   cPanel writes the correct `.htaccess` + `.htpasswd` automatically. (Manual
   alternative: create a `.htpasswd` outside the web root and uncomment the
   `AuthType Basic` block in `admin/.htaccess`, setting the absolute path.)

4. **Check write permissions:** the web user must be able to create
   `cms-data/news/`, `cms-data/ratelimit/`, and `uploads/news/` (the code
   `mkdir`s them; ensure the parent is writable).

## Security model (defense in depth, OWASP Top 10)

- **Two auth barriers** on `/admin` and writes: Apache Basic Auth, then PHP
  session (hashed password, `HttpOnly; Secure; SameSite=Strict` cookie).
- **CSRF token** on every mutating action; **per-IP rate-limit** on login;
  **audit log** at `cms-data/audit.log`.
- **Uploads**: real-MIME checked (`getimagesize`), SVG rejected, random names,
  PHP execution disabled in `uploads/` via `.htaccess`.
- **Stored content is untrusted at render**: Markdown is sanitized
  (`rehype-sanitize`) on the site and HTML-escaped in `article.php`.
- **Slugs** are allowlisted (`^[a-z0-9-]{1,96}$`) → no path traversal; writes
  are atomic under `flock`.

Full mapping: `docs/superpowers/specs/2026-06-14-self-hosted-php-cms-design.md` §11b.

## Editing workflow

1. Go to `/admin`, sign in (both barriers).
2. **New article** → title, body (Markdown toolbar + live preview), excerpt,
   cover image (uploaded), date, status.
3. Set **Status = Published** and save → the article is **live immediately** at
   `/news/` and `/news/<slug>/`. No rebuild, no redeploy.
4. Draft articles are never exposed by the API.

## Deploy hygiene (important)

- Always `rm -rf out && pnpm build` before FTP (clean export, zero source maps).
- **FTP without "mirror/delete"** so the host's `cms-data/` and `uploads/` are
  preserved. They are not part of the build artifact — deleting remote files
  that aren't in `out/` would wipe all content and images.
- Never place `cms-data/` or `uploads/` inside the repo or inside `out/`.

## Backup

Download `cms-data/` (all articles + audit log) and `uploads/` (images) by FTP.
That is the complete content backup.

## SEO note

Article pages are client-rendered, but `article.php` injects per-article
`<title>`/description/canonical/OpenGraph/Twitter tags into the served HTML, so
**social link previews (LinkedIn, X, Facebook) and non-JS crawlers get correct
per-article metadata**. `sitemap-news.php` lists all published articles for
search engines. The bare `/news/article/` shell is kept out of the index via
`robots.txt`.
