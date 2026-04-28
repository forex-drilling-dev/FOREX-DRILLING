@AGENTS.md

# FOREX DRILLING — PROJECT RULES FOR CLAUDE CODE

## Stack (as built — do not upgrade without explicit instruction)

- Next.js 16.2.4, App Router, TypeScript strict
- Tailwind CSS v4 — CSS-first config via `@theme` in `app/globals.css` (NO `tailwind.config.ts`)
- Framer Motion 12 — client components only
- React 19
- pnpm 10

## Design System V2

**Never hardcode hex values.** Use Tailwind tokens only.

| Token | Value | Use |
|---|---|---|
| `bg-black` | `#070D1A` navy-950 | Deepest bg, hero sections |
| `bg-deep` | `#0C1628` navy-900 | Alternate section bg |
| `bg-surface` | `#12203F` navy-800 | Cards, Nav |
| `border-border` | `#243C6B` navy-600 | All hairlines |
| `text-amber` / `bg-amber` | `#C8902A` ocre-500 | Primary accent, CTAs |
| `text-ocre-400` | `#E8B84B` | Headline highlights |
| `text-fore` | `#EDE9E0` | Primary text |
| `text-muted` | `#9A9485` | Body / descriptions |
| `text-subtle` | `#5C5749` | Tertiary / placeholders |

**Font stack:**
- `font-display` = Barlow Condensed 700/800 → all H1–H2, stats, uppercase labels
- `font-mono` = IBM Plex Mono → tags, badges, nav items, data
- `font-sans` = Inter 300/400/500 → body text

**Blob system (CSS-only, never Framer for continuous loops):**
- `.blob-morph` → blobMorph keyframe (14s border-radius morph)
- `.blob-float` → floatY keyframe (6s vertical float)
- `<Blob variant="navy"|"ocre"|"circle" size="320px" />` component

## Code Standards

- TypeScript strict — zero `any`, zero implicit `any`
- All component props as TypeScript interfaces (not `type` aliases)
- Named exports for all components; default export for page.tsx / layout.tsx only
- Framer Motion ONLY inside `"use client"` components
- `next/image` for all images — `fill`+`sizes` for full-bleed, `width`+`height` for fixed

## Next.js 16 App Router specifics

- Route params are async: `params: Promise<{ slug: string }>` → `const { slug } = await params`
- `ssr: false` in `dynamic()` MUST live inside a `"use client"` file, not in Server Components
  → Use `components/three/WebGLHeroClient.tsx` pattern
- Pages must NOT add `<main>` — `app/layout.tsx` already provides it
- `theme(spacing.nav)` is Tailwind v3 syntax → use `var(--spacing-nav)` in Tailwind v4

## Renamed tokens (V1→V2 — never revert)

| Old | New | Why |
|---|---|---|
| `text-white` | `text-fore` | Avoid Tailwind built-in override |
| `text-gray-light` | `text-muted` | Avoid Tailwind built-in override |
| `static="..."` on StatCard | `staticValue="..."` | `static` is a JS reserved word |

## Images

All client photos live in `/public/images/`:
- `hero-night-site.jpg` — Homepage hero (night multi-rig operation)
- `sunset-rig.jpg` — About page hero (purple/red sunset)
- `rig-horizontal.jpg` — Fleet teaser (horizontal product shot)
- `rig-vertical-operator.jpg` — About teaser circular crop
- `rig-vertical-clean.jpg` — Services / Fleet vertical rig
- `drill-head-closeup.jpg` — Quality / Precision section
- `rig-aerial.jpg` — Aerial/drone view (extra)

## Font Swap Protocol (when client font files arrive)

1. Drop `.woff2` files into `/public/fonts/`
2. In `lib/fonts.ts` replace `Barlow_Condensed` with `localFont`:
   ```ts
   import localFont from "next/font/local"
   export const fontDisplay = localFont({
     src: [{ path: "../public/fonts/forex-display-bold.woff2", weight: "700" }],
     variable: "--font-display-family",
   })
   ```
3. Run `pnpm build` — CSS variable propagates automatically. No other changes needed.

## Accessibility

- Skip-to-content link is first element in layout
- All interactive elements have visible `outline: 2px solid var(--color-amber)` focus ring
- `prefers-reduced-motion`: all transforms disabled, opacity-only fallback
- `lang="en"` on `<html>`
- Minimum WCAG AA contrast throughout

## Performance

- Blob animations: CSS only (not Framer) for continuous loops
- Images: `priority` only on above-the-fold hero
- Sanity queries: `revalidate = 60` on projects page
- No unused dependencies

## Forbidden

- ❌ Hardcoded hex colors
- ❌ `any` type
- ❌ `ssr: false` in Server Components
- ❌ `theme(spacing.nav)` (Tailwind v3) — use `var(--spacing-nav)`
- ❌ `<main>` in page files
- ❌ Purple gradients, glassmorphism, generic AI aesthetics
