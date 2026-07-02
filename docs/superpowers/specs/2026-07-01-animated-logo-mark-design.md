# Animated Logo Mark — Design

**Date:** 2026-07-01
**Status:** Approved (approach A)

## Goal

Play the client-supplied Forex Drilling logo build animation (emblem pops in,
gets cut into four triangles, three turn gold, camera pulls back, FOREX /
DRILLING wordmarks wipe in — ~3 s) in place of the static nav logo. When the
animation finishes, the real static logo (`/logo-mark.svg`) replaces it.

## Decisions

- **Frequency:** once per browser session (`sessionStorage` key
  `fxl-logo-played`). Subsequent page loads show the static logo immediately.
- **Placement:** Nav only. Footer keeps its static white logo.
- **Reduced motion:** `prefers-reduced-motion: reduce` skips the animation
  entirely — static logo from the start.

## Approach (A — React port of the supplied vanilla JS)

New client component `components/motion/AnimatedLogoMark.tsx`:

- Inline SVG (JSX) reproducing the supplied animation markup, driven by the
  same `requestAnimationFrame` timeline and easing functions, using React refs
  instead of `getElementById`. Attributes are mutated imperatively — no
  per-frame React re-renders.
- **Pixel-perfect swap.** The supplied animation and `logo-mark.svg` share
  identical wordmark paths and emblem polygon coordinates, but differ in
  colors and viewBox. The component uses the official asset's values so the
  final animation frame is identical to the static logo:
  - colors `#11284e` (navy) / `#e3aa00` (gold) instead of `#1C2B4D`/`#D4A017`
  - viewBox `35 35 880 200` instead of `44 44 884 182`; camera start center
    recomputed to (475, 135)
  - end state of the camera transform is identity, so the viewBox change does
    not affect the timeline
  These hexes are brand-asset colors (same as inside the committed `.svg`
  files), not UI tokens — the "no hardcoded hex" rule targets Tailwind
  styling, not vector assets.
- **State machine:** `playing: boolean`, initially `false` (SSR-safe — the
  server renders the static `<img>`; no hydration mismatch). On mount, if the
  session flag is absent and reduced motion is off, `playing` flips to `true`
  and the SVG (pre-set to its blank t=0 attribute state in JSX, so there is no
  flash of the finished logo) animates for 3 s. On completion the flag is set
  and `playing` returns to `false` → the static `<img>` replaces the SVG.
- `cancelAnimationFrame` cleanup on unmount.
- Props: `interface AnimatedLogoMarkProps { className?: string }` — the class
  is applied to both the SVG and the fallback `<img>` so dimensions match and
  there is no layout shift.

`components/layout/Nav.tsx`: the `<img src="/logo-mark.svg">` block inside the
home link is replaced by
`<AnimatedLogoMark className="h-8 w-auto select-none sm:h-9 md:h-11" />`.
Link, aria-label and touch-target styling unchanged.

## Rejected alternatives

- **B — inject supplied HTML via `dangerouslySetInnerHTML` + script:** fragile
  global IDs, script outside React lifecycle, violates project TS standards.
- **C — rewrite as CSS/Framer animation:** high effort, would diverge from the
  validated animation (custom easings + SVG camera are impractical in CSS).

## Verification

- `pnpm lint` and `pnpm build` pass.
- Browser check: animation plays on first visit, static logo appears directly
  after client-side navigation / reload within the session, reduced-motion
  shows the static logo only.
