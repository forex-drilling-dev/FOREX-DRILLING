# DESIGN.md — Forex Drilling

> Editorial industrial poster — every page is a layered composition, not a stack of sections. Navy gravity, ocre accent, threaded-rod motif.

## 1. Visual Theme & Atmosphere

**Style**: Editorial Industrial Poster (1990s technical brochure × Swiss design × drilling-industry hardware)

**Keywords**: layered, anchored, threaded, asymmetric, weight-shifted, deliberate, industrial-warm

**Tone**: Confident, technical, hands-on — NOT corporate-bland, NOT minimalist-empty, NOT luxury-cold, NOT generic-saas

**Feel**: A field engineer's dossier laid open on a desk. Each page is a single composition you take in at once before reading details.

**Interaction Tier**: **L1 (Refined Static)** — elegant hover states + soft entrance fades. No scroll-jacking, no WebGL, no cursor effects. The composition does the work.

**Dependencies**: CSS only (already have framer-motion installed; use it sparingly for entrance reveals).

## 2. Color Palette & Roles

```css
:root {
  /* Page surfaces */
  --color-black:   #FFFFFF;   /* page bg — white */
  --color-deep:    #F8F9FB;   /* alternate section bg */
  --color-surface: #19345E;   /* primary navy — bandeaux, panels */
  --color-deep-navy: #102142; /* dark navy — speech bubbles, footer */

  /* Borders */
  --color-border:  #E5E7EB;   /* hairlines on white */

  /* Accents */
  --color-amber:     #E5AB1B; /* yellow — CTAs, badges, highlights */
  --color-amber-dim: #B8851A; /* hover state */
  --color-ocre-400:  #F4C13C; /* bright glow highlight (sparingly) */

  /* Text */
  --color-fore:    #102142;   /* primary text on white = dark navy */
  --color-muted:   #4B5563;   /* secondary text */
  --color-subtle:  #9CA3AF;   /* tertiary / placeholders */

  /* Inverse for navy bandeaux */
  --color-on-navy:        #FFFFFF;
  --color-on-navy-muted:  #CBD5E1;

  /* RGB helpers for rgba() */
  --color-surface-rgb:  25, 52, 94;
  --color-amber-rgb:    229, 171, 27;
  --color-deep-navy-rgb: 16, 33, 66;
}
```

**Color Rules:**
- Zero hardcoded hex anywhere in components — everything via CSS variables
- One accent per section (yellow OR navy as accent — never both fighting)
- Yellow surface area ≤ 8% of any composition (it's a punch, not a wash)
- Navy panels always carry a soft shadow (`5px 15px 30px rgba(25,52,94,0.15)`) — they sit ON the page, not flush
- Body text on white is always `--color-fore` (dark navy), never plain black
- Body text on navy is `--color-on-navy-muted` (#CBD5E1) — never pure white (too harsh)

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap');

font-family-display: 'Montserrat', system-ui, sans-serif;
font-family-mono:    'IBM Plex Mono', ui-monospace, monospace;
```

Single typographic family (Montserrat) covers display through body via weight + size. Mono used only for technical labels.

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero blob title | Montserrat | 26px | 800 | 1.2 | 0.5px |
| Hero blob subtitle (yellow) | Montserrat | 26px | 800 | 1.2 | 0.5px |
| Hero body (on navy) | Montserrat | 13px | 400 | 1.6 | — |
| Yellow badge (FOREX) | Montserrat | 32px | 900 | 1.0 | 2px |
| Speech bubble label | Montserrat | 14px | 600 | 1.0 | 1px |
| Speech bubble value | Montserrat | 46px | 900 | 1.0 | — |
| Section H2 | Montserrat | 32-40px | 800 | 1.15 | 0.5px |
| Center note title | Montserrat | 16px | 800 | 1.3 | — |
| Body | Montserrat | 15px | 400 | 1.6 | — |
| Index label (EAQUE) | Montserrat | 18px | 800 | 1.0 | 1px |
| Index huge number (17) | Montserrat | 48px | 900 | 1.0 | — |
| Index code (002) | Montserrat | 16px | 800 | 1.0 | — |
| Card overlay title | Montserrat | 14px | 800 | 1.4 | — |
| Card overlay body | Montserrat | 10-11px | 400 | 1.5 | — |
| Nav logo | Montserrat | 16px | 800 | 1.0 | 0.12em |
| Nav links | Montserrat | 12px | 700 | 1.0 | 0.12em |

**Typography Rules:**
- Display headings ALWAYS uppercase, weight ≥ 800
- The two-line title pattern: line 1 navy, line 2 yellow (`text-amber`) — color does the hierarchy, not size
- Body copy NEVER goes below 13px
- Mono only for explicit technical labels (HSE codes, badges) — not body text
- Forbidden: Inter, Roboto, Arial, Helvetica, Space Grotesk, system-ui as primary

## 4. Component Stylings

### Navy Blob — gravity center

```css
width: 580px;
height: 420px;
background: var(--color-surface);
color: var(--color-on-navy);
border-top-left-radius: 0;
border-top-right-radius: 20px;
border-bottom-right-radius: 250px / 350px;  /* the signature swoop */
border-bottom-left-radius: 0;
padding: 90px 40px 40px 60px;
box-shadow: 5px 15px 30px rgba(var(--color-surface-rgb), 0.15);
```

States: static only (it's an anchor, not interactive).

### Yellow Badge

```css
font-size: 32px;
font-weight: 900;
color: white;
background: var(--color-amber);
padding: 12px 35px;
border-radius: 12px 30px 30px 12px;  /* squared left, rounded right */
letter-spacing: 2px;
text-transform: uppercase;
box-shadow: 0 4px 6px rgba(0,0,0,0.10);
```

### Navy Speech Bubble

```css
width: 150px; height: 150px;
border-radius: 50%;
background: var(--color-deep-navy);
color: var(--color-on-navy);
box-shadow: 0 10px 20px rgba(var(--color-deep-navy-rgb), 0.30);

/* Triangular tail — bottom-left */
&::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 20px;
  border: solid;
  border-width: 35px 25px 0 0;
  border-color: var(--color-deep-navy) transparent transparent transparent;
}
```

### Drill Bit Pin (THE signature motif — vis filetée)

Yellow shield-shape SVG with a threaded drill rod inside, drawn in dark navy stroke. Drop-shadow makes it appear pinned/floating. Default size 35×85, scaled per usage.

### CTA Button (primary — ocre)

```css
default:  bg: var(--color-amber);  color: white; border: none; padding: 14px 28px; font-weight: 700; uppercase;
hover:    bg: var(--color-amber-dim); transform: translateY(-1px);
focus:    outline: 2px solid var(--color-amber); outline-offset: 3px;
disabled: opacity: 0.5; cursor: not-allowed;
```

### CTA Button (ghost — on navy)

```css
default:  bg: transparent; color: white; border: 1px solid rgba(255,255,255,0.30); padding: 14px 28px;
hover:    bg: rgba(255,255,255,0.10); border-color: white;
focus:    outline: 2px solid var(--color-amber);
```

### Nav Link

```css
default:  color: var(--color-deep-navy); font-weight: 700; uppercase; letter-spacing: 0.12em;
hover:    color: var(--color-amber);
active (current page): color: var(--color-amber);
focus:    outline: 2px solid var(--color-amber); outline-offset: 4px;
```

### Footer Link

```css
default:  color: var(--color-on-navy-muted); font-weight: 500;
hover:    color: var(--color-amber);
focus:    outline: 2px solid var(--color-amber);
```

## 5. Layout Principles

- **Composition canvas**: hero is a fixed-aspect 1200×850 stage (lg+). Below lg → vertical stack.
- **Container**: `max-width: 1280px; padding-inline: clamp(20px, 4vw, 56px)`
- **Grid**: do NOT use a 12-col grid for hero compositions — use absolute positioning at exact pixels for desktop; flex-column below lg.
- **Overlap is the rule**: badge over blob, bubble over blob's right edge, drill pins over card top edge, yellow wave under card.
- **Asymmetric weight**: hero composition ~60% left-heavy (blob + circle + index) / ~40% right-light (bubble + note + card with wave below).
- **Off-canvas bleed**: yellow wave bottom-right and grey watermark right edge MUST extend past the visible frame (`right: -50px`, etc.).
- **Tight vs loose**: dense INSIDE the navy blob (intentionally cramped), generous OUTSIDE (negative space).

## 6. Depth & Elevation

```css
--shadow-card:   0 10px 25px rgba(16, 33, 66, 0.08);
--shadow-deep:   0 15px 30px rgba(16, 33, 66, 0.15);
--shadow-navy:   5px 15px 30px rgba(25, 52, 94, 0.15);  /* on navy blob */
--shadow-bubble: 0 10px 20px rgba(16, 33, 66, 0.30);
--shadow-image:  0 15px 30px rgba(0, 0, 0, 0.15);
--shadow-pin:    drop-shadow(0 8px 12px rgba(0,0,0,0.15));  /* on drill pins */
```

**Elevation rules:**
- Page bg (white): no shadow
- Pale grey watermark: no shadow (it's flat texture)
- Yellow wave: no shadow (it bleeds, it's flat)
- Navy blob: `--shadow-navy`
- Speech bubble: `--shadow-bubble`
- Image cards: `--shadow-image`
- Drill pins: `--shadow-pin` (drop-shadow on SVG)
- Footer: no shadow (it's the page floor)

## 7. Animation & Interaction

**Tier: L1 (Refined Static)**

Page-load reveal:
- Hero composition fades in over 600ms with a subtle `translateY(8px) → 0`
- Stagger children by 80ms (badge → blob → bubble → circle → index → card → wave)

Hover:
- Buttons: bg color shift + 1px lift (`translateY(-1px)`) over 200ms
- Nav links: color shift to amber over 200ms
- Image cards: `transform: scale(1.02)` on the inner image only over 600ms ease-out
- Drill pins: lift (`translateY(-4px)`) over 200ms

Focus:
- All interactive: 2px solid amber outline, offset 3px

Reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

NOT used: scroll-jacking, parallax, cursor effects, WebGL, GSAP, Lenis. The composition itself carries the impact.

## 8. Do's and Don'ts

**Do:**
1. Lock all colors to CSS variables — zero hardcoded hex anywhere
2. Treat the hero as a poster: fixed canvas dimensions, absolute positioning, pixel-perfect at desktop
3. Make elements OVERLAP (badge on blob, bubble on blob's edge, pins on card top)
4. Bleed decorative shapes off the frame (yellow wave, grey watermark) — they MUST extend past the visible area
5. Apply the drill-bit pin (threaded rod) as the signature motif — bullets, section anchors, card pins
6. Use `text-amber` for the second line of two-line titles — color does the hierarchy
7. Keep body text inside the navy blob small (13px) — it's a poster caption, not body copy
8. Use `text-balance` on display headings to control line breaks naturally

**Don't:**
1. ❌ Use 12-column CSS Grid for the hero — use absolute positioning
2. ❌ Place elements without overlap — disconnected widgets read as AI slop
3. ❌ Hardcode hex values in components — break the design system
4. ❌ Use Inter / Roboto / Arial / Space Grotesk / system-ui as primary font
5. ❌ Apply `filter: blur()` to moving elements (perf killer per skill rules)
6. ❌ Use scroll-jacking, parallax, or scroll-triggered pin (we are L1)
7. ❌ Let yellow occupy more than ~8% of any composition — it's a punch, not a wash
8. ❌ Mix navy and amber as competing accents in the same section
9. ❌ Default to glassmorphism, purple gradients, or dark-mode-only aesthetics
10. ❌ Use Emoji as decorative iconography (this is industrial, not playful)
11. ❌ Make navy text on navy bg or low-contrast pairings — WCAG AA minimum

## 9. Responsive Behavior

**Breakpoints:**
- `< 768px` (mobile): vertical stack, decorations hidden, blob padding reduced (60px 24px)
- `768-1023px` (tablet): vertical stack with larger image cards, decorations partially shown
- `≥ 1024px` (lg+, desktop): full poster layout with absolute positioning

**Hero responsive plan:**

| Element | Desktop (≥ lg) | Tablet | Mobile |
|---------|----------------|--------|--------|
| Yellow badge | abs top:80 left:50 | abs scaled | static, before blob |
| Navy blob | abs top:100 left:0, 580×420 | full width, h:auto | full width, h:auto, smaller padding |
| Speech bubble | abs top:170 left:480 (overlaps blob) | abs centered above note | static after blob |
| Center note | abs top:300 left:640 | static below bubble | static after bubble |
| Circle image | abs bottom:120 left:100 | static centered | static centered, size:240 |
| Index 17/002 | abs bottom:50 left:70 | static below circle | static below circle |
| Drill pins | abs top:-65 left:230 (on card) | abs scaled | abs above card scaled |
| Rect card | abs bottom:120 right:100 | static below note | static, full width |
| Yellow wave | abs bottom:-50 right:-50 | hidden | hidden |
| Grey watermark | abs top:50 right:-50 | hidden | hidden |

**Touch targets**: ≥ 44×44px on mobile (buttons, nav links).

**Mobile nav**: hamburger drawer, full-width slide-down, `bg-white` solid (no transparency on mobile because there's less content behind it).

**No horizontal overflow ≤ 600px viewport.**
