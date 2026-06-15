# Sanity CMS on the Static Apache Host — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reverse the PHP CMS back to Sanity, with the public site staying a static export on the Apache/PHP host: news fetched client-side from the Sanity CDN, contact via the existing PHP relay, Studio hosted on Sanity.

**Architecture:** `output:"export"` static site on Apache. The browser fetches news from Sanity's public CDN API (instant publish). Contact posts to `public/contact.php` (the only server code path). The Studio is deployed to Sanity's hosting, not bundled. All CMS work lands on a clean `feat/sanity-cms` branch based on `main`.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, Tailwind v4, `next-sanity` / `@sanity/client` / `@sanity/image-url`, `@portabletext/react`, PHP (contact relay), Apache `.htaccess`.

**Spec:** `docs/superpowers/specs/2026-06-15-sanity-static-host-design.md`

**Key context for the executor:**
- `main` currently contains the PHP CMS (`public/admin/**`, `public/article.php`, etc.) AND `public/contact.php`. Basing on `main` means contact.php is already present (good) and the PHP CMS files must be deleted.
- The current half-migrated work lives **uncommitted** in `feat/about-central-drill`'s working tree. We treat it as a *reference* for the Sanity code, transplanting only clearly-CMS files.
- This is static-export / frontend work: the "test" for most tasks is a successful `pnpm build` + `grep`/file-existence checks, not unit tests.

---

## Task 1: Create a clean `feat/sanity-cms` branch from `main`

**Goal:** Move only CMS files onto a main-based branch; leave About work on `feat/about-central-drill`.

**CMS files to transplant** (unambiguously CMS):
```
lib/sanity/            (untracked — new)
sanity.config.ts       (untracked — new)
lib/news.ts            (Sanity rewrite)
app/news/page.tsx      (shell, no build fetch)
components/v3/NewsBody.tsx
components/v3/NewsCard.tsx
components/v3/NewsList.tsx
components/v3/index.ts  (remove ArticleView export)
components/forms/ContactForm.tsx
next.config.ts
```
**Do NOT transplant** (About work / handled separately): `app/about/page.tsx`, `components/v3/PageHero.tsx`, `components/v3/QuoteBlock.tsx`, `package.json`, `pnpm-lock.yaml` (deps handled in Task 9), `app/admin/**`, `app/api/**`, `app/news/[slug]/**` (deleted per design).

- [ ] **Step 1: Snapshot the current working tree on the About branch**

```bash
cd "/Users/sohan/Forex Drilling"
git status --short        # confirm we're on feat/about-central-drill with the CMS changes
git add -A
git commit -m "wip: snapshot before splitting sanity-cms (temporary)"
SNAP=$(git rev-parse HEAD); echo "snapshot=$SNAP"
```
Expected: a temporary commit is created; `$SNAP` holds its SHA.

- [ ] **Step 2: Create the clean branch from main**

```bash
git checkout -b feat/sanity-cms main
git status --short        # expect clean (matches main)
```
Expected: new branch `feat/sanity-cms`, working tree clean at main.

- [ ] **Step 3: Bring the CMS files from the snapshot**

```bash
git checkout $SNAP -- \
  lib/sanity sanity.config.ts \
  lib/news.ts app/news/page.tsx \
  components/v3/NewsBody.tsx components/v3/NewsCard.tsx components/v3/NewsList.tsx \
  components/v3/index.ts components/forms/ContactForm.tsx next.config.ts
git status --short
```
Expected: the listed files appear staged/modified; nothing else.

- [ ] **Step 4: Cherry-pick the design spec onto this branch**

```bash
git checkout $SNAP -- docs/superpowers/specs/2026-06-15-sanity-static-host-design.md \
  docs/superpowers/plans/2026-06-15-sanity-static-host.md
```
Expected: spec + plan docs present on `feat/sanity-cms`.

- [ ] **Step 5: Verify the branch diff vs main is CMS-only**

```bash
git add -A
git diff --cached --name-only | sort
```
Expected: only the CMS files above (+ the spec). NO `app/about/page.tsx`, NO `PageHero.tsx`/`QuoteBlock.tsx`, NO `package.json` yet, NO `app/admin`/`app/api`/`app/news/[slug]`.

- [ ] **Step 6: Commit the transplant**

```bash
git commit -m "chore(cms): seed sanity-cms branch from main (news + sanity client + contact)"
```

- [ ] **Step 7: Restore the About branch to a clean state**

```bash
git checkout feat/about-central-drill
git reset --soft HEAD~1          # undo the wip snapshot; changes return to the working tree
# discard the CMS file changes there (they now live on feat/sanity-cms):
git checkout -- lib/news.ts app/news/page.tsx components/v3/NewsBody.tsx \
  components/v3/NewsCard.tsx components/v3/NewsList.tsx components/v3/index.ts \
  components/forms/ContactForm.tsx next.config.ts
git checkout -- package.json pnpm-lock.yaml
# remove untracked CMS additions and restore deleted PHP files on the About branch:
rm -rf lib/sanity sanity.config.ts app/admin app/api "app/news/[slug]"
git checkout -- public/ app/news/article/page.tsx components/v3/ArticleView.tsx
git status --short
```
Expected: About branch working tree shows **only** About changes — `app/about/page.tsx`, `components/v3/PageHero.tsx`, `components/v3/QuoteBlock.tsx` (modified). No CMS files, no PHP deletions.

- [ ] **Step 8: Switch back to the CMS branch for the rest of the work**

```bash
git checkout feat/sanity-cms
```

---

## Task 2: Build config — restore static export

**Files:** Modify `next.config.ts`

- [ ] **Step 1: Set output:"export" and fix the stale comment**

Replace the file contents with:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    // Static export: images are not optimized at runtime. News cover/inline
    // images are served from the Sanity CDN (cdn.sanity.io). `unoptimized`
    // bypasses the optimizer and its remote-host allowlist.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "build(cms): restore output:export for the static Apache host"
```

---

## Task 3: Sanity client — browser-safe public read

**Files:** Modify `lib/sanity/client.ts`, `lib/sanity/image.ts`

- [ ] **Step 1: Use the CDN for the public client read**

`lib/sanity/client.ts` — set `useCdn: true` (anonymous public reads from the apicdn host; instant-enough and cacheable):
```ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rhvec802',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-14',
  useCdn: true,
});
```

- [ ] **Step 2: Remove `any` from the image helper**

`lib/sanity/image.ts`:
```ts
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './client';

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```

- [ ] **Step 3: Typecheck**

```bash
pnpm exec tsc --noEmit
```
Expected: no errors in `lib/sanity/**` (other files may still error until later tasks — note them, don't fix unrelated yet).

- [ ] **Step 4: Commit**

```bash
git add lib/sanity/client.ts lib/sanity/image.ts
git commit -m "feat(cms): browser-safe Sanity client (useCdn) + typed urlFor"
```

---

## Task 4: News data layer — typed, client-callable

**Files:** Modify `lib/news.ts`

- [ ] **Step 1: Type the article and Portable Text body**

Replace `lib/news.ts` body types (remove `any`):
```ts
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './sanity/client';
import {
  GET_ALL_POSTS_QUERY,
  GET_POST_BY_SLUG_QUERY,
  GET_ALL_POST_SLUGS_QUERY,
} from './sanity/queries';

export interface NewsArticle {
  _id: string;
  slug: string;
  status: "draft" | "published";
  title: string;
  excerpt: string;
  publishedAt: string;
  cover?: SanityImageSource;
  body?: PortableTextBlock[];
}

export async function fetchNewsList(): Promise<NewsArticle[]> {
  try {
    return (await client.fetch<NewsArticle[]>(GET_ALL_POSTS_QUERY)) || [];
  } catch (err) {
    console.error("[news] list fetch failed", err);
    return [];
  }
}

export async function fetchNewsBySlug(slug: string): Promise<NewsArticle | null> {
  if (!slug) return null;
  try {
    return (await client.fetch<NewsArticle | null>(GET_POST_BY_SLUG_QUERY, { slug })) || null;
  } catch (err) {
    console.error("[news] article fetch failed", err);
    return null;
  }
}

export async function fetchAllNewsSlugs(): Promise<{ slug: string }[]> {
  try {
    return (await client.fetch<{ slug: string }[]>(GET_ALL_POST_SLUGS_QUERY)) || [];
  } catch (err) {
    console.error("[news] slugs fetch failed", err);
    return [];
  }
}
```

- [ ] **Step 2: Ensure `@portabletext/types` is available**

```bash
pnpm ls @portabletext/types || pnpm add @portabletext/types
```
Expected: present (transitive of `@portabletext/react`) or installed.

- [ ] **Step 3: Commit**

```bash
git add lib/news.ts package.json pnpm-lock.yaml
git commit -m "feat(cms): typed Sanity news fetchers (no any)"
```

---

## Task 5: News list — client-side fetch

**Files:** Modify `app/news/page.tsx`, `components/v3/NewsList.tsx`

- [ ] **Step 1: Make the news page a static shell (no build-time fetch)**

`app/news/page.tsx` — remove the `fetchNewsList` import/call and the `articles` prop:
```tsx
import type { Metadata } from "next";
import { PageHero, SectionLabel, Reveal, NewsList } from "@/components/v3";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news and updates from Forex Drilling — projects, fleet, and operations across the Asia-Pacific region.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        badge="NEWS"
        line1="Latest"
        line2="News & updates."
        photo={{
          src: "/images/site-operations.jpg",
          alt: "Forex Drilling crew working a multi-rig site at night",
        }}
        body={
          <>
            News and updates from our projects, fleet, and operations across
            the Asia-Pacific region.
          </>
        }
      />
      <section className="relative bg-white py-12 md:py-32">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
          <Reveal className="flex max-w-[820px] flex-col gap-5">
            <SectionLabel number="01" label="Latest" />
          </Reveal>
          <NewsList />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: NewsList fetches client-side from Sanity**

`components/v3/NewsList.tsx` — replace the `articles` prop with a `useEffect` fetch. Keep the existing `Skeleton` and `EmptyState` (update the stale "PHP read API" comment). Top of file:
```tsx
"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "./NewsCard";
import { Reveal } from "./Reveal";
import { fetchNewsList, type NewsArticle } from "@/lib/news";
```
Keep `Skeleton()` and `EmptyState()` as-is (only fix the file's top comment to say the list is fetched at runtime from the Sanity CDN). Replace the exported component:
```tsx
export function NewsList() {
  const [articles, setArticles] = useState<NewsArticle[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchNewsList().then((list) => {
      if (active) setArticles(list);
    });
    return () => {
      active = false;
    };
  }, []);

  if (articles === null) return <Skeleton />;
  if (articles.length === 0) return <EmptyState />;

  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <li key={article._id || article.slug}>
          <Reveal>
            <NewsCard article={article} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 3: Build check**

```bash
pnpm build
```
Expected: build succeeds; `out/news/index.html` exists.

- [ ] **Step 4: Commit**

```bash
git add app/news/page.tsx components/v3/NewsList.tsx
git commit -m "feat(cms): client-side news list from Sanity CDN"
```

---

## Task 6: News article — client shell + Apache rewrite

**Files:** Create `app/news/article/page.tsx`; verify `components/v3/NewsBody.tsx`, `components/v3/NewsCard.tsx`

- [ ] **Step 1: Type NewsBody's body prop (no any)**

`components/v3/NewsBody.tsx` — change the signature:
```tsx
import type { PortableTextBlock } from "@portabletext/types";
// ...
export function NewsBody({ body }: { body?: PortableTextBlock[] }) {
  if (!body) return null;
  return <PortableText value={body} components={components} />;
}
```

- [ ] **Step 2: Create the client article shell**

Create `app/news/article/page.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchNewsBySlug, type NewsArticle } from "@/lib/news";
import { formatNewsDate } from "@/lib/date";
import { urlFor } from "@/lib/sanity/image";
import { YellowBadge, SectionLink } from "@/components/v3";
import { NewsBody } from "@/components/v3/NewsBody";

function slugFromPath(): string {
  // URL is /news/<slug>/ (Apache rewrites it to this shell). Pull the slug.
  if (typeof window === "undefined") return "";
  const parts = window.location.pathname.split("/").filter(Boolean);
  // ["news", "<slug>"]  — guard against the bare /news/article/ shell URL.
  if (parts[0] !== "news") return "";
  const last = parts[parts.length - 1];
  return last === "article" ? "" : last;
}

export default function NewsArticleShell() {
  const [state, setState] = useState<{ status: "loading" | "ready" | "notfound"; article: NewsArticle | null }>({
    status: "loading",
    article: null,
  });

  useEffect(() => {
    let active = true;
    const slug = slugFromPath();
    if (!slug) {
      setState({ status: "notfound", article: null });
      return;
    }
    fetchNewsBySlug(slug).then((article) => {
      if (!active) return;
      setState(article ? { status: "ready", article } : { status: "notfound", article: null });
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="mx-auto max-w-[820px] px-6 pt-[calc(var(--spacing-nav)+56px)] md:px-14">
        <div className="h-3 w-24 animate-pulse rounded bg-deep/10" />
        <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-deep/10" />
        <div className="mt-4 h-20 w-full animate-pulse rounded bg-deep/10" />
      </div>
    );
  }

  if (state.status === "notfound" || !state.article) {
    return (
      <div className="mx-auto max-w-[760px] px-6 py-24 md:px-14">
        <p className="font-display font-extrabold uppercase text-deep-navy" style={{ fontSize: "clamp(22px, 5vw, 32px)" }}>
          Article not found.
        </p>
        <div className="mt-8">
          <SectionLink href="/news" label="All news" prefix="Back to" />
        </div>
      </div>
    );
  }

  const article = state.article;
  const cover = article.cover ? urlFor(article.cover).url() : null;

  return (
    <article className="bg-white">
      <header className="mx-auto max-w-[820px] px-6 pt-[calc(var(--spacing-nav)+32px)] md:px-14 md:pt-[calc(var(--spacing-nav)+56px)]">
        <YellowBadge size="sm">NEWS</YellowBadge>
        <p className="mt-6 font-mono uppercase text-[var(--color-amber-dim)]" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
          {formatNewsDate(article.publishedAt)}
        </p>
        <h1 className="mt-3 font-display font-extrabold uppercase text-deep-navy text-balance" style={{ fontSize: "clamp(30px, 6vw, 56px)", lineHeight: "1.04", letterSpacing: "-0.005em" }}>
          {article.title}
        </h1>
        <p className="mt-5 font-sans font-medium text-deep-navy" style={{ fontSize: "clamp(16px, 4.4vw, 19px)", lineHeight: "1.6" }}>
          {article.excerpt}
        </p>
      </header>

      {cover && (
        <div className="mx-auto mt-10 max-w-[1100px] px-6 md:mt-14 md:px-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-deep" style={{ boxShadow: "var(--shadow-image)" }}>
            <Image src={cover} alt={article.title} fill sizes="(min-width:1100px) 1040px, 100vw" className="object-cover" priority />
          </div>
        </div>
      )}

      {article.body && (
        <div className="mx-auto mt-10 flex max-w-[760px] flex-col gap-5 px-6 pb-4 md:mt-16 md:px-14">
          <NewsBody body={article.body} />
        </div>
      )}

      <div className="mx-auto max-w-[760px] px-6 py-12 md:px-14 md:py-16">
        <SectionLink href="/news" label="All news" prefix="Back to" />
      </div>
    </article>
  );
}
```

- [ ] **Step 3: Remove the SSG `[slug]` route (incompatible with instant-publish export)**

```bash
rm -rf "app/news/[slug]"
```

- [ ] **Step 4: Build check**

```bash
pnpm build
test -f out/news/article/index.html && echo "shell OK"
```
Expected: build succeeds; `out/news/article/index.html` exists.

- [ ] **Step 5: Commit**

```bash
git add app/news/article/page.tsx components/v3/NewsBody.tsx
git add -A "app/news/[slug]" 2>/dev/null; true
git commit -m "feat(cms): client article shell + typed PortableText body; drop SSG [slug] route"
```

---

## Task 7: Component barrel — drop ArticleView export

**Files:** Modify `components/v3/index.ts`

- [ ] **Step 1: Confirm ArticleView is gone and not exported**

```bash
grep -n "ArticleView" components/v3/index.ts || echo "no ArticleView export (good)"
test -f components/v3/ArticleView.tsx && echo "WARNING: ArticleView.tsx still exists" || echo "ArticleView.tsx absent (good)"
```
Expected: no `ArticleView` export line (the transplanted `index.ts` already removed it); the component file is absent on this branch.

- [ ] **Step 2: Grep for stray ArticleView imports**

```bash
grep -rn "ArticleView" app components || echo "no references (good)"
```
Expected: no references.

- [ ] **Step 3: Commit if changed**

```bash
git add components/v3/index.ts
git commit -m "refactor(cms): remove ArticleView export" || echo "nothing to commit"
```

---

## Task 8: Contact form → PHP relay endpoint

**Files:** Modify `components/forms/ContactForm.tsx`; confirm `public/contact.php`; ensure no `app/api`

- [ ] **Step 1: Point the form at /contact.php**

In `components/forms/ContactForm.tsx`, set the default endpoint back to the PHP relay:
```tsx
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/contact.php";
```
Expected: the `?? "/api/contact"` default is gone.

- [ ] **Step 2: Confirm contact.php is present (it ships from main) and no Node route exists**

```bash
test -f public/contact.php && echo "contact.php present"
test -d app/api && echo "WARNING: app/api still present" || echo "no app/api (good)"
```
Expected: `contact.php present`; `no app/api`.

- [ ] **Step 3: Commit**

```bash
git add components/forms/ContactForm.tsx
git commit -m "fix(contact): post to PHP relay (/contact.php) for the static host"
```

---

## Task 9: Dependencies — add Sanity, drop dead markdown deps

**Files:** Modify `package.json`, regenerate `pnpm-lock.yaml`

**Context:** This branch's `package.json` is main's (no Three.js, no Sanity yet). Add the Sanity runtime deps the new code imports and remove the PHP-markdown-era deps.

- [ ] **Step 1: Add Sanity deps used by the new code**

```bash
pnpm add next-sanity @sanity/image-url @portabletext/react @portabletext/types sanity styled-components
```
Expected: installs; `package.json` gains these.

- [ ] **Step 2: Remove dead markdown deps**

```bash
pnpm remove react-markdown remark-gfm rehype-sanitize 2>/dev/null || true
grep -rEl "react-markdown|remark-gfm|rehype-sanitize" app components lib || echo "no source imports (safe to remove)"
```
Expected: no remaining source imports of those packages.

- [ ] **Step 3: Typecheck + build**

```bash
pnpm exec tsc --noEmit && pnpm build
```
Expected: clean typecheck; successful static build.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add Sanity runtime deps, drop dead markdown deps"
```

---

## Task 10: Delete the PHP CMS (kept on main, not in the Sanity model)

**Files:** Delete `public/admin/**`, `public/article.php`, `public/sitemap-news.php`, `public/cms-data/.htaccess`. **Keep** `public/contact.php`.

- [ ] **Step 1: Remove the PHP CMS files**

```bash
git rm -r public/admin
git rm public/article.php public/sitemap-news.php
git rm public/cms-data/.htaccess 2>/dev/null || true
test -f public/contact.php && echo "contact.php KEPT (good)"
```
Expected: PHP CMS removed; `contact.php` kept.

- [ ] **Step 2: Build check**

```bash
pnpm build
```
Expected: success.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(cms): remove the self-hosted PHP CMS (superseded by Sanity)"
```

---

## Task 11: Apache `.htaccess` — article rewrite + CSP for Sanity

**Files:** Modify `public/.htaccess`

- [ ] **Step 1: Point the article rewrite at the static shell (not the deleted article.php)**

In `public/.htaccess`, in the `mod_rewrite` block, change the slug rule:
```apache
  RewriteRule ^news/([a-z0-9-]+)/?$ /news/article/index.html [L,QSA]
```
(Keep `RewriteRule ^news/?$ - [L]` and `RewriteRule ^news/article/?$ - [L]` above it.) Also update the French comment above the block to say the shell now fetches the article client-side from Sanity (no article.php / no SEO injection).

- [ ] **Step 2: Add Sanity origins to the CSP**

In the `Content-Security-Policy` header, extend two directives:
- `img-src` → add `https://cdn.sanity.io`
- `connect-src` → add `https://rhvec802.apicdn.sanity.io https://rhvec802.api.sanity.io`

Resulting (keep everything else identical):
```
... img-src 'self' data: blob: https://tiles.openfreemap.org https://cdn.sanity.io; font-src 'self'; connect-src 'self' https://tiles.openfreemap.org https://rhvec802.apicdn.sanity.io https://rhvec802.api.sanity.io; worker-src blob:; manifest-src 'self'
```

- [ ] **Step 3: Verify the .htaccess ships into out/**

```bash
pnpm build
test -f out/.htaccess && echo ".htaccess in out/"
grep -c "cdn.sanity.io" out/.htaccess
```
Expected: `.htaccess in out/`; grep count ≥ 1.

- [ ] **Step 4: Commit**

```bash
git add public/.htaccess
git commit -m "chore(apache): rewrite /news/<slug> to the static shell + allow Sanity in CSP"
```

---

## Task 12: Studio — host on Sanity, remove the embedded route

**Files:** Delete `app/admin/**`; add a deploy script; document deploy + CORS

- [ ] **Step 1: Remove the embedded Studio route**

```bash
rm -rf app/admin
test -f sanity.config.ts && echo "sanity.config.ts kept for the CLI"
```
Expected: `app/admin` gone; `sanity.config.ts` kept.

- [ ] **Step 2: Add a studio deploy script**

In `package.json` `scripts`, add:
```json
"deploy:studio": "sanity deploy"
```

- [ ] **Step 3: Build check (confirm Studio removal didn't break the static build)**

```bash
pnpm build
test -d out/admin && echo "WARNING: /admin still built" || echo "no /admin in out (good)"
```
Expected: build succeeds; no `out/admin`.

- [ ] **Step 4: Commit**

```bash
git add app/admin package.json pnpm-lock.yaml 2>/dev/null; git add -A
git commit -m "chore(cms): host Studio on Sanity (sanity deploy); drop embedded /admin route"
```

- [ ] **Step 5: Deploy the Studio + set CORS (manual, requires the logged-in Sanity CLI)**

```bash
pnpm deploy:studio      # choose a studio hostname, e.g. forexdrilling
# Then in Sanity manage (manage.sanity.io → project rhvec802 → API → CORS origins),
# add the live site origin so the browser fetch is allowed:
#   https://forex-drilling.com   (no credentials needed for public reads)
```
Expected: Studio reachable at `https://<hostname>.sanity.studio`; the live site origin is an allowed CORS origin. Confirm the `production` dataset is **public** (manage → API → Datasets) so anonymous client reads work.

---

## Task 13: Full verification

- [ ] **Step 1: Clean static build, zero source maps**

```bash
rm -rf out && pnpm build
echo "map files:"; find out -name '*.map' | wc -l        # expect 0
test -f out/news/index.html && echo "news list OK"
test -f out/news/article/index.html && echo "article shell OK"
test -f out/contact.php && echo "contact.php shipped"
test -f out/.htaccess && echo ".htaccess shipped"
```
Expected: 0 map files; all four checks print OK.

- [ ] **Step 2: No `any` and no dead deps in changed files**

```bash
grep -rn ": any" lib/news.ts lib/sanity components/v3/NewsBody.tsx || echo "no any (good)"
grep -rn "react-markdown\|remark-gfm\|rehype-sanitize" package.json || echo "dead deps gone (good)"
```
Expected: both print the "good" message.

- [ ] **Step 3: Manual smoke test (local preview of the export)**

```bash
pnpm exec serve out -l 4000   # or: npx serve out
```
Then in a browser:
- `/news/` → skeleton then cards (live Sanity data), or the empty state.
- Click a card → `/news/<slug>/` → article renders (cover + Portable Text).
- `/contact` → the MapLibre map loads (CSP intact).
- Check the console: **0 CSP violations**; Sanity fetch + images load.

Note: the `/news/<slug>/` rewrite only applies on a real Apache server. Under `serve`, test the shell directly at `/news/article/?slug=<known-slug>` if needed (the shell reads the last path segment; `serve` may need the explicit path).

- [ ] **Step 4: Final commit (if any verification fixups were needed)**

```bash
git add -A
git commit -m "test(cms): verification fixups" || echo "nothing to commit"
```

---

## Self-Review notes (executor: read before starting)

- **Spec coverage:** build config (T2), contact→PHP (T8), client news list (T5), client article shell + rewrite (T6/T11), Sanity wiring kept+typed (T3/T4), Studio on Sanity (T12), CSP origins (T11), `any` + dead-dep cleanup (T4/T6/T9), branch split (T1) — all covered.
- **Ambiguous files left for About:** `PageHero.tsx`, `QuoteBlock.tsx`, `app/about/page.tsx` are NOT in this plan and stay on `feat/about-central-drill`.
- **CORS/dataset-public** are manual Sanity-side steps (T12 Step 5) — the build can't verify them; confirm in the browser smoke test.
- **Type names used consistently:** `NewsArticle` (with `cover?: SanityImageSource`, `body?: PortableTextBlock[]`), `fetchNewsList`/`fetchNewsBySlug`/`fetchAllNewsSlugs`, `urlFor(source: SanityImageSource)`.
