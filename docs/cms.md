# CMS — Sanity (operations guide)

The News section is powered by **Sanity**. The public site is a **static export**
served from the Apache/PHP host (no Node runtime); news is fetched **client-side**
in the browser from Sanity's public CDN, so publishing is **instant — no rebuild**.

- Project ID: `rhvec802` · Dataset: `production`
- Editing happens in the **Sanity-hosted Studio** (not on the Apache host).
- Contact form still posts to the PHP relay `public/contact.php` (the only
  server-side code path on this host).

## Content model

`post` (`lib/sanity/schema/post.ts`): `title`, `slug` (from title), `status`
(`draft`|`published`), `publishedAt`, `excerpt`, `cover` (image, hotspot),
`body` (Portable Text: blocks + images). Only `status == "published"` posts with
a slug appear on the site (`lib/sanity/queries.ts`).

## How the frontend reads it

- `lib/sanity/client.ts` — `next-sanity` client, `useCdn: true` (anonymous public
  reads from `rhvec802.apicdn.sanity.io`).
- `lib/news.ts` — typed fetchers (`fetchNewsList`, `fetchNewsBySlug`, `fetchAllNewsSlugs`).
- `/news/` → `components/v3/NewsList.tsx` fetches the list client-side.
- `/news/<slug>/` → Apache rewrites to the static shell `app/news/article/page.tsx`,
  which reads the slug from the URL and fetches the article client-side. Rewrite
  lives in `public/.htaccess`.
- Images: `lib/sanity/image.ts` `urlFor()` → `cdn.sanity.io` (allowed in the CSP).

## One-time setup (required for the live site to work)

1. **Deploy the Studio** (interactive — pick a hostname, e.g. `forexdrilling`):
   ```bash
   pnpm deploy:studio        # → https://<hostname>.sanity.studio
   ```
2. **Allow the live site as a CORS origin** so the browser fetch is permitted
   (manage.sanity.io → project `rhvec802` → API → CORS origins, or CLI):
   ```bash
   npx sanity cors add https://<your-production-domain> --no-credentials
   ```
   Use the real production domain (confirm hyphen vs no-hyphen). Anonymous public
   reads need **no credentials**.
3. **Make the `production` dataset public** (manage → API → Datasets) so anonymous
   reads succeed.

## Env vars (optional overrides; defaults are baked in)

- `NEXT_PUBLIC_SANITY_PROJECT_ID` (default `rhvec802`)
- `NEXT_PUBLIC_SANITY_DATASET` (default `production`)
- `NEXT_PUBLIC_CONTACT_ENDPOINT` (default `/contact.php`)

## Deploy hygiene

`next.config.ts` sets `distDir:"out"` (same folder the export writes to). Always
`rm -rf out && pnpm build` before zipping/FTP so no dev source maps leak. A clean
`output:"export"` build emits **zero** `.map` files (`find out -name '*.map'` → 0).
