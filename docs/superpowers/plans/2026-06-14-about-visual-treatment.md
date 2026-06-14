# About Page Visual Treatment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise `app/about/page.tsx` to the visual level of the rest of the site using existing components and existing copy/photos only (Direction A).

**Architecture:** Two additive, backward-compatible props on shared components (`QuoteBlock` gets a `variant`, `PillarCard` gets a `pin`), then a rewrite of the About page body into an asymmetric photo composition + a navy pull-quote bandeau + drill-pin pillar cards. The hero and next-page strip are untouched.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 (CSS-first tokens). No test framework in the repo — verification is `pnpm lint` + `pnpm build` + a visual check in the dev server.

**Palette reminder (light editorial):** `bg-black`=white, `bg-deep`=`#F4F5F7` grey, `bg-surface`=`#163767` navy, `text-fore`/`text-deep-navy`=`#11284E`, `amber`=`#E3AA00`. Use tokens only — never hardcode hex in `className`/JSX.

---

### Task 1: Add `variant` prop to QuoteBlock

**Files:**
- Modify: `components/v3/QuoteBlock.tsx`

- [ ] **Step 1: Replace the component with the variant-aware version**

Full new file content:

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Two-line quote — line 2 ocre */
  line1: string;
  line2: string;
  /** Body paragraph below */
  children?: ReactNode;
  /** "light" (default) for white/grey sections; "dark" for navy bandeaux */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Editorial pull quote — for HSE / safety statements / mission lines.
 * Big condensed display with line 2 in ocre. Surrounded by negative space.
 * `variant="dark"` flips the text to white for use on a navy bandeau.
 */
export function QuoteBlock({
  line1,
  line2,
  children,
  variant = "light",
  className,
}: Props) {
  const isDark = variant === "dark";
  return (
    <blockquote className={cn("flex flex-col gap-8", className)}>
      <p
        className={cn(
          "font-display font-black uppercase",
          isDark ? "text-on-navy" : "text-deep-navy",
        )}
        style={{
          fontSize: "clamp(40px, 5.5vw, 80px)",
          lineHeight: "0.95",
          letterSpacing: "-0.005em",
        }}
      >
        &ldquo;{line1}
        <br />
        <span className="text-amber">{line2}&rdquo;</span>
      </p>
      {children && (
        <div
          className="font-sans max-w-[55ch]"
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: isDark
              ? "var(--color-on-navy-muted)"
              : "var(--color-muted)",
          }}
        >
          {children}
        </div>
      )}
    </blockquote>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors for `components/v3/QuoteBlock.tsx`.

- [ ] **Step 3: Verify HSE (existing consumer) is unaffected by reading it**

Run: `grep -n "QuoteBlock" app/hse/page.tsx`
Expected: the call has no `variant` prop → defaults to `"light"` → HSE renders exactly as before.

- [ ] **Step 4: Commit**

```bash
git add components/v3/QuoteBlock.tsx
git commit -m "feat(v3): add dark variant to QuoteBlock for navy bandeaux

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Add optional `pin` accent to PillarCard

**Files:**
- Modify: `components/v3/PillarCard.tsx`

- [ ] **Step 1: Replace the component with the pin-aware version**

Full new file content:

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DrillBitPin } from "./DrillBitPin";

type Props = {
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
  /** Float a decorative drill-bit pin above the card's top-right corner */
  pin?: boolean;
};

/**
 * Editorial pillar card — for Versatility / Resilience / Reliability triads.
 *
 * Anatomy:
 *   - Optional drill-bit pin floating above the top-right corner
 *   - Big yellow number/index top
 *   - Title in dark navy
 *   - Body paragraph in muted grey
 *   - Thin amber left border (4px) anchoring the card
 *   - White bg with soft card shadow
 */
export function PillarCard({
  number,
  title,
  children,
  className,
  pin = false,
}: Props) {
  return (
    <div
      className={cn(
        "relative bg-white p-7 transition-all duration-300",
        "border-l-4 border-amber hover:border-deep-navy",
        "shadow-card",
        className,
      )}
    >
      {pin && (
        <span className="absolute -top-5 right-6 z-10" aria-hidden>
          <DrillBitPin size={26} />
        </span>
      )}
      <p
        className="font-display font-black text-amber"
        style={{ fontSize: "40px", lineHeight: "1", marginBottom: "16px" }}
      >
        {number}
      </p>
      <h3
        className="font-display font-extrabold uppercase text-deep-navy"
        style={{ fontSize: "18px", letterSpacing: "0.04em", marginBottom: "12px" }}
      >
        {title}
      </h3>
      <p
        className="font-sans font-normal"
        style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
      >
        {children}
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors for `components/v3/PillarCard.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/v3/PillarCard.tsx
git commit -m "feat(v3): optional drill-pin accent on PillarCard

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Rewrite the About page body (Direction A)

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Step 1: Replace the whole file**

Full new file content:

```tsx
import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  PillarCard,
  QuoteBlock,
  CircleImageRing,
  DrillBitPin,
  Reveal,
  SectionLink,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "About",
  description:
    "Forex Drilling is a specialist drilling contractor supporting mining, exploration, civil, groundwater, and geothermal programs across the Asia-Pacific region. Headquartered in Singapore, operating in Papua New Guinea.",
};

// ─── HERO — shared full-bleed editorial poster (PageHero) ────────────────────

function AboutHero() {
  return (
    <PageHero
      badge="ABOUT"
      line1="About"
      line2="Forex Drilling."
      photo={{ src: "/images/rig-forest.jpg", alt: "Drilling rig in forested terrain" }}
      body={
        <>
          Forex Drilling is a specialist drilling contractor supporting mining,
          exploration, civil, groundwater, and geothermal programs with a broad
          range of drilling services. Headquartered in Singapore and operating across the
          Asia-Pacific region, the company is structured to deliver efficient,
          field-proven solutions in remote and challenging environments.
        </>
      }
    />
  );
}

// ─── WHO WE ARE — asymmetric text + circle photo ────────────────────────────

function WhoWeAre() {
  return (
    <section className="relative bg-deep py-12 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-[1500px] items-center gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        {/* Text — left */}
        <Reveal className="flex flex-col gap-6 md:col-span-7">
          <SectionLabel number="01" label="Who We Are" />
          <p
            className="font-sans"
            style={{ fontSize: "clamp(16px, 4.5vw, 20px)", lineHeight: "1.6", color: "var(--color-fore)" }}
          >
            Our team combines strong operational experience with a clear
            understanding of geotechnical, hydrogeological, grade control,
            structural geology, resource geology, and exploration requirements.
          </p>
          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Each drilling program is executed with the objective of producing
            reliable, high-quality geological data that supports high-confidence
            geological interpretation. This data underpins geotechnical,
            environmental, groundwater, grade control, and resource modelling,
            and informs critical engineering decisions.
          </p>
          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            We work closely with our clients from early stages through
            execution. This includes understanding project constraints,
            identifying risks, and proposing practical, solution-driven
            approaches &mdash; from selecting the right drilling methods to
            delivering fully integrated or turnkey projects when required. We
            consistently aim to go beyond minimum requirements to ensure
            successful outcomes.
          </p>
        </Reveal>

        {/* Photo — right, with floating pins + faded index filigrane */}
        <Reveal
          from="right"
          delay={120}
          className="relative flex items-center justify-center md:col-span-5 md:justify-end"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none font-display font-black leading-none"
            style={{ fontSize: "clamp(110px, 15vw, 190px)", color: "var(--color-deep-navy)", opacity: 0.06 }}
          >
            01
          </span>
          <div
            className="absolute -top-6 left-1/2 z-10 flex -translate-x-1/2 gap-3 md:left-auto md:right-10 md:translate-x-0"
            aria-hidden
          >
            <DrillBitPin size={34} className="rotate-180" />
            <DrillBitPin size={34} />
          </div>
          <CircleImageRing
            src="/images/rig-vertical-clean.jpg"
            alt="Forex Drilling vertical rig on a prepared drill pad"
            size={300}
            ringOffset={18}
            className="relative z-[1]"
          />
        </Reveal>
      </div>
    </section>
  );
}

// ─── PULL-QUOTE — navy bandeau, line reused from the copy above ──────────────

function PullQuote() {
  return (
    <section className="relative bg-surface py-16 md:py-28">
      <div className="mx-auto max-w-[1500px] px-6 md:px-14">
        <QuoteBlock variant="dark" line1="We go beyond" line2="minimum requirements." />
      </div>
    </section>
  );
}

// ─── OPERATING MODEL — 3 pillars with drill-pin accents ─────────────────────

function OperatingModel() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-32">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-8 select-none font-display font-black leading-none"
        style={{ fontSize: "clamp(140px, 20vw, 280px)", color: "var(--color-deep-navy)", opacity: 0.04 }}
      >
        02
      </span>
      <div className="relative mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[700px]">
          <SectionLabel number="02" label="Operating Model" />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          <PillarCard pin number="01" title="Versatility">
            We prioritise deploying crews and equipment capable of covering
            multiple scopes of work, reducing the need for multiple rigs on
            site. This improves efficiency, reduces downtime, and simplifies
            project execution in often complex environments.
          </PillarCard>
          <PillarCard pin number="02" title="Resilience">
            Built into how we operate, through our people, our equipment, and
            our systems. We are structured to maintain performance under
            pressure, adapt to changing ground conditions, and continue
            delivering safely and reliably in challenging environments.
          </PillarCard>
          <PillarCard pin number="03" title="Reliability">
            Structured preventative maintenance programs, regular inspections,
            and disciplined field practices ensure high rig availability,
            consistent productivity, and dependable project delivery.
          </PillarCard>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <PullQuote />
      <OperatingModel />
      <NextPageStrip />
    </>
  );
}

function NextPageStrip() {
  return (
    <section className="relative bg-deep py-14 md:py-20">
      <div className="mx-auto flex max-w-[1500px] justify-center px-6 md:px-14">
        <SectionLink href="/services" label="Services" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify lint passes**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 3: Verify the production build passes**

Run: `pnpm build`
Expected: "Compiled successfully", "Finished TypeScript", and `/about` listed as a static route, no errors. (A pre-existing `Parkinsans` font-override warning is unrelated and expected.)

- [ ] **Step 4: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat(about): editorial visual treatment (Direction A)

Asymmetric Who-We-Are with circle photo + drill pins, navy pull-quote
bandeau, drill-pin pillar cards. Copy and photos unchanged.

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Visual verification

**Files:** none (manual/automated check)

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev`
Expected: server on `http://localhost:3000`.

- [ ] **Step 2: Check `/about` at desktop and mobile widths**

Open `http://localhost:3000/about`. Confirm:
- Who-We-Are: text left, circle photo right with two drill pins floating above it and a faint "01" behind; lead paragraph visibly larger than the two below.
- Pull-quote: full-width navy band, white text with "minimum requirements." in amber, legible contrast.
- Operating Model: three cards each with a drill pin floating above the top-right corner; faint "02" watermark behind; navy hover border still works.
- Resize to ≤768px: right column stacks under the text, pins centred above the circle, nothing overflows horizontally.

- [ ] **Step 3: Confirm no regression on `/hse`**

Open `http://localhost:3000/hse`. The QuoteBlock there must look exactly as before (dark navy text on grey, not white).

- [ ] **Step 4: Stop the dev server**

Stop the `pnpm dev` process.

---

## Self-Review

**Spec coverage:**
- §① Who We Are asymmetric + circle (`rig-vertical-clean.jpg`) + pins + filigrane → Task 3 `WhoWeAre`. ✓
- §② navy pull-quote bandeau, reused copy, `QuoteBlock variant="dark"` → Task 1 + Task 3 `PullQuote`. ✓
- §③ Operating Model pillars + drill pins + watermark → Task 2 + Task 3 `OperatingModel`. ✓
- Hero + next strip unchanged → Task 3 keeps both verbatim. ✓
- Additive props, no other page affected → Task 1 Step 3 + Task 4 Step 3 verify HSE. ✓
- Tokens only, no hardcoded hex → all colours via `var(--color-*)` or token classes. ✓

**Placeholder scan:** none — every step has full file content or an exact command.

**Type consistency:** `variant?: "light" | "dark"` (Task 1) used as `variant="dark"` (Task 3). `pin?: boolean` (Task 2) used as `pin` (Task 3). `from="right"`, `delay` are existing `Reveal` props. `CircleImageRing` props (`src/alt/size/ringOffset/className`) and `DrillBitPin` props (`size/className`) match their definitions. ✓
