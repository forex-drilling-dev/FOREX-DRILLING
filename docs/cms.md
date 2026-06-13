# CMS — Sanity Studio (deployment & content guide)

The website is a **static export** (`next build` → `out/`, FTP'd to Apache). It has
**no server runtime**, so the admin panel cannot live on the public host. The Studio is
therefore deployed to **Sanity's own hosting**, and the website only **reads published
content at build time**.

```
forexdrilling.sanity.studio   ← the CMS (editors log in here, gated by Sanity auth)
forex-drilling.com            ← the static site (NO /studio, no admin code, no tokens)
```

## Why it's set up this way (security)

- **No admin SPA on the public host.** The Studio is never bundled into `out/`, so
  `forex-drilling.com/studio` does not exist. Zero admin attack surface on our domain.
- **No secrets in the build.** `lib/sanity.ts` reads with only the **public**
  `projectId` / `dataset` and the `published` perspective — no API token. Drafts are
  never readable without a token, so they cannot leak.
- **Auth is Sanity's.** Access to the Studio = membership in the Sanity project
  (Manage → Members). Remove an editor there to revoke access instantly.
- **No CORS to manage.** `*.sanity.studio` is allowed by Sanity automatically, and the
  site reads server-side at build time (no browser request to the Sanity API in prod).

## One-time deploy of the Studio

```bash
sanity login          # if not already authenticated
pnpm studio:deploy    # prompts once for a hostname → forexdrilling.sanity.studio
```

Editors then go to that URL and sign in. To run the Studio locally instead:
`pnpm studio:dev` (http://localhost:3333).

## Content model

One document type: **News article** (`sanity/schemaTypes/newsType.ts`). Fields:
`title`, `slug`, `status` (Draft/Published), `publishedAt`, `excerpt`, `coverImage`
(with required alt text), `body` (rich text). The schema is kept in sync with the
build-time query in `lib/news.ts` — **rename a field in one place and you must rename
it in the other**, or it silently disappears from the site.

## Publishing workflow (important)

Because the site is statically generated, **publishing in the Studio does not update the
live site by itself**. An article goes live only when:

1. The article's **Status = Published** in the Studio, and
2. The site is **rebuilt and redeployed** (`rm -rf out && pnpm build`, then FTP `out/`).

Until the first published article exists, `/news` shows a built-in placeholder so the
static export always has at least one page (see `FALLBACK_NEWS` in `lib/news.ts`).

> To make publishing trigger an automatic rebuild later, you'd need a build hook on a
> CI/host that can run `next build` — not possible from the Apache host alone.
