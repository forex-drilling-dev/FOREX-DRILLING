# Forex Drilling — Phase 0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship an agency-quality Next.js 14 scaffold with complete design system, motion primitives, all 10 routes assembled with full brief copy, WebGL hero, and Vercel preview — everything behind swappable design tokens so Phase 1 (brand integration after J+5) is a pure token swap.

**Architecture:** App Router + TypeScript strict + Tailwind (design-token-driven) + Framer Motion + React Three Fiber. Fonts self-hosted via `next/font`. All brand values live in `tailwind.config.ts` and `globals.css` as CSS variables — zero hard-coded colors/typography outside those files. Every component is tokenized so re-skinning is mechanical.

**Tech Stack:** Next.js 14.2+, TypeScript 5.4+ (strict), pnpm 9+, Tailwind CSS 3.4+, Framer Motion 11+, React Three Fiber 8+, three.js, React Hook Form 7+, Resend (stub), Sanity client (stub), Vercel.

**Quality bar:** agency-grade (€100k). No TODO comments. No `any`. Every interactive element has focus ring + aria. Lighthouse target: 95+ perf, 100 a11y, 100 best practices, 100 SEO on homepage. Motion respects `prefers-reduced-motion`. Zero CLS.

**Working directory:** `/Users/sohan/Forex Drilling/`

---

## File Structure

```
/Users/sohan/Forex Drilling/
├── app/
│   ├── layout.tsx                        # Root layout: fonts, <html>, cursor, skip link
│   ├── globals.css                       # CSS vars, base reset, font-face fallbacks
│   ├── page.tsx                          # Homepage
│   ├── about/page.tsx
│   ├── services/page.tsx                 # Services overview (grid)
│   ├── services/[slug]/page.tsx          # Service detail (dynamic)
│   ├── fleet/page.tsx
│   ├── hse/page.tsx
│   ├── quality/page.tsx
│   ├── projects/page.tsx                 # CMS-ready (stub data)
│   ├── contact/page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── not-found.tsx
│   └── api/
│       └── contact/route.ts              # Form handler (stubs Resend)
├── components/
│   ├── ui/
│   │   ├── Button.tsx                    # primary / ghost / amber variants
│   │   ├── Tag.tsx                       # mono label pill
│   │   ├── Divider.tsx                   # hairline + section rule
│   │   ├── Container.tsx                 # max-width wrapper
│   │   └── Link.tsx                      # arrow-animated link
│   ├── motion/
│   │   ├── FadeIn.tsx                    # whileInView fade-up
│   │   ├── Stagger.tsx                   # children stagger wrapper
│   │   ├── CountUp.tsx                   # animated number
│   │   └── Marquee.tsx                   # infinite scrolling band
│   ├── sections/
│   │   ├── SectionHeader.tsx             # "01 — About" + title
│   │   ├── StatCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── PillarCard.tsx
│   │   ├── ProtocolBadge.tsx
│   │   ├── StepItem.tsx
│   │   ├── MarqueeBanner.tsx
│   │   ├── CtaBanner.tsx
│   │   ├── HeroStats.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── AboutTeaser.tsx
│   │   ├── HseStatement.tsx
│   │   └── ProjectApproach.tsx
│   ├── three/
│   │   └── WebGLHero.tsx                 # R3F terrain mesh, lazy + ssr:false
│   ├── forms/
│   │   └── ContactForm.tsx               # RHF + zod
│   └── layout/
│       ├── Nav.tsx
│       ├── Footer.tsx
│       ├── CustomCursor.tsx
│       └── SkipLink.tsx
├── content/
│   ├── services.ts                       # 12 services data (slug, title, body, applications)
│   ├── projects.ts                       # 2 placeholder projects
│   └── site.ts                           # nav, footer, global metadata
├── lib/
│   ├── fonts.ts                          # next/font config
│   ├── motion.ts                         # shared variants + easing curves
│   ├── sanity.ts                         # client stub (env-guarded)
│   ├── resend.ts                         # client stub (env-guarded)
│   ├── seo.ts                            # metadata helpers + JSON-LD
│   └── utils.ts                          # cn(), formatters
├── sanity/
│   └── schemas/project.ts                # schema (not wired to live studio yet)
├── public/
│   ├── favicon.svg                       # placeholder mark
│   └── og-default.jpg                    # placeholder OG image
├── styles/
│   └── (empty, all styling via Tailwind + globals.css)
├── .env.example
├── .env.local                            # gitignored
├── .gitignore
├── .nvmrc                                # node 20
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── README.md
└── CLAUDE.md
```

**Responsibility boundaries:**
- `content/*` — all brief copy lives here as typed constants. Pages import and render. Future CMS swap = replace imports with Sanity queries.
- `components/ui/*` — pure, stateless, token-driven primitives. No layout.
- `components/motion/*` — Framer Motion wrappers. All client components.
- `components/sections/*` — composed section blocks. Each is self-contained and receives data via props.
- `components/three/*` — WebGL only. Lazy-loaded in pages via `dynamic()`.
- `lib/*` — framework-agnostic helpers. Pure functions where possible.

---

## Design Tokens (authoritative source)

These values lock in Phase 0. Phase 1 = swap only these.

```css
/* globals.css :root */
--color-black: #08080A;
--color-deep: #0F0F0D;
--color-surface: #161614;
--color-border: #252522;
--color-amber: #E8A020;
--color-amber-dim: #8B6012;
--color-white: #EDE9E3;
--color-gray: #6E6E66;
--color-gray-light: #AEABA4;  /* typo corrected from brief */

/* motion */
--ease-precise: cubic-bezier(0.22, 1, 0.36, 1);
--ease-subtle: cubic-bezier(0.4, 0, 0.2, 1);
--dur-fast: 200ms;
--dur-base: 400ms;
--dur-slow: 800ms;

/* layout */
--nav-height: 72px;
--container-max: 1440px;
--gutter: clamp(20px, 4vw, 48px);
```

Type scale (Tailwind extended):
- `display-xl` 120px / 0.9 / -0.02em (Bebas)
- `display-lg` 80px / 0.95 / -0.015em
- `display-md` 56px / 1.0 / -0.01em
- `display-sm` 40px / 1.05
- `mono-xs` 12px / 1.4 / 0.08em uppercase (Plex Mono)
- `mono-sm` 13px / 1.5 / 0.06em
- `body` 16px / 1.6 (Plex Sans 300)
- `body-lg` 18px / 1.65
- `quote` 32px / 1.3 (Playfair)

---

## Task List

### Task 1: Initialize repo + Next.js scaffold

**Files:**
- Create: `package.json`, `pnpm-lock.yaml`, `next.config.mjs`, `tsconfig.json`, `.gitignore`, `.nvmrc`, `README.md`

- [ ] **Step 1: Initialize git + pnpm + Next.js**

```bash
cd "/Users/sohan/Forex Drilling"
git init
echo "20" > .nvmrc
pnpm create next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias="@/*" --use-pnpm --eslint --no-turbopack
```

When prompted to overwrite, accept. If interactive prompts block, use:
```bash
pnpm dlx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --use-pnpm --eslint
```

- [ ] **Step 2: Set tsconfig to strict**

Edit `tsconfig.json` to ensure:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- [ ] **Step 3: Verify dev server boots**

```bash
pnpm dev
```
Expected: Next.js starts on localhost:3000, no errors. Kill with Ctrl+C.

- [ ] **Step 4: Commit scaffold**

```bash
git add -A
git commit -m "chore: initialize Next.js 14 app with TypeScript strict"
```

---

### Task 2: Install all dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add runtime deps**

```bash
pnpm add framer-motion@^11 three @react-three/fiber @react-three/drei react-hook-form @hookform/resolvers zod clsx tailwind-merge lucide-react
```

- [ ] **Step 2: Add optional (stubbed) deps**

```bash
pnpm add resend next-sanity @sanity/image-url
```

- [ ] **Step 3: Add dev deps**

```bash
pnpm add -D @types/three prettier prettier-plugin-tailwindcss @tailwindcss/typography
```

- [ ] **Step 4: Verify install**

```bash
pnpm install
pnpm dev
```
Expected: no errors. Kill server.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add framer-motion, r3f, rhf, zod, resend/sanity stubs"
```

---

### Task 3: Configure Tailwind with design tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "var(--gutter)",
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        black: "var(--color-black)",
        deep: "var(--color-deep)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        amber: {
          DEFAULT: "var(--color-amber)",
          dim: "var(--color-amber-dim)",
        },
        white: "var(--color-white)",
        gray: {
          DEFAULT: "var(--color-gray)",
          light: "var(--color-gray-light)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(72px, 10vw, 160px)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(56px, 7vw, 112px)", { lineHeight: "0.95", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(40px, 5vw, 72px)", { lineHeight: "1.0", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(32px, 4vw, 56px)", { lineHeight: "1.05" }],
        "mono-xs": ["12px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "mono-sm": ["13px", { lineHeight: "1.5", letterSpacing: "0.06em" }],
        body: ["16px", { lineHeight: "1.6" }],
        "body-lg": ["18px", { lineHeight: "1.65" }],
        quote: ["clamp(24px, 3vw, 40px)", { lineHeight: "1.3" }],
      },
      transitionTimingFunction: {
        precise: "cubic-bezier(0.22, 1, 0.36, 1)",
        subtle: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "200ms",
        base: "400ms",
        slow: "800ms",
      },
      maxWidth: {
        container: "1440px",
      },
      spacing: {
        nav: "72px",
        gutter: "var(--gutter)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [typography],
};
export default config;
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-black: #08080A;
  --color-deep: #0F0F0D;
  --color-surface: #161614;
  --color-border: #252522;
  --color-amber: #E8A020;
  --color-amber-dim: #8B6012;
  --color-white: #EDE9E3;
  --color-gray: #6E6E66;
  --color-gray-light: #AEABA4;
  --ease-precise: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-subtle: cubic-bezier(0.4, 0, 0.2, 1);
  --dur-fast: 200ms;
  --dur-base: 400ms;
  --dur-slow: 800ms;
  --nav-height: 72px;
  --gutter: clamp(20px, 4vw, 48px);
  color-scheme: dark;
}

@layer base {
  * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  html { background: var(--color-black); color: var(--color-white); }
  body { font-family: var(--font-sans); font-weight: 300; }
  ::selection { background: var(--color-amber); color: var(--color-black); }

  *:focus-visible {
    outline: 2px solid var(--color-amber);
    outline-offset: 3px;
    border-radius: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  .hairline { border-color: var(--color-border); }
}
```

- [ ] **Step 3: Verify Tailwind compiles**

```bash
pnpm dev
```
Visit localhost:3000 — page should load dark with amber focus rings. Kill.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat(design): establish design tokens and Tailwind theme"
```

---

### Task 4: Configure fonts via next/font

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `lib/fonts.ts`**

```ts
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans, Playfair_Display } from "next/font/google";

export const fontDisplay = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const fontAccent = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});
```

- [ ] **Step 2: Wire fonts in `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { fontDisplay, fontMono, fontSans, fontAccent } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Forex Drilling", template: "%s — Forex Drilling" },
  description: "Specialized drilling services across the Asia-Pacific region.",
  metadataBase: new URL("https://forexdrilling.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontMono.variable} ${fontSans.variable} ${fontAccent.variable}`}
    >
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Test fonts load**

```bash
pnpm dev
```
Open devtools → Network → Fonts. Should see 4 woff2 downloads. Kill.

- [ ] **Step 4: Commit**

```bash
git add lib/fonts.ts app/layout.tsx
git commit -m "feat(fonts): load Bebas Neue, IBM Plex Mono/Sans, Playfair via next/font"
```

---

### Task 5: Utility + motion helpers

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/motion.ts`

- [ ] **Step 1: Create `lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function padNumber(n: number, width = 2): string {
  return n.toString().padStart(width, "0");
}
```

- [ ] **Step 2: Create `lib/motion.ts`**

```ts
import type { Variants, Transition } from "framer-motion";

export const easePrecise = [0.22, 1, 0.36, 1] as const;
export const easeSubtle = [0.4, 0, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger = (delay = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const baseTransition: Transition = {
  duration: 0.8,
  ease: easePrecise,
};
```

- [ ] **Step 3: Commit**

```bash
git add lib/utils.ts lib/motion.ts
git commit -m "feat(lib): add cn() helper and shared motion variants"
```

---

### Task 6: Content files (all brief copy)

**Files:**
- Create: `content/services.ts`
- Create: `content/projects.ts`
- Create: `content/site.ts`

- [ ] **Step 1: Create `content/site.ts`**

```ts
export const site = {
  name: "Forex Drilling",
  tagline: "Specialized drilling services · Asia-Pacific",
  hq: "Singapore",
  operations: ["Papua New Guinea", "Asia-Pacific"],
  nav: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Fleet", href: "/fleet" },
    { label: "HSE", href: "/hse" },
    { label: "Quality", href: "/quality" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    address: "Singapore — Operations in Papua New Guinea",
    email: "contact@forexdrilling.com",
  },
} as const;
```

- [ ] **Step 2: Create `content/services.ts`**

Full file with all 12 services — each entry: `{ slug, title, category, summary, applications: string[], related: string[] }`. Categories: `drilling | instrumentation | downhole | data`.

```ts
export type ServiceCategory = "drilling" | "instrumentation" | "downhole" | "data";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  body: string;
  applications: string[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "diamond-drilling",
    title: "Diamond Drilling",
    category: "drilling",
    summary: "High-recovery core drilling for precise geological and geotechnical data.",
    body: "Diamond drilling produces continuous, high-quality core samples suitable for detailed geological logging, geotechnical testing, and resource definition. We deploy diamond rigs sized for both greenfield exploration and active mine environments.",
    applications: ["Resource definition", "Geotechnical core logging", "Slope stability studies", "Deep exploration"],
    related: ["sonic-drilling", "directional-drilling", "downhole-surveying"],
  },
  {
    slug: "sonic-drilling",
    title: "Sonic Drilling",
    category: "drilling",
    summary: "Continuous, high-quality sampling in unconsolidated ground.",
    body: "Sonic drilling combines high-frequency vibration with rotation to advance casing and retrieve continuous core in overburden, tailings, and difficult ground. Our dual-head sonic/diamond rigs transition seamlessly between methods on a single hole.",
    applications: ["Tailings characterisation", "Overburden profiling", "Environmental sampling", "Geotechnical investigation"],
    related: ["diamond-drilling", "spt-push-tube", "instrumentation-installation"],
  },
  {
    slug: "directional-drilling",
    title: "Directional Drilling & Coring",
    category: "drilling",
    summary: "Controlled trajectory drilling to intersect specific targets.",
    body: "Directional drilling and coring services enable precise targeting of geological structures and ore bodies. We apply steering and deviation control to reach subsurface targets where vertical access is impractical.",
    applications: ["Targeted ore body intersection", "Multi-branch drilling", "Structure-specific sampling"],
    related: ["diamond-drilling", "downhole-surveying", "horizontal-drilling"],
  },
  {
    slug: "horizontal-drilling",
    title: "Horizontal Drilling",
    category: "drilling",
    summary: "Depressurisation and horizontal access drilling in active pits.",
    body: "Horizontal drilling, including depressurisation drilling, supports pit dewatering programs, slope stability management, and lateral access to geological features. Essential for groundwater control in active mining operations.",
    applications: ["Pit depressurisation", "Slope stability dewatering", "Lateral target access"],
    related: ["directional-drilling", "pumping-packer-testing", "instrumentation-installation"],
  },
  {
    slug: "air-mud-rotary",
    title: "Air & Mud Rotary Drilling",
    category: "drilling",
    summary: "High-penetration rate rotary drilling for varied ground conditions.",
    body: "Air and mud rotary drilling deliver fast penetration in overburden and weathered rock. We select drilling fluids and parameters to balance speed, hole condition, and sample quality for each target.",
    applications: ["Water well drilling", "Rapid hole advancement", "Monitoring well installation"],
    related: ["reverse-circulation", "spt-push-tube", "instrumentation-installation"],
  },
  {
    slug: "reverse-circulation",
    title: "Reverse Circulation (RC)",
    category: "drilling",
    summary: "High-volume chip sampling for grade control and exploration.",
    body: "RC drilling provides rapid, cost-effective chip samples for grade control, blast hole sampling, and exploration programs. We maintain strict sample integrity protocols to support reliable assay results.",
    applications: ["Grade control", "Greenfield exploration", "Blast hole sampling"],
    related: ["air-mud-rotary", "diamond-drilling", "data-acquisition"],
  },
  {
    slug: "spt-push-tube",
    title: "SPT & Push Tube Sampling",
    category: "drilling",
    summary: "In-situ testing and undisturbed sampling for geotechnical programs.",
    body: "Standard Penetration Testing (SPT) and push tube sampling deliver in-situ strength data and undisturbed samples for laboratory analysis. Critical inputs for foundation design and geotechnical characterisation.",
    applications: ["Foundation design", "Geotechnical characterisation", "Undisturbed soil sampling"],
    related: ["sonic-drilling", "air-mud-rotary", "instrumentation-installation"],
  },
  {
    slug: "pumping-packer-testing",
    title: "Pumping & Packer Testing",
    category: "drilling",
    summary: "Hydraulic testing for hydrogeological characterisation.",
    body: "Pumping and packer tests quantify aquifer properties and rock mass permeability. Essential inputs for groundwater modelling, mine dewatering design, and slope depressurisation programs.",
    applications: ["Aquifer characterisation", "Rock mass permeability", "Mine dewatering design"],
    related: ["horizontal-drilling", "instrumentation-installation", "downhole-surveying"],
  },
  {
    slug: "downhole-surveying",
    title: "Downhole Surveying",
    category: "downhole",
    summary: "Gyro, core orientation, and deviation control services.",
    body: "Accurate downhole surveying ensures drillhole position is known with confidence. We deploy gyro surveying, core orientation tools, and deviation control to validate hole trajectories and support geological modelling.",
    applications: ["Gyro trajectory surveys", "Oriented core marking", "Deviation management"],
    related: ["directional-drilling", "diamond-drilling", "geophysical-logging"],
  },
  {
    slug: "instrumentation-installation",
    title: "Instrumentation Installation",
    category: "instrumentation",
    summary: "VWPs, inclinometers, and standpipe piezometers — installed and commissioned.",
    body: "We install Vibrating Wire Piezometers, inclinometers, standpipe piezometers, and associated monitoring systems. Each installation is documented and commissioned to ensure data integrity from day one.",
    applications: ["Slope stability monitoring", "Groundwater monitoring", "Ground deformation tracking"],
    related: ["horizontal-drilling", "pumping-packer-testing", "geophysical-logging"],
  },
  {
    slug: "geophysical-logging",
    title: "Geophysical Logging",
    category: "downhole",
    summary: "Downhole geophysics for formation evaluation and verification.",
    body: "Geophysical logging services characterise formation properties downhole and verify borehole integrity. Supports geological interpretation alongside core and chip sample data.",
    applications: ["Formation evaluation", "Borehole integrity verification", "Lithological correlation"],
    related: ["downhole-surveying", "diamond-drilling", "data-acquisition"],
  },
  {
    slug: "data-acquisition",
    title: "Data Acquisition & Digital Drilling Systems",
    category: "data",
    summary: "Krux, MWD, and structured digital workflows.",
    body: "We integrate digital platforms like Krux for data collection and reporting, and Measurement While Drilling (MWD) systems for real-time downhole parameters. Data is captured accurately, traceably, and ready for client technical teams.",
    applications: ["Real-time drilling monitoring", "Structured geological reporting", "MWD interpretation support"],
    related: ["geophysical-logging", "downhole-surveying", "diamond-drilling"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
```

- [ ] **Step 3: Create `content/projects.ts`**

```ts
export type Project = {
  slug: string;
  title: string;
  location: string;
  scope: "mining" | "exploration" | "civil";
  methods: string[];
  outcomes: string;
  cover: string;
};

export const projects: Project[] = [
  {
    slug: "png-copper-slope-monitoring",
    title: "Copper Mine Slope Monitoring",
    location: "Papua New Guinea",
    scope: "mining",
    methods: ["Diamond Drilling", "VWP Installation", "Inclinometers"],
    outcomes: "Delivered 14 geotechnical holes with full instrumentation installation supporting active pit slope monitoring program. Zero lost-time incidents.",
    cover: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200",
  },
  {
    slug: "greenfield-exploration-asia-pacific",
    title: "Greenfield Exploration Campaign",
    location: "Asia-Pacific",
    scope: "exploration",
    methods: ["RC Drilling", "Diamond Drilling", "Geophysical Logging"],
    outcomes: "Completed multi-hole exploration campaign across remote terrain with integrated Krux data capture and full geophysical logging suite.",
    cover: "https://images.unsplash.com/photo-1605028925374-2ae8dfa8f5e4?w=1200",
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add content/
git commit -m "feat(content): add brief copy, 12 services, 2 placeholder projects"
```

---

### Task 7: UI primitives

**Files:**
- Create: `components/ui/Container.tsx`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Tag.tsx`
- Create: `components/ui/Divider.tsx`
- Create: `components/ui/Link.tsx`

- [ ] **Step 1: `Container.tsx`**

```tsx
import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: Props) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-gutter", className)}>
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: `Button.tsx`**

```tsx
"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "amber";
type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

const base = "inline-flex items-center gap-3 px-6 py-3 font-mono text-mono-sm uppercase tracking-wider transition-colors duration-fast ease-precise focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-amber hover:text-black",
  ghost: "border border-border text-white hover:border-amber hover:text-amber",
  amber: "bg-amber text-black hover:bg-white",
};

export function Button({ href, variant = "primary", className, children, onClick, type = "button", ...rest }: Props) {
  const cls = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" aria-hidden />
    </>
  );
  if (href) return <Link href={href} className={cls} {...rest}>{content}</Link>;
  return <button type={type} onClick={onClick} className={cls} {...rest}>{content}</button>;
}
```

- [ ] **Step 3: `Tag.tsx`**

```tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = { className?: string; children: ReactNode };

export function Tag({ className, children }: Props) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-gray-light", className)}>
      <span className="h-1 w-1 rounded-full bg-amber" aria-hidden />
      {children}
    </span>
  );
}
```

- [ ] **Step 4: `Divider.tsx`**

```tsx
import { cn } from "@/lib/utils";

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("hairline border-t", className)} />;
}
```

- [ ] **Step 5: `Link.tsx`** (arrow link)

```tsx
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = { href: string; className?: string; children: ReactNode };

export function ArrowLink({ href, className, children }: Props) {
  return (
    <NextLink
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-wider text-white transition-colors duration-fast hover:text-amber",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
    </NextLink>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add components/ui/
git commit -m "feat(ui): Container, Button, Tag, Divider, ArrowLink primitives"
```

---

### Task 8: Motion primitives

**Files:**
- Create: `components/motion/FadeIn.tsx`
- Create: `components/motion/Stagger.tsx`
- Create: `components/motion/CountUp.tsx`
- Create: `components/motion/Marquee.tsx`

- [ ] **Step 1: `FadeIn.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { fadeUp, baseTransition } from "@/lib/motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "h1" | "h2" | "h3" | "p";
};

export function FadeIn({ children, delay = 0, className, as = "div" }: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ ...baseTransition, delay }}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Step 2: `Stagger.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { stagger, fadeUp, baseTransition } from "@/lib/motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number };

export function Stagger({ children, className, delay = 0.08 }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(delay)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} transition={baseTransition}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: `CountUp.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = { value: number; duration?: number; suffix?: string; className?: string };

export function CountUp({ value, duration = 1600, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return <span ref={ref} className={className}>{display}{suffix}</span>;
}
```

- [ ] **Step 4: `Marquee.tsx`**

```tsx
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; speed?: "slow" | "base" | "fast" };

const speeds: Record<NonNullable<Props["speed"]>, string> = {
  slow: "[animation-duration:60s]",
  base: "[animation-duration:40s]",
  fast: "[animation-duration:24s]",
};

export function Marquee({ children, className, speed = "base" }: Props) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className={cn("flex w-max animate-marquee", speeds[speed])}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/motion/
git commit -m "feat(motion): FadeIn, Stagger, CountUp, Marquee primitives"
```

---

### Task 9: Layout shell — Nav, Footer, CustomCursor, SkipLink

**Files:**
- Create: `components/layout/SkipLink.tsx`
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/CustomCursor.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: `SkipLink.tsx`**

```tsx
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-amber focus:px-4 focus:py-2 focus:font-mono focus:text-mono-sm focus:uppercase focus:text-black"
    >
      Skip to content
    </a>
  );
}
```

- [ ] **Step 2: `Nav.tsx`**

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-nav transition-colors duration-base ease-precise",
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="font-mono text-mono-sm uppercase tracking-widest text-white">
          FOREX <span className="text-amber">//</span> DRILLING
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-mono-xs uppercase tracking-widest transition-colors duration-fast",
                  active ? "text-amber" : "text-gray-light hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-mono text-mono-xs uppercase text-white">{open ? "Close" : "Menu"}</span>
        </button>
      </Container>

      {open && (
        <div className="md:hidden">
          <Container className="flex flex-col gap-4 border-t border-border bg-black py-6">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="font-mono text-mono-sm uppercase text-white">
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: `Footer.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-black py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-display-md leading-none">
              FOREX<br />DRILLING
            </p>
            <p className="mt-6 max-w-sm text-body text-gray-light">
              Specialized drilling services across the Asia-Pacific region.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-gray">Navigate</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-body text-white hover:text-amber">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-gray">Contact</p>
            <p className="mt-4 text-body text-white">{site.footer.address}</p>
            <a href={`mailto:${site.footer.email}`} className="mt-2 block text-body text-white hover:text-amber">
              {site.footer.email}
            </a>
          </div>
        </div>
        <Divider className="my-12" />
        <div className="flex flex-col justify-between gap-4 font-mono text-mono-xs uppercase tracking-widest text-gray md:flex-row">
          <span>© {new Date().getFullYear()} Forex Drilling Pte Ltd</span>
          <span>Built in Singapore · Operating across Asia-Pacific</span>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: `CustomCursor.tsx`** (desktop only, crosshair)

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    setEnabled(mq.matches);
    const listener = () => setEnabled(mq.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let rx = 0, ry = 0, x = 0, y = 0;
    let raf = 0;
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-amber"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 -translate-x-1/2 -translate-y-1/2 border border-amber/60 mix-blend-difference"
      />
    </>
  );
}
```

- [ ] **Step 5: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { fontDisplay, fontMono, fontSans, fontAccent } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Forex Drilling — Specialized Drilling Services", template: "%s — Forex Drilling" },
  description: "Safe, reliable, high-quality drilling services across the Asia-Pacific region. Based in Singapore with operations in Papua New Guinea.",
  metadataBase: new URL("https://forexdrilling.com"),
  openGraph: {
    type: "website",
    title: "Forex Drilling",
    description: "Specialized drilling services across the Asia-Pacific region.",
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontMono.variable} ${fontSans.variable} ${fontAccent.variable}`}>
      <body className="bg-black text-white">
        <SkipLink />
        <CustomCursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify layout renders**

```bash
pnpm dev
```
Visit localhost:3000. Nav fixed at top, Footer at bottom. Skip link visible on Tab. Kill.

- [ ] **Step 7: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat(layout): Nav, Footer, CustomCursor, SkipLink shell"
```

---

### Task 10: Section components

**Files:**
- Create: `components/sections/SectionHeader.tsx`
- Create: `components/sections/StatCard.tsx`
- Create: `components/sections/ServiceCard.tsx`
- Create: `components/sections/PillarCard.tsx`
- Create: `components/sections/ProtocolBadge.tsx`
- Create: `components/sections/StepItem.tsx`
- Create: `components/sections/MarqueeBanner.tsx`
- Create: `components/sections/CtaBanner.tsx`

- [ ] **Step 1: `SectionHeader.tsx`**

```tsx
import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ index, label, title, description, align = "left", className }: Props) {
  return (
    <header className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      {(index || label) && (
        <p className="flex items-center gap-3 font-mono text-mono-xs uppercase tracking-widest text-amber">
          {index && <span>{index}</span>}
          {index && label && <span className="h-px w-8 bg-amber" aria-hidden />}
          {label && <span className="text-gray-light">{label}</span>}
        </p>
      )}
      <h2 className="max-w-4xl font-display text-display-lg uppercase text-balance">{title}</h2>
      {description && <p className="max-w-2xl text-body-lg text-gray-light">{description}</p>}
    </header>
  );
}
```

- [ ] **Step 2: `StatCard.tsx`**

```tsx
import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";

type Props = {
  value?: number;
  static?: string;
  suffix?: string;
  label: string;
  description?: string;
  className?: string;
};

export function StatCard({ value, static: staticValue, suffix, label, description, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-3 border-l border-border pl-6", className)}>
      <p className="font-display text-display-md leading-none text-white">
        {value !== undefined ? <CountUp value={value} suffix={suffix} /> : staticValue}
      </p>
      <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">{label}</p>
      {description && <p className="text-body text-gray-light">{description}</p>}
    </div>
  );
}
```

- [ ] **Step 3: `ServiceCard.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  title: string;
  summary: string;
  href: string;
  className?: string;
};

export function ServiceCard({ index, title, summary, href, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-6 border-l border-border bg-deep p-8 transition-all duration-base ease-precise hover:-translate-y-1 hover:border-amber",
        className,
      )}
    >
      <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">{index}</span>
      <h3 className="font-display text-display-sm uppercase text-white">{title}</h3>
      <p className="text-body text-gray-light">{summary}</p>
      <span className="mt-auto inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-widest text-white">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
```

- [ ] **Step 4: `PillarCard.tsx`**

```tsx
type Props = { title: string; body: string };

export function PillarCard({ title, body }: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-amber/40 pt-6">
      <h4 className="font-display text-display-sm uppercase text-white">{title}</h4>
      <p className="text-body text-gray-light">{body}</p>
    </div>
  );
}
```

- [ ] **Step 5: `ProtocolBadge.tsx`**

```tsx
type Props = { label: string; code: string };

export function ProtocolBadge({ label, code }: Props) {
  return (
    <div className="flex flex-col gap-3 border border-border bg-surface p-6 transition-colors duration-fast hover:border-amber">
      <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">{code}</span>
      <span className="font-display text-display-sm leading-none uppercase text-white">{label}</span>
    </div>
  );
}
```

- [ ] **Step 6: `StepItem.tsx`**

```tsx
type Props = { number: string; title: string; body: string };

export function StepItem({ number, title, body }: Props) {
  return (
    <article className="flex flex-col gap-4 border-t border-amber/30 pt-6">
      <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">Step {number}</span>
      <h3 className="font-display text-display-sm uppercase text-white">{title}</h3>
      <p className="text-body text-gray-light">{body}</p>
    </article>
  );
}
```

- [ ] **Step 7: `MarqueeBanner.tsx`**

```tsx
import { Marquee } from "@/components/motion/Marquee";

type Props = { items: string[] };

export function MarqueeBanner({ items }: Props) {
  return (
    <div className="border-y border-border bg-deep py-6">
      <Marquee speed="slow">
        <ul className="flex items-center gap-10 pr-10 font-mono text-mono-sm uppercase tracking-widest text-amber">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-10">
              {item}
              <span className="text-border" aria-hidden>·</span>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}
```

- [ ] **Step 8: `CtaBanner.tsx`**

```tsx
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Props = { headline: string; body?: string; cta: string; href: string };

export function CtaBanner({ headline, body, cta, href }: Props) {
  return (
    <section className="bg-amber py-24 text-black">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-lg uppercase leading-none">{headline}</h2>
          {body && <p className="mt-6 text-body-lg">{body}</p>}
        </div>
        <Button href={href} variant="primary" className="bg-black text-white hover:bg-white hover:text-black">
          {cta}
        </Button>
      </Container>
    </section>
  );
}
```

- [ ] **Step 9: Commit**

```bash
git add components/sections/
git commit -m "feat(sections): core composable section components"
```

---

### Task 11: WebGL Hero (React Three Fiber)

**Files:**
- Create: `components/three/WebGLHero.tsx`

- [ ] **Step 1: Implement terrain mesh scene**

```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function TerrainMesh() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 24, 80, 48);
    const position = geo.attributes.position;
    if (position) {
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z =
          Math.sin(x * 0.3) * 0.6 +
          Math.cos(y * 0.4) * 0.4 +
          Math.sin(x * 0.15 + y * 0.2) * 1.2;
        position.setZ(i, z);
      }
      position.needsUpdate = true;
      geo.computeVertexNormals();
    }
    return new THREE.WireframeGeometry(geo);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <lineSegments ref={ref} geometry={geometry} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -2, 0]}>
      <lineBasicMaterial color="#E8A020" transparent opacity={0.35} />
    </lineSegments>
  );
}

export function WebGLHero() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 4, 12], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#08080A", 12, 30]} />
        <ambientLight intensity={0.2} />
        <TerrainMesh />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/three/
git commit -m "feat(three): WebGL wireframe terrain hero scene"
```

---

### Task 12: Homepage sections (compose)

**Files:**
- Create: `components/sections/HeroStats.tsx`
- Create: `components/sections/TrustBar.tsx`
- Create: `components/sections/ServicesPreview.tsx`
- Create: `components/sections/AboutTeaser.tsx`
- Create: `components/sections/HseStatement.tsx`
- Create: `components/sections/ProjectApproach.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `HeroStats.tsx`** (right-side inset)

```tsx
import { StatCard } from "./StatCard";

export function HeroStats() {
  return (
    <aside className="grid gap-8 border-l border-border bg-deep/80 p-8 backdrop-blur-sm">
      <StatCard static="Singapore" label="Headquarters" />
      <StatCard static="Papua New Guinea" label="Operations" description="Active mining & exploration" />
      <StatCard value={12} suffix="+" label="Drilling Capabilities" description="From diamond to RC to sonic" />
      <StatCard static="Asia-Pacific" label="Region" />
    </aside>
  );
}
```

- [ ] **Step 2: `TrustBar.tsx`**

```tsx
import { MarqueeBanner } from "./MarqueeBanner";

const items = [
  "DIAMOND DRILLING",
  "SONIC DRILLING",
  "DIRECTIONAL DRILLING",
  "RC DRILLING",
  "INSTRUMENTATION",
  "MWD",
  "KRUX DATA SYSTEMS",
  "GEOPHYSICAL LOGGING",
  "PUMPING & PACKER TESTING",
  "SPT & PUSH TUBE",
];

export function TrustBar() {
  return <MarqueeBanner items={items} />;
}
```

- [ ] **Step 3: `ServicesPreview.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "./SectionHeader";
import { ServiceCard } from "./ServiceCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowLink } from "@/components/ui/Link";

const preview = [
  { index: "01", title: "Diamond Drilling", summary: "High-recovery core drilling for precise geological and geotechnical data.", href: "/services/diamond-drilling" },
  { index: "02", title: "Instrumentation Installation", summary: "VWPs, inclinometers, and monitoring systems — installed and commissioned.", href: "/services/instrumentation-installation" },
  { index: "03", title: "Data Acquisition", summary: "Krux, MWD, and structured digital workflows for reliable field data.", href: "/services/data-acquisition" },
];

export function ServicesPreview() {
  return (
    <section className="py-32">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader index="03" label="Our Services" title="A full spectrum of specialist capabilities." />
          <ArrowLink href="/services">All Services</ArrowLink>
        </div>
        <Stagger className="grid gap-px bg-border md:grid-cols-3">
          {preview.map((s) => (
            <StaggerItem key={s.index}>
              <ServiceCard {...s} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: `AboutTeaser.tsx`**

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "./SectionHeader";
import { PillarCard } from "./PillarCard";
import { ArrowLink } from "@/components/ui/Link";
import { FadeIn } from "@/components/motion/FadeIn";

export function AboutTeaser() {
  return (
    <section className="bg-deep py-32">
      <Container className="grid gap-16 md:grid-cols-12">
        <FadeIn className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-border">
            <Image
              src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=1200"
              alt="Drilling operation in remote terrain"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </FadeIn>
        <div className="flex flex-col gap-10 md:col-span-7">
          <SectionHeader index="02" label="About Us" title="Built for demanding environments." />
          <p className="max-w-2xl text-body-lg text-gray-light">
            Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil projects.
            Headquartered in Singapore and operating in Papua New Guinea, we combine strong operational experience
            with a deep understanding of geotechnical, hydrogeological, and exploration requirements.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <PillarCard title="Versatility" body="Crews and rigs capable of covering multiple scopes on a single mobilisation." />
            <PillarCard title="Resilience" body="Built into our people, equipment, and systems to perform under pressure." />
            <PillarCard title="Reliability" body="Structured maintenance and disciplined field practice deliver consistent output." />
          </div>
          <ArrowLink href="/about">Read our full story</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: `HseStatement.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { ProtocolBadge } from "./ProtocolBadge";
import { FadeIn } from "@/components/motion/FadeIn";

const protocols = [
  { code: "SOP", label: "Standard Operating Procedures" },
  { code: "JSA", label: "Job Safety Analysis" },
  { code: "PTW", label: "Permit to Work" },
  { code: "T5", label: "Take 5 Assessment" },
  { code: "TBX", label: "Toolbox Meetings" },
  { code: "PPE", label: "Full PPE Compliance" },
];

export function HseStatement() {
  return (
    <section className="bg-black py-32">
      <Container className="flex flex-col gap-16">
        <FadeIn>
          <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">04 — Health, Safety &amp; Environment</p>
          <blockquote className="mt-6 max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            &ldquo;Safety is not a procedure.<br />
            <span className="text-amber">It&rsquo;s how we operate.</span>&rdquo;
          </blockquote>
          <p className="mt-10 max-w-2xl text-body-lg text-gray-light">
            All activities operate in strict compliance with client safety standards, site procedures, and regulatory requirements.
            Every role is trained, certified, and competent — and we continuously invest in better practices, equipment, and systems.
          </p>
        </FadeIn>
        <div className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
          {protocols.map((p) => (
            <ProtocolBadge key={p.code} code={p.code} label={p.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 6: `ProjectApproach.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "./SectionHeader";
import { StepItem } from "./StepItem";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const steps = [
  { number: "01", title: "Early Engagement", body: "We engage at the planning stage to understand constraints, identify risks, and propose practical approaches." },
  { number: "02", title: "Efficient Mobilisation", body: "Structured mobilisation and setup to get productive on site as quickly as possible." },
  { number: "03", title: "Reliable Execution", body: "Day-to-day operations backed by structured reporting, KPIs, and close coordination with client teams." },
  { number: "04", title: "Transparent Communication", body: "Proactive issue resolution and clear reporting — no surprises, ever." },
];

export function ProjectApproach() {
  return (
    <section className="py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeader index="05" label="Our Approach" title="Hands-on, solution-driven delivery." />
        <Stagger className="grid gap-10 md:grid-cols-4">
          {steps.map((s) => (
            <StaggerItem key={s.number}>
              <StepItem {...s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
```

- [ ] **Step 7: Homepage `app/page.tsx`**

```tsx
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/Link";
import { Tag } from "@/components/ui/Tag";
import { HeroStats } from "@/components/sections/HeroStats";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { HseStatement } from "@/components/sections/HseStatement";
import { ProjectApproach } from "@/components/sections/ProjectApproach";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";

const WebGLHero = dynamic(() => import("@/components/three/WebGLHero").then((m) => m.WebGLHero), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden pt-nav">
        <WebGLHero />
        <Container className="relative z-10 flex min-h-[calc(100svh-theme(spacing.nav))] flex-col justify-end pb-20 pt-20">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="flex flex-col gap-10 md:col-span-8">
              <FadeIn>
                <Tag>01 — Forex Drilling</Tag>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-display text-display-xl uppercase leading-[0.85] text-balance">
                  Built to<br /><span className="text-amber">Deliver.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="max-w-xl text-body-lg text-gray-light">
                  Specialized drilling services across the Asia-Pacific region. Based in Singapore with operations in Papua New Guinea,
                  Forex Drilling supports major mining, greenfield exploration, and civil projects — in demanding environments where
                  accuracy, safety, and reliability are critical.
                </p>
              </FadeIn>
              <FadeIn delay={0.3} className="flex flex-wrap items-center gap-6">
                <Button href="/services" variant="amber">Our Services</Button>
                <ArrowLink href="/about">Learn more</ArrowLink>
              </FadeIn>
            </div>
            <FadeIn delay={0.4} className="md:col-span-4">
              <HeroStats />
            </FadeIn>
          </div>
        </Container>
      </section>
      <TrustBar />
      <AboutTeaser />
      <ServicesPreview />
      <HseStatement />
      <ProjectApproach />
      <CtaBanner
        headline="Ready to discuss your program?"
        body="We engage early, understand your constraints, and build the right crew and method mix for your site."
        cta="Get in Touch"
        href="/contact"
      />
    </>
  );
}
```

- [ ] **Step 8: Verify homepage renders**

```bash
pnpm dev
```
Visit localhost:3000. Hero should show WebGL wireframe mesh, amber headline, stats panel, scrolling marquee, 3-column services, about, HSE quote, approach steps, amber CTA. Scroll through — animations should trigger. Kill.

- [ ] **Step 9: Commit**

```bash
git add components/sections/ app/page.tsx
git commit -m "feat(home): assemble full homepage with all sections"
```

---

### Task 13: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Compose page**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PillarCard } from "@/components/sections/PillarCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "About",
  description: "Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil projects across Asia-Pacific.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>About Us</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            A specialist drilling contractor built for <span className="text-amber">challenging environments.</span>
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <FadeIn className="md:col-span-4">
            <SectionHeader index="01" label="Who We Are" title="Built for the field." />
          </FadeIn>
          <div className="flex flex-col gap-6 text-body-lg text-gray-light md:col-span-8">
            <FadeIn as="p" delay={0.05}>
              Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil projects with a broad
              range of drilling services. Headquartered in Singapore and operating in Papua New Guinea, the company is structured
              to deliver efficient, field-proven solutions in remote and challenging environments.
            </FadeIn>
            <FadeIn as="p" delay={0.1}>
              Our team combines strong operational experience with a clear understanding of geotechnical, hydrogeological, and
              exploration requirements. Each drilling program is executed with the objective of producing reliable, high-quality
              data that directly supports geological interpretation, slope stability assessments, groundwater modelling, resource
              modelling, and engineering decisions.
            </FadeIn>
            <FadeIn as="p" delay={0.15}>
              We work closely with our clients from early stages through execution — understanding project constraints,
              identifying risks, and proposing practical, solution-driven approaches. From selecting the right drilling methods to
              delivering fully integrated or turnkey projects when required, we consistently aim to go beyond minimum requirements
              to ensure successful outcomes.
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container className="flex flex-col gap-16">
          <SectionHeader index="02" label="Operating Model" title="Three pillars underpin everything we do." />
          <div className="grid gap-12 md:grid-cols-3">
            <PillarCard title="Versatility" body="We prioritise deploying crews and equipment capable of covering multiple scopes of work, reducing the need for multiple rigs on site. This improves efficiency, reduces downtime, and simplifies project execution." />
            <PillarCard title="Resilience" body="Built into our people, equipment, and systems — we are structured to maintain performance under pressure, adapt to changing ground conditions, and continue delivering safely and reliably." />
            <PillarCard title="Reliability" body="Structured preventative maintenance programs, regular inspections, and disciplined field practices ensure high rig availability, consistent productivity, and dependable project delivery." />
          </div>
        </Container>
      </section>

      <CtaBanner headline="Want to work with us?" cta="Contact the Team" href="/contact" />
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm dev
```
Visit /about. Kill.

```bash
git add app/about/
git commit -m "feat(about): about page with pillars and full brief copy"
```

---

### Task 14: Services overview page

**Files:**
- Create: `app/services/page.tsx`

- [ ] **Step 1: Compose**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { services, type ServiceCategory } from "@/content/services";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { padNumber } from "@/lib/utils";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Services",
  description: "A full spectrum of drilling, instrumentation, downhole, and data acquisition services.",
};

const categoryLabels: Record<ServiceCategory, string> = {
  drilling: "Drilling Services",
  instrumentation: "Instrumentation",
  downhole: "Downhole Services",
  data: "Data Acquisition",
};

export default function ServicesPage() {
  const grouped = (Object.keys(categoryLabels) as ServiceCategory[]).map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    items: services.filter((s) => s.category === cat),
  }));

  return (
    <>
      <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>Services</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            A full spectrum of <span className="text-amber">specialist capabilities.</span>
          </h1>
          <p className="max-w-2xl text-body-lg text-gray-light">
            From diamond and sonic drilling to instrumentation, downhole services, and digital data systems —
            everything we deploy is chosen to deliver reliable, high-quality outcomes in demanding environments.
          </p>
        </Container>
      </section>

      {grouped.map((group, gi) => (
        <section key={group.category} className={gi % 2 === 0 ? "bg-deep py-24" : "py-24"}>
          <Container className="flex flex-col gap-12">
            <SectionHeader index={padNumber(gi + 1)} label={group.label} title={group.label} />
            <Stagger className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((s, i) => (
                <StaggerItem key={s.slug}>
                  <ServiceCard
                    index={padNumber(i + 1)}
                    title={s.title}
                    summary={s.summary}
                    href={`/services/${s.slug}`}
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ))}

      <CtaBanner headline="Need a custom scope?" cta="Get in Touch" href="/contact" />
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm dev
```
Visit /services. Kill.

```bash
git add app/services/page.tsx
git commit -m "feat(services): overview page grouped by category"
```

---

### Task 15: Service detail dynamic page

**Files:**
- Create: `app/services/[slug]/page.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { padNumber } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { Check } from "lucide-react";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default function ServiceDetailPage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = service.related
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>{service.category.toUpperCase()}</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            {service.title}
          </h1>
          <p className="max-w-3xl text-body-lg text-gray-light">{service.summary}</p>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeader index="01" label="Overview" title="What we deliver." />
          </div>
          <FadeIn as="p" className="text-body-lg text-gray-light md:col-span-8">
            {service.body}
          </FadeIn>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeader index="02" label="Applications" title="Where it fits." />
          </div>
          <ul className="flex flex-col gap-4 md:col-span-8">
            {service.applications.map((a, i) => (
              <FadeIn as="li" key={a} delay={i * 0.05} className="flex items-start gap-4 border-t border-border pt-4">
                <Check className="h-5 w-5 shrink-0 text-amber" aria-hidden />
                <span className="text-body-lg text-white">{a}</span>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-deep py-24">
          <Container className="flex flex-col gap-12">
            <SectionHeader index="03" label="Related" title="Services we often deploy together." />
            <div className="grid gap-px bg-border md:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard
                  key={s.slug}
                  index={padNumber(i + 1)}
                  title={s.title}
                  summary={s.summary}
                  href={`/services/${s.slug}`}
                  className="h-full"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner headline="Have a program that needs this scope?" cta="Request a Quote" href="/contact" />
    </>
  );
}
```

- [ ] **Step 2: Verify + commit**

```bash
pnpm dev
```
Visit /services/diamond-drilling, /services/data-acquisition. Kill.

```bash
git add app/services/[slug]/
git commit -m "feat(services): dynamic detail page with related services"
```

---

### Task 16: Fleet page

**Files:**
- Create: `app/fleet/page.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StatCard } from "@/components/sections/StatCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Fleet & Capabilities",
  description: "Modern, versatile drilling equipment designed to perform reliably in demanding environments.",
};

export default function FleetPage() {
  return (
    <>
      <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>Fleet &amp; Capabilities</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            Equipment built to <span className="text-amber">perform under pressure.</span>
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <FadeIn className="md:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400"
                alt="Drill rig in operation"
                fill
                sizes="(min-width:768px) 45vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </FadeIn>
          <div className="md:col-span-7">
            <SectionHeader index="01" label="Capabilities" title="Scalable, versatile, resilient." />
            <ul className="mt-10 flex flex-col gap-6 text-body-lg text-gray-light">
              <li className="border-t border-border pt-4"><span className="text-white">Scalable multi-rig deployment</span> aligned with project requirements.</li>
              <li className="border-t border-border pt-4"><span className="text-white">Versatile drill rigs</span> including dual-head sonic/diamond capability.</li>
              <li className="border-t border-border pt-4"><span className="text-white">Operation in active mine pits</span> and remote greenfield locations.</li>
              <li className="border-t border-border pt-4"><span className="text-white">Rod and casing handling systems</span> for safer, more efficient operations.</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader index="02" label="Maintenance" title="Treated as a core operational priority." />
          </div>
          <div className="flex flex-col gap-10 md:col-span-7">
            <p className="text-body-lg text-gray-light">
              Structured preventative maintenance programs, disciplined daily inspections, and proactive component
              management ensure high equipment availability and consistent performance. This focus on reliability
              directly supports productivity, reduces downtime, and strengthens overall project delivery.
            </p>
            <div className="grid gap-12 sm:grid-cols-3">
              <StatCard value={95} suffix="%" label="Target Uptime" description="Equipment availability target across active rigs" />
              <StatCard static="Daily" label="Inspection Cadence" description="Every rig, every shift, without exception" />
              <StatCard static="Field-First" label="Maintenance Culture" description="Preventative programs lead component management" />
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner headline="Need a rig on site?" cta="Contact Operations" href="/contact" />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/fleet/
git commit -m "feat(fleet): fleet & capabilities page"
```

---

### Task 17: HSE page

**Files:**
- Create: `app/hse/page.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProtocolBadge } from "@/components/sections/ProtocolBadge";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "HSE — Health, Safety & Environment",
  description: "Safety is at the core of our operations. Structured systems, certified personnel, and continuous improvement.",
};

const protocols = [
  { code: "SOP", label: "Standard Operating Procedures" },
  { code: "JSA", label: "Job Safety Analysis" },
  { code: "PTW", label: "Permit to Work" },
  { code: "T5", label: "Take 5 Risk Assessment" },
  { code: "TBX", label: "Toolbox Meetings" },
  { code: "PPE", label: "Full PPE Compliance" },
];

export default function HsePage() {
  return (
    <>
      <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>HSE</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            Safety is not a procedure.<br /><span className="text-amber">It&rsquo;s how we operate.</span>
          </h1>
          <p className="max-w-2xl text-body-lg text-gray-light">
            Forex Drilling operates in strict compliance with client safety standards, site procedures, and regulatory
            requirements. Every activity is conducted under structured safety systems.
          </p>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeader index="01" label="Protocols" title="Structured systems on every job." />
          <div className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
            {protocols.map((p) => <ProtocolBadge key={p.code} code={p.code} label={p.label} />)}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader index="02" label="Commitment" title="Continuous improvement, embedded." />
          </div>
          <FadeIn className="flex flex-col gap-6 text-body-lg text-gray-light md:col-span-7">
            <p>
              All personnel are trained, certified, and competent for their roles. We actively participate in client-led
              safety reviews, audits, and continuous improvement processes.
            </p>
            <p>
              We are committed to continuously improving safety performance through the adoption of better practices,
              technologies, and equipment. This includes rod handling systems and other innovations aimed at reducing
              manual handling, minimizing exposure to hazards, and improving overall operational safety.
            </p>
            <p>
              Environmental responsibility is integrated into operations through proper waste management, site protection
              measures, and full compliance with environmental regulations.
            </p>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner headline="Looking for a safety-first drilling partner?" cta="Talk to Us" href="/contact" />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/hse/
git commit -m "feat(hse): health, safety & environment page"
```

---

### Task 18: Quality page

**Files:**
- Create: `app/quality/page.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StatCard } from "@/components/sections/StatCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Quality & Performance",
  description: "Structured quality systems, accurate data, and continuous improvement embedded across every program.",
};

export default function QualityPage() {
  return (
    <>
      <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>Quality &amp; Performance</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            Reliable data, <span className="text-amber">consistent delivery.</span>
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader index="01" label="Quality Management" title="Structured. Documented. Auditable." />
          </div>
          <ul className="flex flex-col gap-4 md:col-span-7">
            {[
              "Quality Management Plans aligned with project requirements",
              "Accurate drillhole logging and reporting",
              "Core recovery optimisation",
              "Verification of instrumentation installation",
              "Continuous monitoring of drilling performance",
            ].map((item, i) => (
              <FadeIn as="li" key={item} delay={i * 0.05} className="border-t border-border pt-4 text-body-lg text-white">
                {item}
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-2">
          <FadeIn className="border-l border-amber pl-8">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Digital Platform</p>
            <h3 className="mt-4 font-display text-display-md uppercase text-white">Krux</h3>
            <p className="mt-6 text-body-lg text-gray-light">
              Real-time data collection, reporting, and operational monitoring. Drilling data is captured accurately and
              consistently across the program, with structured outputs ready for client technical teams.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="border-l border-amber pl-8">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Downhole Telemetry</p>
            <h3 className="mt-4 font-display text-display-md uppercase text-white">MWD</h3>
            <p className="mt-6 text-body-lg text-gray-light">
              Measurement While Drilling collects downhole parameters during operations. When interpreted alongside
              geological and geotechnical data, it provides valuable insight into ground conditions and enhances
              decision-making.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="border-t border-border bg-deep py-24">
        <Container className="grid gap-12 sm:grid-cols-3">
          <StatCard value={100} suffix="%" label="Reporting Coverage" description="Every shift, every hole" />
          <StatCard static="Real-Time" label="Data Capture" description="Krux + MWD integrated" />
          <StatCard static="Continuous" label="Improvement" description="KPI-driven reviews on every program" />
        </Container>
      </section>

      <CtaBanner headline="Need auditable, structured delivery?" cta="Start a Conversation" href="/contact" />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/quality/
git commit -m "feat(quality): quality & performance page with Krux/MWD callouts"
```

---

### Task 19: Projects page (CMS-ready stub)

**Files:**
- Create: `app/projects/page.tsx`
- Create: `sanity/schemas/project.ts`
- Create: `lib/sanity.ts`

- [ ] **Step 1: `lib/sanity.ts` (stub)**

```ts
import { createClient } from "next-sanity";
import type { Project } from "@/content/projects";
import { projects as placeholderProjects } from "@/content/projects";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

export async function getProjects(): Promise<Project[]> {
  if (!sanityClient) return placeholderProjects;
  const query = `*[_type == "project"] | order(_createdAt desc) { slug, title, location, scope, methods, outcomes, "cover": cover.asset->url }`;
  try {
    return await sanityClient.fetch<Project[]>(query);
  } catch {
    return placeholderProjects;
  }
}
```

- [ ] **Step 2: `sanity/schemas/project.ts`**

```ts
export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r: { required: () => unknown }) => r.required() },
    { name: "location", title: "Location", type: "string" },
    { name: "scope", title: "Scope", type: "string", options: { list: [{ title: "Mining", value: "mining" }, { title: "Exploration", value: "exploration" }, { title: "Civil", value: "civil" }] } },
    { name: "methods", title: "Drilling methods", type: "array", of: [{ type: "string" }] },
    { name: "outcomes", title: "Outcomes", type: "text", rows: 4 },
    { name: "cover", title: "Cover image", type: "image", options: { hotspot: true } },
  ],
};
```

- [ ] **Step 3: `app/projects/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getProjects } from "@/lib/sanity";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { padNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected drilling programs across Asia-Pacific.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>Projects</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            Selected <span className="text-amber">field programs.</span>
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeader index="01" label="Case Studies" title="Mining, exploration, civil." />
          <Stagger className="grid gap-px bg-border md:grid-cols-2">
            {projects.map((p, i) => (
              <StaggerItem key={p.slug}>
                <Link
                  href={`/projects#${p.slug}`}
                  id={p.slug}
                  className="group flex h-full flex-col bg-black transition-colors duration-base hover:bg-surface"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover grayscale transition-transform duration-slow group-hover:scale-105"
                    />
                    <span className="absolute left-6 top-6 bg-amber px-3 py-1 font-mono text-mono-xs uppercase tracking-widest text-black">
                      {p.scope}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 p-8">
                    <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">{padNumber(i + 1)} — {p.location}</span>
                    <h3 className="font-display text-display-sm uppercase text-white">{p.title}</h3>
                    <p className="text-body text-gray-light">{p.outcomes}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {p.methods.map((m) => (
                        <li key={m} className="border border-border px-3 py-1 font-mono text-mono-xs uppercase tracking-widest text-gray-light">{m}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBanner headline="Have a program to share with us?" cta="Get in Touch" href="/contact" />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/projects/ lib/sanity.ts sanity/
git commit -m "feat(projects): projects page with Sanity stub + schema"
```

---

### Task 20: Contact page + form

**Files:**
- Create: `lib/resend.ts`
- Create: `components/forms/ContactForm.tsx`
- Create: `app/api/contact/route.ts`
- Create: `app/contact/page.tsx`
- Create: `.env.example`

- [ ] **Step 1: `lib/resend.ts`**

```ts
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;
export const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "contact@forexdrilling.com";
export const contactFromEmail = process.env.CONTACT_FROM_EMAIL ?? "website@forexdrilling.com";
```

- [ ] **Step 2: `components/forms/ContactForm.tsx`**

```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  name: z.string().min(2, "Please provide your name"),
  company: z.string().min(2, "Please provide your company"),
  role: z.string().min(2, "Please provide your role"),
  country: z.string().min(2, "Please provide your country"),
  scope: z.enum(["mining", "exploration", "civil", "other"]),
  message: z.string().min(20, "Please share a few details (20+ chars)"),
});
type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { scope: "mining" },
  });
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="border border-amber bg-surface p-10">
        <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Message received</p>
        <h3 className="mt-4 font-display text-display-md uppercase text-white">Thank you.</h3>
        <p className="mt-4 text-body-lg text-gray-light">We&rsquo;ll get back to you within one business day.</p>
      </div>
    );
  }

  const inputCls = "w-full border-b border-border bg-transparent px-0 py-4 font-sans text-body text-white outline-none transition-colors placeholder:text-gray focus:border-amber";
  const labelCls = "font-mono text-mono-xs uppercase tracking-widest text-gray-light";
  const errCls = "mt-1 font-mono text-mono-xs text-amber";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid gap-8 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Name</span>
          <input {...register("name")} className={cn(inputCls)} placeholder="Your full name" />
          {errors.name && <span className={errCls}>{errors.name.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Company</span>
          <input {...register("company")} className={cn(inputCls)} placeholder="Organisation" />
          {errors.company && <span className={errCls}>{errors.company.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Role</span>
          <input {...register("role")} className={cn(inputCls)} placeholder="Your position" />
          {errors.role && <span className={errCls}>{errors.role.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Country</span>
          <input {...register("country")} className={cn(inputCls)} placeholder="Project location" />
          {errors.country && <span className={errCls}>{errors.country.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className={labelCls}>Scope of Work</span>
        <select {...register("scope")} className={cn(inputCls, "appearance-none")}>
          <option value="mining">Mining</option>
          <option value="exploration">Exploration</option>
          <option value="civil">Civil</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelCls}>Message</span>
        <textarea {...register("message")} rows={5} className={cn(inputCls, "resize-none")} placeholder="Project scope, location, timeline…" />
        {errors.message && <span className={errCls}>{errors.message.message}</span>}
      </label>
      <div className="flex items-center gap-6">
        <Button type="submit" variant="amber">{status === "submitting" ? "Sending…" : "Send Enquiry"}</Button>
        {status === "error" && <span className="font-mono text-mono-xs uppercase text-amber">Something went wrong. Please try again.</span>}
      </div>
    </form>
  );
}
```

- [ ] **Step 3: `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { resend, contactFromEmail, contactToEmail } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  role: z.string().min(2),
  country: z.string().min(2),
  scope: z.enum(["mining", "exploration", "civil", "other"]),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const data = parsed.data;

  if (!resend) {
    console.info("[contact] Resend not configured — logging payload only", data);
    return NextResponse.json({ ok: true, stubbed: true });
  }

  const { error } = await resend.emails.send({
    from: contactFromEmail,
    to: contactToEmail,
    subject: `New enquiry — ${data.company} (${data.scope})`,
    replyTo: data.name,
    text: `Name: ${data.name}\nCompany: ${data.company}\nRole: ${data.role}\nCountry: ${data.country}\nScope: ${data.scope}\n\n${data.message}`,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: `app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description: "Discuss your drilling program with the Forex Drilling team.",
};

export default function ContactPage() {
  return (
    <section className="pt-[calc(theme(spacing.nav)+6rem)] pb-32">
      <Container className="grid gap-20 md:grid-cols-12">
        <FadeIn className="md:col-span-5">
          <Tag>Contact</Tag>
          <h1 className="mt-8 font-display text-display-xl uppercase leading-[0.9] text-balance">
            Let&rsquo;s discuss <span className="text-amber">your program.</span>
          </h1>
          <p className="mt-8 text-body-lg text-gray-light">
            Tell us about your project — scope, location, timeline — and we&rsquo;ll get back to you within one business day.
          </p>
          <dl className="mt-12 flex flex-col gap-6 border-t border-border pt-8 text-body">
            <div>
              <dt className="font-mono text-mono-xs uppercase tracking-widest text-amber">Headquarters</dt>
              <dd className="mt-2 text-white">Singapore</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase tracking-widest text-amber">Operations</dt>
              <dd className="mt-2 text-white">Papua New Guinea · Asia-Pacific</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase tracking-widest text-amber">Email</dt>
              <dd className="mt-2"><a href="mailto:contact@forexdrilling.com" className="text-white hover:text-amber">contact@forexdrilling.com</a></dd>
            </div>
          </dl>
        </FadeIn>
        <FadeIn delay={0.1} className="md:col-span-7">
          <ContactForm />
        </FadeIn>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: `.env.example`**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=
CONTACT_TO_EMAIL=contact@forexdrilling.com
CONTACT_FROM_EMAIL=website@forexdrilling.com
```

- [ ] **Step 6: Verify form works (stub path)**

```bash
pnpm dev
```
Fill /contact form and submit. Check terminal — should log `[contact] Resend not configured — logging payload only`. Kill.

- [ ] **Step 7: Commit**

```bash
git add app/contact/ app/api/ components/forms/ lib/resend.ts .env.example
git commit -m "feat(contact): form with RHF+zod, Resend stub, API route"
```

---

### Task 21: Robots, sitemap, not-found, OG image placeholder

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/not-found.tsx`
- Create: `public/favicon.svg`
- Create: `public/og-default.jpg` (placeholder — use any 1200x630 solid amber image)

- [ ] **Step 1: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://forexdrilling.com/sitemap.xml",
  };
}
```

- [ ] **Step 2: `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://forexdrilling.com";
  const staticRoutes = ["", "/about", "/services", "/fleet", "/hse", "/quality", "/projects", "/contact"];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() })),
    ...services.map((s) => ({ url: `${base}/services/${s.slug}`, lastModified: new Date() })),
  ];
}
```

- [ ] **Step 3: `app/not-found.tsx`**

```tsx
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center pt-nav">
      <Container className="flex flex-col gap-8">
        <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">404 — Not Found</p>
        <h1 className="font-display text-display-xl uppercase leading-[0.9]">Off the map.</h1>
        <p className="max-w-xl text-body-lg text-gray-light">The page you&rsquo;re looking for doesn&rsquo;t exist.</p>
        <div><Button href="/" variant="amber">Return home</Button></div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#08080A"/><path d="M8 8h16v3H11v4h10v3H11v6H8z" fill="#E8A020"/></svg>
```

- [ ] **Step 5: Generate OG placeholder**

Create a 1200x630 PNG at `public/og-default.jpg` — a dark panel with "FOREX // DRILLING" in amber. Any tool works (Figma, Photoshop, or a minimal HTML→screenshot). Acceptable for Phase 0.

- [ ] **Step 6: Commit**

```bash
git add app/robots.ts app/sitemap.ts app/not-found.tsx public/
git commit -m "feat(seo): robots, sitemap, 404 page, favicon, OG placeholder"
```

---

### Task 22: README + CLAUDE.md + .gitignore polish

**Files:**
- Create: `README.md`
- Create: `CLAUDE.md`
- Modify: `.gitignore`

- [ ] **Step 1: `README.md`**

```markdown
# Forex Drilling

Production website for Forex Drilling — specialist drilling contractor, Singapore.

## Stack
Next.js 14 · TypeScript strict · Tailwind · Framer Motion · React Three Fiber · Sanity (stub) · Resend (stub) · Vercel.

## Develop
\`\`\`bash
pnpm install
pnpm dev
\`\`\`

## Environment
Copy \`.env.example\` to \`.env.local\` and fill values. All third-party integrations are stubbed when env vars are missing.

## Design tokens
All brand values live in \`app/globals.css\` (CSS vars) and \`tailwind.config.ts\` (theme). Phase 1 brand swap = edit those files only.

## Build
\`\`\`bash
pnpm build && pnpm start
\`\`\`
```

- [ ] **Step 2: `CLAUDE.md`**

```markdown
# CLAUDE.md

## Rules
- TypeScript strict. No \`any\`.
- Client components only where needed (\`"use client"\`). Default to Server Components.
- Framer Motion and Three.js imports are client-only. Lazy-load WebGLHero via \`dynamic(..., { ssr: false })\`.
- All colours, typography, spacing via Tailwind tokens. Never inline hex or px for brand values.
- Every interactive element needs visible focus ring (Tailwind \`focus-visible\` default handled globally).
- Respect \`prefers-reduced-motion\` — already enforced via globals.css.
- Use \`next/image\` for all raster images. Use \`next/font\` for all web fonts.
- Content lives in \`/content\`. Pages import typed data. Sanity swap is a future task.
- Commit per logical step. Small, focused commits.
- No dead code, no TODO comments.

## Design system location
- Tokens: \`app/globals.css\` + \`tailwind.config.ts\`
- Motion: \`lib/motion.ts\`
- Typography: \`lib/fonts.ts\`

## Phase 1 brand swap checklist
When agency brand arrives:
1. Replace font imports in \`lib/fonts.ts\`.
2. Update \`--color-*\` values in \`app/globals.css\`.
3. Swap \`public/favicon.svg\` and \`public/og-default.jpg\`.
4. Replace Unsplash placeholder image URLs in: \`content/projects.ts\`, \`components/sections/AboutTeaser.tsx\`, \`app/fleet/page.tsx\`.
5. Review \`WebGLHero\` amber accent value if palette shifts hue.
```

- [ ] **Step 3: Extend `.gitignore`**

```
.env.local
.env*.local
.vercel
.DS_Store
```

- [ ] **Step 4: Commit**

```bash
git add README.md CLAUDE.md .gitignore
git commit -m "docs: README, CLAUDE.md rules, ignore local env"
```

---

### Task 23: Production build + responsive pass

**Files:** verification only

- [ ] **Step 1: Production build**

```bash
pnpm build
```
Expected: build succeeds, no type errors, no eslint errors. Fix any surfaced issues.

- [ ] **Step 2: Run production server**

```bash
pnpm start
```
Open localhost:3000. Walk every route:
- `/` — WebGL hero, marquee, services preview, about, HSE, approach, CTA
- `/about` — hero, 3 pillars, CTA
- `/services` — overview with 4 category groups
- `/services/diamond-drilling` — hero, overview, applications, related, CTA
- `/fleet` — image, capabilities, maintenance stats, CTA
- `/hse` — hero quote, 6 badges, commitment copy, CTA
- `/quality` — hero, QMS list, Krux/MWD callouts, stats, CTA
- `/projects` — 2 project cards
- `/contact` — split form
- `/not-a-real-page` — 404

Kill.

- [ ] **Step 3: Responsive check**

Resize browser to 375px, 768px, 1280px, 1920px. On each route verify:
- No horizontal overflow
- Nav collapses to menu button <md
- Grids stack correctly
- Type remains readable (display sizes clamp)
- Hero stats panel stacks below copy on mobile

Fix any breakage inline.

- [ ] **Step 4: Accessibility quick-pass**

Tab through homepage: every interactive element gets amber focus ring. Skip-link appears on first Tab. Nav links, buttons, form fields all reachable.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: responsive and a11y adjustments from production walkthrough"
```

---

### Task 24: Deploy to Vercel

**Files:** none (platform config)

- [ ] **Step 1: Create Vercel project**

```bash
pnpm dlx vercel@latest
```
Follow prompts — link or create project. Accept defaults.

- [ ] **Step 2: Set env vars (empty values for Phase 0)**

In Vercel dashboard → Project → Settings → Environment Variables, add the keys from `.env.example` with empty values (or skip — all integrations handle missing env gracefully).

- [ ] **Step 3: Deploy preview**

```bash
pnpm dlx vercel@latest --prod=false
```
Note the preview URL.

- [ ] **Step 4: Share URL with client**

Verify the preview URL renders end-to-end. Document the URL in the README under a "Preview" section if desired.

- [ ] **Step 5: Commit any Vercel config**

```bash
git add -A
git commit -m "chore: vercel preview deployment" || true
```

---

## Self-Review Notes

**Spec coverage checked:**
- Homepage hero, trust bar, services preview, about teaser, HSE, approach, CTA — ✓ Tasks 11–12
- About page — ✓ Task 13
- Services overview + 12 detail pages — ✓ Tasks 14–15
- Fleet page — ✓ Task 16
- HSE page — ✓ Task 17
- Quality page — ✓ Task 18
- Projects (CMS-ready) — ✓ Task 19
- Contact + form — ✓ Task 20
- Custom cursor, WebGL hero, count-up, marquee — ✓ Tasks 8, 9, 11
- Typography scale (Bebas/Plex/Playfair) — ✓ Tasks 3, 4
- Color tokens with #AEABA4 typo fix — ✓ Task 3
- Motion primitives + reduced-motion — ✓ Tasks 5, 8, 3
- SEO (metadata, sitemap, robots, JSON-LD ready) — ✓ Tasks 9, 21
- Accessibility (skip link, focus rings, aria) — ✓ Tasks 3, 9, 23
- Agency-grade production build + Vercel preview — ✓ Tasks 23, 24

**Not in Phase 0 (explicit):**
- Live Sanity studio — stubbed
- Live Resend API key — stubbed
- Real photography — Unsplash placeholders
- Brand identity — swappable via token layer
- PostHog analytics — deferred (trivial add post-brand)
- JSON-LD structured data — deferred (needs real org info)

These are explicitly scoped to Phase 1 / Phase 2.

---
