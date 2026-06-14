# About page — visual treatment (Direction A)

**Date:** 2026-06-14
**Scope:** Visual habillage only. No new body content. Existing copy and existing
photos are reused. Single page: `app/about/page.tsx`, plus additive tweaks to two
shared components.

## Problem

The About page is the weakest page of the site. Every other page (homepage, HSE,
quality) has *editorial moments* — asymmetric text+photo compositions, the circle
photo ring, drill-bit pins, a full-width pull-quote, two-line colour headings. The
About page is flat: a hero, three left-aligned paragraphs, three pillar cards, a
link. None of the site's signature motifs appear on it.

## Goal

Raise About to the visual level of the rest of the site using only the existing
design vocabulary and existing copy/photos. No invented body content.

## Palette note

The live site runs a **light editorial palette** (`bg-black` = white, `bg-deep` =
soft grey `#F4F5F7`, `text-fore`/`text-deep-navy` = `#11284E`, `amber` = `#E3AA00`,
navy bandeaux via `bg-surface` `#163767`). The redesign stays in this light palette;
the single navy band (pull-quote) is the one strong dark moment.

## Page rhythm (after)

`Hero (white — UNCHANGED)` → `01 Who We Are (grey)` → `Pull-quote (navy bandeau)`
→ `02 Operating Model (white)` → `Next strip → Services (UNCHANGED)`

## Sections

### ① Who We Are — `bg-deep` (grey), asymmetric

- 12-column grid.
- **Left (md:col-span-7):** `SectionLabel number="01" label="Who We Are"`, then the
  **three existing paragraphs**. The first paragraph becomes a *lead*
  (`clamp(16px,4.5vw,20px)`, `text-fore`); the other two stay muted at the current
  size. Copy is verbatim — only typographic hierarchy changes.
- **Right (md:col-span-5):** `CircleImageRing` with `src="/images/rig-vertical-clean.jpg"`,
  `alt` describing the vertical clean rig, `size≈300`. Two `DrillBitPin`s pinned at
  its top-left, and a discreet anchor behind it (a large faded "01", or a `Crosshair`)
  for the editorial filigrane.
- Wrapped in `Reveal`. Mobile: stacks label → circle (reduced) → paragraphs.

### ② Pull-quote — new block, `bg-surface` (navy bandeau)

- Full-width navy band — the page's single bold dark moment.
- A strong line **reused from existing copy** (§3: "…go beyond minimum requirements…"):
  rendered large, white with the second line in amber.
- Implementation: add an additive `variant?: "light" | "dark"` prop to `QuoteBlock`
  (default `"light"` → HSE unchanged). `"dark"` swaps line-1 to `text-on-navy` and
  body to `text-on-navy-muted`; line-2 stays amber. Alternatively an inline navy
  section in the page — `QuoteBlock` variant preferred for reuse.

### ③ Operating Model — `bg-white`

- Keep `SectionLabel number="02" label="Operating Model"` and the **three PillarCards**
  with identical content.
- Add a decorative `DrillBitPin` accent to each card (additive optional `pin?` /
  decoration on `PillarCard`, which is used only by About — safe). Existing amber
  number, navy hover border, and card shadow are kept.
- Optional: a large faded watermark number behind the grid.

## Components

All exist: `CircleImageRing`, `DrillBitPin`, `Crosshair`, `QuoteBlock`, `PillarCard`,
`SectionLabel`, `Reveal`, `PageHero`, `SectionLink`.

Additive changes (default behaviour unchanged, no other page affected):
- `QuoteBlock`: new optional `variant="dark"`.
- `PillarCard`: optional decorative drill-pin accent (component is About-only).

## Out of scope

- Hero (`AboutHero`) — unchanged.
- Next-page strip — unchanged.
- No stats/counters, no map, no timeline, no new paragraphs, no new photos.

## Acceptance

- `pnpm build` passes (TypeScript strict, zero `any`).
- No hardcoded hex — tokens only.
- HSE and all other pages render identically (additive props only).
- About reads as part of the same family as homepage/HSE: asymmetric photo block,
  one navy pull-quote band, drill-pin accents.
