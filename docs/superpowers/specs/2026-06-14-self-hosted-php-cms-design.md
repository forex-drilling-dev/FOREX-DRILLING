# Self-hosted PHP CMS for the News section — design spec

**Date:** 2026-06-14
**Status:** Approved for planning
**Supersedes:** the Sanity-based CMS (`docs/cms.md`, `cms-sanity-architecture` memory). Sanity is removed entirely — no third-party service.

## 1. Goal & constraints

Replace Sanity with a CMS that runs **only on infrastructure Forex Drilling already owns**: the git repo and the Yulpa Apache + PHP shared host. No external SaaS, no account, no billing.

Hard constraints (unchanged from the project's security posture):
- Site builds with `output: "export"` → static `out/`, deployed by FTP. No Node runtime in prod.
- The only server-side capability in prod is **PHP** (already used by `public/contact.php`).
- Secrets never reach the browser; content rendered to visitors is treated as untrusted.

Outcomes:
- A self-hosted admin panel at `/admin` for non-technical editors.
- **Instant publish, no rebuild**: the news section is served dynamically from a PHP read API.
- The rest of the site stays 100% static and unchanged.

## 2. Architecture overview

```
EDITOR                                  VISITOR
  │                                       │
  ▼                                       ▼
/admin  (Apache Basic Auth               /news               /news/<slug>/
        + PHP session login              (static shell,      (Apache rewrite →
        + CSRF + rate-limit)              client fetch)       article.php: meta
  │ create/edit/delete/upload                │ fetch          injection + shell)
  │ (flock, atomic writes)                   ▼                    │ fetch body
  ▼                                     /api/news.php  ◄──────────┘
  cms-data/news/*.json  ◄───────────────── reads (published only)
  uploads/news/*.<ext>                      serves images directly
```

- **Code** (PHP admin + APIs) is versioned in `public/` → copied into `out/` at build → shipped by FTP, exactly like `contact.php`.
- **Data** (`cms-data/`) and **uploads** (`uploads/`) are **runtime-created on the host, never in the repo**, and must survive redeploys (FTP must not mirror-delete them; they are not inside the rebuilt artifact tree). `cms-data/` is web-root with a hard `.htaccess` deny; its location is a single configurable constant so it can be moved above web root later.

## 3. On-host file layout

```
<web root>  (= contents of out/ after FTP)
  index.html, about/, fleet/, ...        # Next static export (unchanged)
  contact.php                            # existing
  news/index.html                        # /news list shell (Next, client-rendered)
  news/article/index.html                # single article shell (Next, client-rendered)
  admin/                                 # PHP admin panel (shipped via public/admin/)
    index.php                            # front controller (login/dashboard/edit/actions)
    lib/{auth,store,csrf,markdown,upload,ratelimit}.php
    assets/{admin.css, admin.js, marked.min.js}   # vendored, no CDN
    .htaccess                            # Basic Auth + noindex + deny direct lib/ access
  api/
    news.php                             # public GET read API (published only)
  article.php                            # meta-injection wrapper for /news/<slug>/
  uploads/news/<hash>.<ext>              # runtime images, .htaccess disables PHP
  uploads/.htaccess                      # RemoveHandler/php_flag engine off
  cms-data/                              # runtime data, .htaccess "Require all denied"
    news/<slug>.json
    news/_index.json                     # ordered lightweight list (cache)
    config.secret.php                    # password hash + session secret (gitignored pattern)
    ratelimit/                           # per-IP login throttle files
```

`public/cms-data/.htaccess`, `public/uploads/.htaccess`, and `public/admin/.htaccess` ship empty dirs with their deny/hardening rules so the protection exists from first deploy; the data/image files inside are created at runtime and preserved across non-deleting FTP syncs.

**Configurable data root:** all PHP resolves data via one constant `CMS_DATA_DIR` (default `__DIR__ . '/cms-data'` from web root). Moving it above web root = change that one constant.

## 4. Data model (one JSON file per article)

```json
{
  "id": "<random hex>",
  "slug": "rig-12-mobilised-to-pilbara",
  "status": "draft | published",
  "title": "...",
  "excerpt": "...",
  "publishedAt": "2026-06-14T09:00:00.000Z",
  "updatedAt": "2026-06-14T09:00:00.000Z",
  "cover": { "url": "/uploads/news/ab12cd.jpg", "alt": "..." },
  "body": "## Heading\n\nMarkdown text..."
}
```

`_index.json` holds an array of the above **minus `body`**, ordered by `publishedAt` desc, rebuilt atomically on every write. The read API and list page use it; single-article reads load the per-slug file.

## 5. Security design (defense in depth)

1. **Apache Basic Auth** (`.htpasswd`, path outside web access) on `/admin/` and on any write path — first barrier, no custom code.
2. **PHP session login** (second barrier): `password_verify()` against a hash in `cms-data/config.secret.php`. Cookie flags `HttpOnly; Secure; SameSite=Strict`; session regenerated on login. Logout clears session.
3. **CSRF**: per-session token required on every mutating request (create/update/delete/upload), compared with `hash_equals`.
4. **Rate limiting**: login attempts throttled per IP (5 / 10 min, file-based, fail-open) — mirrors `contact.php`.
5. **Upload hardening**: accept only image MIME verified via `getimagesize()` + extension whitelist (jpg/png/webp/avif), size cap (e.g. 6 MB), random filename, reject SVG (XSS vector). `uploads/.htaccess` disables PHP execution.
6. **Stored-content is untrusted at render**: Markdown is rendered on the public site with `react-markdown` + `remark-gfm` + `rehype-sanitize` (no `dangerouslySetInnerHTML`). `article.php` meta injection HTML-escapes all interpolated values.
7. **Input validation**: slug regex `^[a-z0-9-]{1,96}$` (blocks path traversal); writes are atomic (`tmp` file + `rename`) under `flock`.
8. **Headers**: `/admin` sends `X-Robots-Tag: noindex`, `X-Frame-Options: DENY`. CSP for `/admin` allows only self + inline needed for the editor (no third-party origins — assets are vendored).
9. The public read API (`api/news.php`) returns **only `status == "published"`** and never exposes drafts or file paths.

## 5b. Admin panel visual design — "ultra clean", on brand

The panel must look like part of the site, not a generic admin. It reuses the **V3 design language** (it cannot import React components, so the tokens are mirrored in `admin/assets/admin.css` as plain CSS):

- **Colors** (same hex as the site tokens): bg `#070D1A`/`#0C1628`, surfaces `#12203F`, hairlines `#243C6B`, accent amber `#C8902A` / highlight `#E8B84B`, text `#EDE9E0` / muted `#9A9485` / subtle `#5C5749`. Dark navy UI, amber CTAs — identical mood to the public site.
- **Type**: `Barlow Condensed` (700/800, uppercase) for headings/labels/buttons, `IBM Plex Mono` for field labels/meta/status chips, `Inter` for inputs/body. Fonts are **self-hosted/vendored** in `admin/assets/fonts/` (no Google Fonts CDN — CSP + no-third-party).
- **Layout**: generous spacing, hairline borders, subtle card shadows, a fixed top bar with the Forex wordmark + Logout, a content column max-width ~1100px. Status shown as a mono chip (`● Published` amber / `○ Draft` subtle), matching the Studio preview convention.
- **Editor**: two-pane on desktop (Markdown textarea left, live preview right styled with the *same* article CSS the public site uses), single-column stacked on mobile. Toolbar buttons are amber-on-hover, mono-labelled.
- **States**: visible amber focus ring (`outline: 2px solid var(--color-amber)`) on every field/button (a11y parity with the site), clear success/error banners, disabled state on submit, `prefers-reduced-motion` respected.
- **Responsive & a11y**: fully usable on mobile, semantic labels, `lang="en"`, WCAG AA contrast — same bar as the public site.

This is presentation-only and shares no runtime with the React app; it just visually matches.

## 6. PHP components

- **`api/news.php`** — public, `GET` only.
  - `GET /api/news.php` → `{ "articles": [ <index entries> ] }` (published, newest first).
  - `GET /api/news.php?slug=<slug>` → `{ "article": <full doc> }` or 404 JSON.
  - Sends `Cache-Control: public, max-age=60`; `Content-Type: application/json`.
- **`admin/index.php`** — front controller dispatching on `?action=` (login, logout, dashboard, new, edit, save, delete, upload). Server-renders minimal HTML pages styled by `admin/assets/admin.css`. The editor is a `<textarea>` + toolbar + live preview powered by vendored `marked.min.js` (preview only; the authoritative render is the React site).
- **`admin/lib/*.php`** — `auth` (session+password), `store` (JSON CRUD + index rebuild + flock), `csrf`, `upload`, `ratelimit`, `markdown` (server-side preview fallback if JS off). `lib/` blocked from direct web access via `.htaccess`.
- **`article.php`** — receives the slug (via Apache rewrite), loads the published JSON, reads the exported `news/article/index.html` shell, injects `<title>` + `<meta name="description">` + canonical + OpenGraph/Twitter tags (all HTML-escaped) into `<head>`, echoes it. Body still hydrates client-side. Returns the 404 static page if the slug is missing/unpublished.

## 7. Apache rewrites (added to `public/.htaccess`)

```apache
# Pretty article URLs → meta-injecting PHP wrapper (keeps the browser URL).
RewriteRule ^news/?$            -                         [L]   # list shell passes
RewriteRule ^news/article/?$    -                         [L]   # raw shell passes
RewriteRule ^news/([a-z0-9-]+)/?$  /article.php?slug=$1    [L,QSA]
```

Existing CSP, security headers, and the OpenFreeMap/MapLibre allowances are preserved. The current CSP already has `connect-src 'self'` (verified) so the same-origin news fetch needs no CSP change, and `img-src 'self'` already covers the `/uploads/...` images. Cleanup: drop the now-unused `https://cdn.sanity.io` and `https://images.unsplash.com` from `img-src`.

## 8. Frontend (Next) changes

- **`lib/news.ts`** — rewritten as a **client-side** data layer fetching `NEXT_PUBLIC_NEWS_ENDPOINT` (default `/api/news.php`). New `NewsArticle` type: `cover: { url: string; alt: string }`, `body: string` (markdown). Drops all Sanity imports. No build-time fetch, no `FALLBACK_NEWS`, no `generateStaticParams`.
- **`app/news/page.tsx`** — becomes a thin server shell rendering a `"use client"` `NewsList` that fetches the list, shows a loading skeleton, then `NewsCard`s, falling back to the existing `EmptyState`.
- **`app/news/article/page.tsx`** — new `"use client"` page: reads slug from `location.pathname`, fetches `?slug=`, renders header + cover + `NewsBody`, `notFound`-style UI on miss. Replaces and removes `app/news/[slug]/`.
- **`components/v3/NewsCard.tsx`** — cover becomes a plain URL (`article.cover.url`); drops `urlForImage`. Otherwise visually identical.
- **`components/v3/NewsBody.tsx`** — new: `react-markdown` with a `components` map mirroring `PortableBody`'s V3 styling (p/h2/h3/blockquote/ul-li/strong/em/a/img) + `rehype-sanitize`. `PortableBody.tsx` is removed.
- **`components/v3/index.ts`** — swap `PortableBody` export for `NewsBody`.
- **`next.config.ts`** — drop the `cdn.sanity.io`/`images.unsplash.com` remote patterns (images are now same-origin `/uploads/...`; `images.unoptimized` already true). 
- **Dev note:** local `next dev` points the news endpoint and image base at the deployed host (or a local PHP server) via `NEXT_PUBLIC_NEWS_ENDPOINT` so the section works in dev.

## 9. Sanity removal

Delete `sanity/`, `sanity.config.ts`, `sanity.cli.ts`, `lib/sanity.ts`. Remove deps: `sanity`, `@sanity/client`, `@sanity/image-url`, `@sanity/icons`, `@sanity/vision`, `@portabletext/react`, `styled-components` (Sanity-only). Add: `react-markdown`, `remark-gfm`, `rehype-sanitize`. Remove `studio:dev`/`studio:deploy` scripts and Sanity env vars from `.env.example`/`.env.local`. Optionally `sanity undeploy` to retire `forexdrilling.sanity.studio` (no content to migrate — only the placeholder).

## 10. Deploy & ops

- `public/` ships PHP + empty hardened dirs. `rm -rf out && pnpm build` then FTP `out/` **without remote-delete** so `cms-data/` and `uploads/` persist.
- First-run setup (documented in a new `docs/cms.md`): create `.htpasswd`, generate the password hash into `cms-data/config.secret.php`, confirm `cms-data/`/`uploads/` are writable.
- Backup = FTP-download `cms-data/` + `uploads/`.

## 11. Testing & verification

- **PHP**: unit-style checks for slug validation, CSRF mismatch rejection, rate-limit, upload MIME rejection (incl. a `.php`-renamed-as-`.jpg` and an SVG), atomic write under concurrent flock, published-only filtering in the read API. Manual auth flow (Basic Auth + login + logout + wrong password throttle).
- **Frontend**: `pnpm build` exports the two news shells with zero `.map` files; `NewsBody` renders sample markdown safely (XSS payload in body is neutralised by `rehype-sanitize`); list/empty/loading states.
- **Security pass**: confirm `cms-data/` and `admin/lib/` are not web-readable; uploads dir does not execute PHP; drafts never appear in `api/news.php`; meta injection escapes a `"><script>` title.

## 11b. OWASP Top 10 (2021) mapping — explicit coverage

The build is required to address, at minimum, the OWASP Top 10:

| # | Risk | How it's handled |
|---|------|------------------|
| A01 | Broken Access Control | Two independent barriers (Apache Basic Auth + PHP session) on `/admin` and all write actions; public API is read-only and published-only; `cms-data/` and `admin/lib/` denied via `.htaccess`; slug regex blocks path traversal; uploads cannot execute. |
| A02 | Cryptographic Failures | HTTPS only; password stored as `password_hash()` (bcrypt/argon2), never plaintext; secrets in out-of-web `config.secret.php`; cookies `Secure; HttpOnly; SameSite=Strict`; CSRF tokens from `random_bytes`. |
| A03 | Injection | No SQL (flat JSON). All file paths derived from a validated slug allowlist, never raw input. Markdown rendered with `rehype-sanitize` (no `dangerouslySetInnerHTML`); `article.php` HTML-escapes every injected value. No `shell_exec`/`eval`. |
| A04 | Insecure Design | Threat-modelled here; least privilege (read API can't write, can't see drafts); fail-safe defaults (drafts hidden, rate-limit, atomic writes); minimal feature surface (YAGNI §12). |
| A05 | Security Misconfiguration | Hardened `.htaccess` per dir (deny data, no PHP in uploads, noindex admin); errors logged not displayed (`display_errors=0`); no directory listing; CSP/security headers retained from `public/.htaccess`. |
| A06 | Vulnerable & Outdated Components | Near-zero third-party surface: admin is dependency-free vanilla PHP/JS/CSS with **vendored** assets (no CDN). Frontend adds only `react-markdown`/`remark-gfm`/`rehype-sanitize`; `pnpm audit` stays clean (Sanity's large tree is removed). |
| A07 | Identification & Auth Failures | Per-IP login rate-limit (5/10 min); session ID regenerated on login; generic "invalid credentials" message; logout invalidates session; Basic Auth as second factor of access. |
| A08 | Software & Data Integrity Failures | Atomic writes (`tmp`+`rename` under `flock`); no untrusted deserialization (`json_decode` of own files only, validated against a schema); vendored assets are integrity-checked into git, not fetched at runtime. |
| A09 | Logging & Monitoring Failures | Auth failures, rate-limit hits, and write actions appended to an out-of-web `cms-data/audit.log` (timestamp, IP, action) for incident review. |
| A10 | SSRF | No server-side outbound requests from the CMS at all (unlike `contact.php`'s Resend call, the CMS only touches the local filesystem). No URL is ever fetched from user input. |

A focused security pass (manual + the §11 checks) validates each row before sign-off.

## 12. Out of scope (YAGNI)

Multi-user roles, revision history, scheduled publishing, categories/tags, comments, WYSIWYG. Single shared editor login; Markdown only. These can be added later without reworking the storage model.

## 13. Resolved tradeoffs

- **SEO/social**: solved with `article.php` meta injection (per-article title/desc/OG) rather than accepting blind client rendering.
- **Data persistence**: `cms-data/` in web root, `.htaccess`-denied (proven Yulpa pattern), path configurable for an optional move above web root.
