# Self-hosted PHP CMS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]` checkboxes. PHP has no automated test harness in this repo (static-export project); each phase ends with explicit manual/CLI verification gates instead of unit tests where unit tests aren't runnable. Where logic is pure and CLI-testable (slug/markdown/upload validation), a `php` CLI assertion script is included.

**Goal:** Replace Sanity with a self-hosted Apache/PHP CMS — an on-brand `/admin` panel writing JSON to the host, a runtime read API for instant publish, and a Markdown-rendered news section, secured to OWASP Top 10.

**Architecture:** PHP code ships via `public/` (like `contact.php`); data lives in a hardened, runtime, out-of-build `cms-data/`; the Next news section becomes client-rendered, fetching `/api/news.php`; article URLs are meta-injected by `article.php`. Defense-in-depth auth = Apache Basic Auth + PHP session + CSRF + rate-limit.

**Tech Stack:** PHP 8 (vanilla, no framework), Next.js 16 static export, React 19, `react-markdown` + `remark-gfm` + `rehype-sanitize`, vanilla JS/CSS admin (vendored `marked`).

Spec: `docs/superpowers/specs/2026-06-14-self-hosted-php-cms-design.md`.

---

## Phase 1 — Remove Sanity, swap dependencies

### Task 1: Delete Sanity code & deps

**Files:**
- Delete: `sanity/`, `sanity.config.ts`, `sanity.cli.ts`, `lib/sanity.ts`
- Modify: `package.json`, `.env.example`, `.env.local`, `next.config.ts`

- [ ] Remove deps: `pnpm remove sanity @sanity/client @sanity/image-url @sanity/icons @sanity/vision @portabletext/react styled-components`
- [ ] Add deps: `pnpm add react-markdown remark-gfm rehype-sanitize`
- [ ] `rm -rf sanity sanity.config.ts sanity.cli.ts lib/sanity.ts`
- [ ] Remove `studio:dev`/`studio:deploy` from `package.json` scripts; remove `NEXT_PUBLIC_SANITY_*` from `.env.example` and `.env.local`; add `NEXT_PUBLIC_NEWS_ENDPOINT=/api/news.php`.
- [ ] `next.config.ts`: drop `cdn.sanity.io` + `images.unsplash.com` remote patterns (keep `unoptimized: true`).
- [ ] Verify: `grep -rn "sanity\|@portabletext\|portable" app components lib --include=*.ts --include=*.tsx` → 0 matches (after later frontend tasks). For now expect only `app/news/*` + `components/v3/{NewsCard,PortableBody}` to still reference removed imports; those are fixed in Phase 3.
- [ ] Commit: `chore(cms): remove Sanity, add markdown deps`

---

## Phase 2 — PHP backend (ships in `public/`)

All paths below are under `public/` so the build copies them to `out/`.

### Task 2: Data store + config (`public/admin/lib/store.php`, `config.php`)

**Files:**
- Create: `public/admin/lib/config.php` — resolves `CMS_DATA_DIR` (default `__DIR__/../../cms-data` → web-root `cms-data/`), `UPLOADS_DIR` (`__DIR__/../../uploads/news`), `UPLOADS_URL` (`/uploads/news`), slug regex, allowed image types/size.
- Create: `public/admin/lib/store.php` — `news_list($includeDrafts)`, `news_get($slug)`, `news_save($doc)`, `news_delete($slug)`, `rebuild_index()`. Atomic write (`tempnam`+`rename`) under `flock`; `json_encode`/`json_decode` of own files only; validates slug against regex before any path use.
- Create: `public/cms-data/.htaccess` — `Require all denied` (+ `Deny from all` for old Apache).

- [ ] Implement config + store with strict slug validation (`^[a-z0-9-]{1,96}$`); reject anything else before building a path (anti path-traversal, A01/A03).
- [ ] CLI test `php public/admin/lib/_test_store.php` (temp dir): save→get→list→delete roundtrip; assert traversal slug `../x` is rejected; assert index excludes `body` and orders by `publishedAt` desc; assert drafts excluded when `includeDrafts=false`.
- [ ] Run: `php public/admin/lib/_test_store.php` → all asserts pass; then `rm` the test file.
- [ ] Commit: `feat(cms): JSON store with atomic writes + slug allowlist`

### Task 3: Auth, CSRF, rate-limit (`public/admin/lib/{auth,csrf,ratelimit}.php`)

**Files:**
- Create: `public/admin/lib/auth.php` — session bootstrap with `HttpOnly; Secure; SameSite=Strict`; `auth_login($pw)` (`password_verify` vs hash in `cms-data/config.secret.php`), `auth_logout()`, `auth_require()` (redirect to login if not authed), `session_regenerate_id` on login.
- Create: `public/admin/lib/csrf.php` — `csrf_token()` (`random_bytes` per session), `csrf_check($t)` (`hash_equals`).
- Create: `public/admin/lib/ratelimit.php` — `rl_ok($key)` 5/10min file-based in `cms-data/ratelimit/`, fail-open; mirror `contact.php`.
- Create: `public/admin/lib/audit.php` — `audit($action)` appends `time|ip|action` to `cms-data/audit.log` (A09).
- Create: `cms-data/config.secret.php` is NOT committed; provide `public/admin/lib/config.secret.example.php` documenting the hash format.

- [ ] Implement; ensure `display_errors=0` + `error_reporting` to log only (A05).
- [ ] CLI test: `password_hash`/`verify` roundtrip; `csrf_check` rejects mismatch & accepts match; `rl_ok` blocks the 6th call within window.
- [ ] Commit: `feat(cms): session auth, CSRF, rate-limit, audit log`

### Task 4: Upload handling (`public/admin/lib/upload.php`, `public/uploads/.htaccess`)

**Files:**
- Create: `public/admin/lib/upload.php` — `upload_image($file)`: verify via `getimagesize()` (real MIME), extension allowlist jpg/jpeg/png/webp/avif, size ≤ 6 MB, reject SVG, random `bin2hex(random_bytes(8))` filename, move into `UPLOADS_DIR`, return `{url, alt:''}`.
- Create: `public/uploads/.htaccess` — disable PHP exec (`php_flag engine off`, `RemoveHandler .php .phtml`, `SetHandler none`), `Options -ExecCGI`.

- [ ] Implement; on any validation failure return an error (no partial writes).
- [ ] CLI test: a text file renamed `.jpg` is rejected (getimagesize fails); an SVG is rejected; a real PNG passes and lands with a random name.
- [ ] Commit: `feat(cms): hardened image upload`

### Task 5: Public read API (`public/api/news.php`)

**Files:**
- Create: `public/api/news.php` — `GET` only (405 otherwise). No params → `{articles:[index, published only]}`. `?slug=` → `{article}` (published only) or 404 JSON. Headers: `Content-Type: application/json`, `Cache-Control: public, max-age=60`, `X-Content-Type-Options: nosniff`. Never returns drafts or filesystem paths.

- [ ] Implement using `store.php` (`news_list(false)`, `news_get` filtered to published).
- [ ] CLI test via `php -S` (local): seed one published + one draft; `curl /api/news.php` shows only published; `?slug=<draft>` → 404; method `POST` → 405.
- [ ] Commit: `feat(cms): public read API (published-only)`

### Task 6: Admin panel front controller (`public/admin/index.php`)

**Files:**
- Create: `public/admin/index.php` — dispatch `?action=` ∈ {login, logout, dashboard(default), new, edit, save, delete, upload}. All non-login actions `auth_require()`. All mutations require `csrf_check` + re-validate inputs (title ≤160, excerpt 40–300, slug regex, status ∈ {draft,published}, body string). `save` writes via `store`, rebuilds index, `audit()`. `upload` returns JSON `{url}`.
- Create: `public/admin/lib/markdown.php` — server-side markdown→safe-HTML for the no-JS preview fallback (escape first, then a minimal subset). Authoritative render is React; this is fallback only.

- [ ] Implement controller with POST-redirect-GET, success/error flash via session.
- [ ] Manual gate (local `php -S`): login wrong pw → throttled after 5; login right pw → dashboard; create/edit/publish/delete article; CSRF token tampering → rejected; logout clears session.
- [ ] Commit: `feat(cms): admin front controller + actions`

### Task 7: On-brand admin UI (`public/admin/assets/*`, templates)

**Files:**
- Create: `public/admin/assets/admin.css` — V3 tokens as plain CSS (navy/ocre/fore/muted/subtle), Barlow Condensed / IBM Plex Mono / Inter (self-hosted in `assets/fonts/`), amber focus rings, cards, top bar, two-pane editor, responsive, `prefers-reduced-motion`.
- Create: `public/admin/assets/admin.js` — toolbar (bold/h2/h3/link/list/image-insert), live preview via vendored `marked.min.js`, upload via `fetch` to `?action=upload` with CSRF header, unsaved-changes guard.
- Create: `public/admin/assets/marked.min.js` (vendored, MIT), `public/admin/assets/fonts/*` (subset woff2; reuse the site's font files if already in `public/fonts/`).
- Create: view partials inside `index.php` or `admin/views/{login,dashboard,edit}.php`.

- [ ] Build the UI to visually match the public site (dark navy, amber CTAs, condensed headings, mono labels). Editor two-pane desktop / stacked mobile.
- [ ] Manual gate: panel looks on-brand; AA contrast; keyboard focus visible; preview matches article styling; mobile usable.
- [ ] Commit: `feat(cms): ultra-clean on-brand admin UI`

### Task 8: Article meta-injection wrapper (`public/article.php`)

**Files:**
- Create: `public/article.php` — read `?slug=`, validate, `news_get` (published only). If missing → output the static `404.html` with 404 status. Else read `news/article/index.html`, inject HTML-escaped `<title>`, `<meta name=description>`, canonical `/news/<slug>/`, OG/Twitter (title, description, image=cover absolute URL, type=article) into `<head>`, echo. Body hydrates client-side.

- [ ] Implement with strict escaping (`htmlspecialchars`) on every injected value (A03).
- [ ] Manual gate (local): a title containing `"><script>` is rendered inert in `<head>`; OG tags correct; unknown slug → 404.
- [ ] Commit: `feat(cms): per-article SEO/OG via PHP meta injection`

---

## Phase 3 — Frontend (Next) rework

### Task 9: Client data layer (`lib/news.ts`)

**Files:**
- Modify: `lib/news.ts` — replace Sanity build-time reader with a client fetcher. New types:
  `NewsArticle = { id, slug, status, title, excerpt, publishedAt, cover: {url:string; alt:string}, body: string }`.
  `fetchNewsList(): Promise<NewsArticle[]>` and `fetchNewsBySlug(slug): Promise<NewsArticle|null>` hitting `NEXT_PUBLIC_NEWS_ENDPOINT`. Remove `FALLBACK_NEWS`, `getNewsSlugs`, Sanity imports.

- [ ] Implement; handle fetch/HTTP errors by surfacing empty/null (UI shows Empty/NotFound, not a crash) — but log to console (no silent swallow of unexpected errors).
- [ ] Commit: `refactor(news): client-side data layer over PHP API`

### Task 10: Markdown body component (`components/v3/NewsBody.tsx`)

**Files:**
- Create: `components/v3/NewsBody.tsx` — `react-markdown` with `remarkPlugins=[remarkGfm]`, `rehypePlugins=[rehypeSanitize]`, and a `components` map mirroring `PortableBody` V3 styling (p, h2, h3, blockquote, ul/li, strong, em, a[external→target/rel], img→next/image-like figure). Props: `{ markdown: string }`.
- Delete: `components/v3/PortableBody.tsx`
- Modify: `components/v3/index.ts` — export `NewsBody`, drop `PortableBody`.

- [ ] Implement; ensure links/images are sanitized; external links get `rel="noopener noreferrer"`.
- [ ] Commit: `feat(news): sanitized markdown renderer (replaces Portable Text)`

### Task 11: News list (client) (`app/news/page.tsx` + `components/v3/NewsList.tsx`)

**Files:**
- Create: `components/v3/NewsList.tsx` (`"use client"`) — fetch list on mount, loading skeleton, render `NewsCard`s, `EmptyState` when empty.
- Modify: `app/news/page.tsx` — keep static `PageHero` + section chrome + metadata; render `<NewsList/>` instead of build-time mapping. Remove `getAllNews`.
- Modify: `components/v3/NewsCard.tsx` — use `article.cover.url` + `article.cover.alt`; drop `urlForImage`/Sanity.

- [ ] Implement; verify the page still exports statically (shell) and hydrates.
- [ ] Commit: `feat(news): client-rendered list over the API`

### Task 12: Article page (client) (`app/news/article/page.tsx`)

**Files:**
- Create: `app/news/article/page.tsx` (`"use client"`) — read slug from `location.pathname` (`/news/<slug>/`), fetch by slug, render header (badge, date, title, excerpt) + cover + `<NewsBody/>`; show a "not found" state on miss. Static metadata is generic (per-article meta comes from `article.php`).
- Delete: `app/news/[slug]/page.tsx` (and the `[slug]` dir).

- [ ] Implement; ensure it builds under `output: export` (no `generateStaticParams` needed — it's a single static shell).
- [ ] Commit: `feat(news): client-rendered article shell`

---

## Phase 4 — Apache wiring & hardening

### Task 13: Rewrites + headers (`public/.htaccess`)

**Files:**
- Modify: `public/.htaccess` — add the article rewrite block (spec §7); drop `cdn.sanity.io`/`images.unsplash.com` from CSP `img-src`; confirm `connect-src 'self'` present (it is). Ensure `/admin` gets `X-Robots-Tag: noindex` + `X-Frame-Options: DENY`.
- Create: `public/admin/.htaccess` — Apache Basic Auth (`AuthType Basic`, `AuthUserFile` → out-of-web `.htpasswd`), `Require valid-user`; `noindex`; deny direct access to `lib/`.

- [ ] Implement; keep MapLibre/OpenFreeMap allowances intact.
- [ ] Manual gate: `/news/<slug>/` resolves via `article.php`; `/news/` and `/news/article/` still serve the shells; `cms-data/` and `admin/lib/` return 403.
- [ ] Commit: `feat(cms): Apache rewrites + admin Basic Auth + hardening`

---

## Phase 5 — Docs, build, security pass

### Task 14: Docs

**Files:**
- Rewrite: `docs/cms.md` — self-hosted model, first-run setup (`.htpasswd`, generate `config.secret.php` hash, dir permissions), deploy hygiene (FTP no-delete on `cms-data/`+`uploads/`; `cms-data` never in `out/`), backup, editor workflow (instant publish).

- [ ] Write; remove Sanity references.
- [ ] Commit: `docs(cms): self-hosted CMS operations guide`

### Task 15: Full build + security verification

- [ ] `rm -rf out && pnpm build` → succeeds; `/news` + `/news/article` shells exported; `find out -name '*.map' | wc -l` = 0.
- [ ] `pnpm exec eslint app components lib` on changed files → clean.
- [ ] Grep: no `sanity`/`@portabletext` references remain in `app/components/lib`.
- [ ] Security checklist (spec §11/§11b): drafts hidden in API; XSS payload in body neutralised by `rehype-sanitize`; `"><script>` title inert via `article.php`; upload rejects fake-image + SVG; `cms-data`/`admin/lib` not web-readable; uploads dir no PHP exec; Basic Auth + session both required.
- [ ] `pnpm audit` → confirm Sanity tree gone, no new high/critical.
- [ ] Update memory: replace `cms-sanity-architecture` with the self-hosted model.
- [ ] Commit: `chore(cms): final build + security verification`

---

## Self-review notes

- **Spec coverage:** every spec section maps to a task (storage→T2, auth/CSRF/RL→T3, uploads→T4, read API→T5, admin controller→T6, on-brand UI→T7/§5b, meta injection→T8, frontend→T9–12, rewrites/headers→T13, OWASP→addressed across T2–T8 + verified T15, docs→T14).
- **Dev caveat:** local `next dev` needs `NEXT_PUBLIC_NEWS_ENDPOINT` pointed at a running `php -S` or the live host for the news section to populate (Task 9 + docs).
- **No DB:** flat JSON by design (spec §4); concurrency via flock.
