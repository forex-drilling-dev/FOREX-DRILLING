# Design — Sanity CMS on the static Apache host

**Date:** 2026-06-15
**Branch (target):** `feat/sanity-cms` (new, based on `main`)
**Status:** Approved design — ready for implementation plan

## Context

The project briefly moved the News CMS from Sanity to a self-hosted PHP CMS (merged to
`main` on 2026-06-14). That move is now **reversed**: we are going back to Sanity. A
partial, **uncommitted** migration already exists in the working tree of
`feat/about-central-drill`, but it is in a half-migrated, broken state:

- `app/api/contact/route.ts` (a Next Route Handler) cannot run on the static host.
- `public/.htaccess` still rewrites `/news/<slug>/ → /article.php`, but `article.php`
  was deleted → article URLs are broken.
- The news list is actually fetched at **build time** (server component → prop), not
  client-side.
- `app/admin/[[...index]]/page.tsx` embeds the Studio, which is fragile under static export.

### Hard constraint (from the client)

**The public site must stay on the current host** — Yulpa shared hosting, **Apache + PHP**,
deployed by FTP-uploading `out/`. There is **no Node runtime**. The only server-side code
path available is **PHP**. Not Vercel, not any Node host.

### Confirmed decisions

1. **News rendering:** 100% **client-side** — the browser fetches from Sanity's public CDN
   API. Instant publish, no rebuild. Weaker SEO is explicitly accepted.
2. **Studio:** hosted **by Sanity** (`sanity deploy` → `forexdrilling.sanity.studio`). Not
   embedded on Apache. The public site stays 100% on the current host; only the editing
   tool lives on Sanity.
3. **News article SEO:** **client-side simple** — no per-article OG/meta injected into static
   HTML. No `article.php`. (A PHP meta-injector is explicitly out of scope.)
4. **Git:** the migration lands on a dedicated branch **`feat/sanity-cms`** based on `main`,
   for a clean PR. The About work stays on `feat/about-central-drill`.

## Architecture

```
Browser ──fetch──> Sanity CDN API (rhvec802.apicdn.sanity.io)   [news list + articles]
Browser ──img────> cdn.sanity.io                                [cover + inline images]
Browser ──POST───> /contact.php ──server-side──> api.resend.com [contact form]
Editor  ─────────> forexdrilling.sanity.studio                  [content editing]

Apache static host serves out/ (HTML shells + assets). PHP available for contact.php only.
```

Publishing flow: editor publishes in the hosted Studio → content is live on the Sanity CDN
→ the static site's client-side fetch picks it up immediately. No rebuild, no FTP.

## Components

### 1. Build config — `next.config.ts`
- Re-add **`output: "export"`** (currently missing — the build must produce a static site).
- Keep `distDir:"out"`, `trailingSlash:true`, `images.unoptimized:true`.
- Replace the stale comment referencing "the PHP CMS" serving images — images now come from
  `cdn.sanity.io`. (No `remotePatterns` needed because `unoptimized:true` bypasses the
  allowlist.)

### 2. Contact form → PHP relay (revert)
- Delete `app/api/contact/route.ts`.
- Restore `public/contact.php` via `git checkout HEAD -- public/contact.php` (still in HEAD;
  proven code with honeypot + per-IP rate limit).
- `components/forms/ContactForm.tsx`: default `CONTACT_ENDPOINT` back to `/contact.php`
  (from `/api/contact`). Keep `NEXT_PUBLIC_CONTACT_ENDPOINT` override.

### 3. News list — `/news/` (client-side)
- `app/news/page.tsx`: stops calling `fetchNewsList()` at build; renders the shell
  (`PageHero`, `SectionLabel`) + `<NewsList />` with no `articles` prop.
- `components/v3/NewsList.tsx` (already `"use client"`): fetch published posts from the
  Sanity CDN in a `useEffect`. Reuse the existing `Skeleton` (loading) and `EmptyState`
  (nothing published / fetch error). Update the now-inaccurate "PHP read API" comment.

### 4. News article — `/news/<slug>/` (client shell)
- **Delete** `app/news/[slug]/page.tsx` (SSG dynamic route — cannot do instant-publish under
  `output:"export"`, which requires all slugs known at build).
- Add a single exported shell page `app/news/article/page.tsx` that:
  - reads the slug from `location.pathname` (client),
  - fetches the article from Sanity (`fetchNewsBySlug`),
  - renders cover (`urlFor`) + `NewsBody` (Portable Text), with loading and not-found states.
- `public/.htaccess`: change the rewrite target to the shell:
  `RewriteRule ^news/([a-z0-9-]+)/?$ /news/article/index.html [L,QSA]`
  (instead of the deleted `/article.php`). Keep the `^news/?$` and `^news/article/?$`
  pass-through rules.

### 5. Sanity wiring (already present — keep, with cleanup)
- `sanity.config.ts`, `lib/sanity/{client,queries,image,schema/post}.ts`, `lib/news.ts`
  stay. `lib/news.ts` fetchers are now called **client-side**; the Sanity client must be
  browser-safe (`useCdn:true` for the public read path is appropriate).
- `app/admin/[[...index]]/page.tsx`: **delete** (Studio is Sanity-hosted). `sanity.config.ts`
  stays for the `sanity deploy` CLI.

### 6. Security — `public/.htaccess`
- CSP additions: `connect-src` += `https://rhvec802.apicdn.sanity.io https://rhvec802.api.sanity.io`;
  `img-src` += `https://cdn.sanity.io`. Keep the openfreemap origins, `worker-src blob:`,
  and the `contact.secret.php` `Require all denied` block.

### 7. Cleanup (CLAUDE.md compliance)
- Remove all `any`: type the Sanity image source (e.g. `SanityImageSource`) in `image.ts`,
  and the Portable Text body (`PortableTextBlock[]`) in `NewsBody`/`lib/news.ts`.
- Remove dead deps from the PHP-markdown era: `react-markdown`, `remark-gfm`,
  `rehype-sanitize` (the body is Portable Text now). Verify no remaining imports first.

### 8. Studio deploy
- Document/run `sanity deploy` to publish the Studio to `forexdrilling.sanity.studio`.
  Add a `deploy:studio` npm script if convenient. (One-time CORS origin add for the site
  domain may be needed in Sanity manage so the browser fetch from the live site is allowed.)

## Git / branch strategy

- `main` already contains the PHP CMS, so the migration genuinely deletes merged code.
- Create `feat/sanity-cms` from `main`. Move only the **CMS-related** working-tree changes
  onto it (sanity/**, lib/news.ts, app/news/**, app/admin removal, app/api removal,
  components/v3 news files, ContactForm, next.config, package.json, public/admin & PHP
  deletions, public/contact.php restore, .htaccess).
- The uncommitted **`app/about/page.tsx`** change is About work, NOT CMS — it must NOT go on
  `feat/sanity-cms`; it stays with `feat/about-central-drill`.
- Commit in logical chunks (config/build, contact, news client-side, studio removal,
  security/CSP, cleanup).

## Verification

- `pnpm build` succeeds and emits a static `out/` with **zero** `.map` files
  (`find out -name '*.map'` → 0).
- `out/` contains `news/article/index.html` (the shell) and `contact.php`.
- `/news/` renders the list client-side (skeleton → cards) against the live dataset.
- `/news/<slug>/` resolves via the Apache rewrite to the shell and renders the article.
- Contact form POSTs to `/contact.php` and returns `{ok:true}` on a valid submission.
- No `any` in changed files; `react-markdown`/`remark-gfm`/`rehype-sanitize` gone from
  `package.json` and `pnpm-lock.yaml`.
- CSP validated in-browser: news fetch + Sanity images + MapLibre map all load, 0 violations.

## Out of scope

- PHP meta-injector for per-article SEO/OG (`article.php`).
- Embedding the Studio on Apache.
- Migrating the About auger work or any non-CMS change.
- Server-side rendering / ISR (no Node runtime on the host).
```
