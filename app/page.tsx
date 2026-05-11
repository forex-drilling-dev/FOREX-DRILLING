import Image from "next/image";
import Link from "next/link";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";
import {
  NavyBlob,
  YellowBadge,
  DrillBitPin,
  YellowWave,
  CircleImageRing,
  BgGreyShape,
  CtaBanner,
  TaglineAnimated,
  HomeScrollSnap,
  SectionLink,
} from "@/components/v3";

// ─────────────────────────────────────────────────────────────────────────────
// HERO — editorial poster composition (1200×850 fixed canvas on lg+).
// Mobile/tablet: separate stacked layout. Drill bit pins are positioned so
// they NEVER overlap the navy panel text — they sit clearly above the image
// portion of the card. DotsTrio removed (it was a palette indicator on the
// agency mockup, not a real site element).
// ─────────────────────────────────────────────────────────────────────────────

// Hero is FULL-BLEED responsive on lg+. Elements anchor to viewport edges
// using clamp() and right/left from the section borders directly. The
// composition stays balanced across 1024px → 2560px viewports.
function HeroPoster() {
  return (
    <section
      aria-label="Hero"
      className="home-snap relative hidden h-screen min-h-[780px] w-full overflow-hidden bg-white pt-[var(--spacing-nav)] lg:block"
    >
      {/* Watermarks anchored to VIEWPORT right edge */}
      <BgGreyShape className="top-[120px] right-[-50px]" />
      <YellowWave className="bottom-[-50px] right-[-50px] z-[1]" />

      {/* Decorative thin circle outline (top-left of composition) */}
      <div
        aria-hidden
        className="absolute top-[40px] h-[200px] w-[200px] rounded-full border border-border"
        style={{ left: "clamp(280px, 28vw, 460px)" }}
      />

      {/* Directional indicator — top-right, mono caps. Singapore HQ → Asia-Pacific
          ops, both factual from brief. Right-aligned with the image card edge
          and the service summary block below. */}
      <div
        className="absolute top-[160px] z-[3] flex flex-col items-end gap-1.5"
        style={{ right: "clamp(40px, 5vw, 120px)" }}
      >
        <span
          className="font-mono uppercase text-deep-navy/55"
          style={{ fontSize: "10px", letterSpacing: "0.22em" }}
        >
          Singapore
        </span>
        <svg
          width="34"
          height="14"
          viewBox="0 0 34 14"
          fill="none"
          aria-hidden
          className="text-amber"
        >
          <path d="M0 7 H30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2.5" />
          <path d="M28 2 L33 7 L28 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span
          className="font-mono uppercase text-deep-navy/80 font-bold"
          style={{ fontSize: "11px", letterSpacing: "0.22em" }}
        >
          Asia-Pacific
        </span>
      </div>

      {/* Navy blob — anchored to viewport LEFT, fluid width.
          Top:140 leaves clear vertical space below the fixed nav (h:80) so
          the badge that overlaps it (at top:110) can sit in front of it. */}
      <NavyBlob
        className="absolute top-[140px] left-0 h-[440px] z-[2]"
        style={{
          width: "clamp(560px, 46vw, 720px)",
          paddingLeft: "clamp(40px, 4vw, 80px)",
          paddingRight: "clamp(40px, 4vw, 60px)",
          paddingTop: "100px",
          paddingBottom: "40px",
        }}
      >
        {/* Visual title only — the semantic <h1> lives once at page level
            (see HomePage). Both responsive variants use aria-hidden to avoid
            duplicate headings in the static DOM. */}
        <p
          aria-hidden="true"
          className="font-display font-extrabold uppercase leading-[1.05] text-on-navy text-balance"
          style={{ fontSize: "clamp(30px, 2.6vw, 44px)", letterSpacing: "-0.005em" }}
        >
          Built on Drilling.
          <br />
          <span className="text-amber">Driven by Delivery.</span>
        </p>
        <p
          className="mt-6 font-sans font-normal text-on-navy-muted"
          style={{ fontSize: "15px", lineHeight: "1.7", maxWidth: "420px" }}
        >
          Delivering safe, reliable and high-quality drilling services across
          the Asia-Pacific region.
        </p>

        {/* Scope strip — verbatim brief categories */}
        <div
          className="mt-7 border-t border-amber/30 pt-4"
          style={{ maxWidth: "400px" }}
        >
          <p
            className="font-mono uppercase text-on-navy-muted"
            // Bumped from 10.5px so the scope strip stays legible on mobile
            // (audit found 10.5px too small under iOS dynamic type at 375px).
            style={{ fontSize: "11.5px", letterSpacing: "0.22em" }}
          >
            <span className="text-amber">Mining</span>
            <span className="mx-2 opacity-50">·</span>
            <span className="text-amber">Exploration</span>
            <span className="mx-2 opacity-50">·</span>
            <span className="text-amber">Civil</span>
            <span className="mx-2 opacity-50">·</span>
            <span className="text-amber">Groundwater</span>
          </p>
        </div>
      </NavyBlob>

      {/* Yellow badge — floats above the navy blob top edge,
          clear of the fixed nav (h:80) — top:110 leaves a 30px gap below it. */}
      <div
        className="absolute top-[110px] z-[3]"
        style={{ left: "clamp(40px, 4vw, 80px)" }}
      >
        <YellowBadge>FOREX</YellowBadge>
      </div>

      {/* Service summary — right side, below the directional indicator and
          above the image card. Right-aligned with the image card edge. */}
      <div
        className="absolute top-[270px] z-[2] max-w-[300px] text-right"
        style={{ right: "clamp(40px, 5vw, 120px)" }}
      >
        <p
          className="font-display font-extrabold leading-[1.3] text-deep-navy"
          style={{ fontSize: "18px" }}
        >
          Drilling, instrumentation, downhole &amp; data.
        </p>
        <p
          className="mt-2 font-sans"
          style={{
            fontSize: "14px",
            color: "var(--color-surface)",
            opacity: 0.85,
            lineHeight: "1.6",
          }}
        >
          A comprehensive range of services across the Asia-Pacific.
        </p>
      </div>

      {/* Rectangular image card — anchored to viewport RIGHT, fluid width.
          Sized to fill the vertical gap between the upper-right service note
          and the bottom of the hero so the right column doesn't feel empty. */}
      <div
        className="absolute bottom-[80px] z-[5]"
        style={{
          right: "clamp(40px, 5vw, 120px)",
          width: "clamp(560px, 46vw, 760px)",
          height: "clamp(320px, 36vh, 440px)",
        }}
      >
        {/* Offset navy outline */}
        <div
          aria-hidden
          className="absolute -top-5 -left-5 h-[calc(100%+40px)] w-[calc(100%+40px)] rounded-[20px] border border-surface/30 z-[1]"
        />
        {/* Drill pins — anchored over the IMAGE portion only (left 56%),
            clearly away from the navy text panel on the right (44%) */}
        <div className="absolute -top-[60px] left-[16%] z-[6] flex gap-4">
          <DrillBitPin size={42} className="rotate-180" />
          <DrillBitPin size={42} />
        </div>
        {/* Image + overlay */}
        <div
          className="relative h-full w-full overflow-hidden rounded-xl z-[2]"
          style={{ boxShadow: "var(--shadow-image)" }}
        >
          <Image
            src={optimizedSrc("/images/hero-night-site.jpg")}
            alt="Multi-rig night drilling operation in Papua New Guinea"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={blurPlaceholder("/images/hero-night-site.jpg")}
          />
        </div>
      </div>

      {/* Circle operator photo — anchored bottom-left.
          bottom:60 keeps the circle clearly BELOW the navy blob's body
          paragraph (the blob's body text wraps to 3-4 lines and was being
          covered when the circle sat higher). */}
      <div
        className="absolute bottom-[60px] z-[5]"
        style={{ left: "clamp(60px, 7vw, 160px)" }}
      >
        <CircleImageRing
          src="/images/rig-vertical-operator.jpg"
          alt="Forex Drilling rig operator working a vertical drill"
          size={260}
          ringOffset={18}
          priority
        />
      </div>
    </section>
  );
}

function HeroStack() {
  return (
    <section
      aria-label="Hero"
      className="relative flex w-full flex-col bg-white pt-[var(--spacing-nav)] lg:hidden"
    >
      {/* Banner photo — full width, no rounded card, full-bleed.
          The drill pins are removed on mobile (they were decorative for the
          desktop card-on-card composition and add visual clutter at small
          sizes). */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={optimizedSrc("/images/hero-night-site.jpg")}
          alt="Multi-rig night drilling operation in Papua New Guinea"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={blurPlaceholder("/images/hero-night-site.jpg")}
        />
        {/* Soft navy fade so the eyebrow tag below reads cleanly. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-deep-navy/55 to-transparent"
        />
        <div className="absolute bottom-3 left-4">
          <YellowBadge size="sm">FOREX</YellowBadge>
        </div>
      </div>

      {/* Navy panel — full-bleed, dense. No left margin, no oversized
          padding. Title scales 22→28px, body tight. */}
      <div className="relative bg-deep-navy px-5 py-7 sm:px-6 sm:py-8">
        <p
          aria-hidden="true"
          className="font-display font-extrabold uppercase leading-[1.05] text-on-navy text-balance"
          style={{ fontSize: "clamp(22px, 6.4vw, 28px)", letterSpacing: "0.3px" }}
        >
          Built on Drilling.
          <br />
          <span className="text-amber">Driven by Delivery.</span>
        </p>
        <p
          className="mt-3 font-sans font-normal text-on-navy-muted"
          style={{ fontSize: "14px", lineHeight: "1.6" }}
        >
          Delivering safe, reliable and high-quality drilling services across
          the Asia-Pacific region.
        </p>

        {/* Scope strip — flex-wrap so it never overflows */}
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-amber/30 pt-3.5">
          <span className="font-mono uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Mining</span>
          <span className="font-mono uppercase text-on-navy-muted opacity-50" style={{ fontSize: "11px" }}>·</span>
          <span className="font-mono uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Exploration</span>
          <span className="font-mono uppercase text-on-navy-muted opacity-50" style={{ fontSize: "11px" }}>·</span>
          <span className="font-mono uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Civil</span>
          <span className="font-mono uppercase text-on-navy-muted opacity-50" style={{ fontSize: "11px" }}>·</span>
          <span className="font-mono uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Groundwater</span>
        </div>
      </div>

      {/* Soft navy → white transition. Without it the navy panel ends
          on a hard horizontal seam against the next white section,
          which reads as a CSS bug on mobile. 48px is enough to feel
          like a fade, short enough to keep the hero compact. */}
      <div
        aria-hidden
        className="h-12 w-full bg-gradient-to-b from-deep-navy to-white"
      />
    </section>
  );
}

// ─── TAGLINE STRIP — full-viewport editorial moment with mask-reveal anim ───
// Desktop only. On mobile it rendered as a near-empty 100vh white screen
// because the animated text is small relative to viewport — the visitor
// scrolled through dead space. The mobile journey now hits MobileHighlights
// directly after the hero (denser, more useful content).

function TaglineStrip() {
  return (
    <section className="home-snap relative hidden min-h-screen flex-col items-center justify-center gap-12 bg-white px-6 py-24 md:px-14 lg:flex">
      <TaglineAnimated />
      <SectionLink href="/about" label="About" />
    </section>
  );
}

// ─── MOBILE HIGHLIGHTS ──────────────────────────────────────────────────────
// Mobile-only content block that fills the gap between hero and the bottom
// CTA. Gives the visitor concrete value at-a-glance: 4 service categories,
// where the company operates, and a path to /about. Hidden on lg+ — the
// editorial TaglineStrip + scroll-snap experience belongs on desktop.

const SERVICE_CATEGORIES = [
  {
    num: "01",
    title: "Drilling",
    summary: "Diamond, sonic, directional, RC and rotary methods.",
    href: "/services#drilling",
  },
  {
    num: "02",
    title: "Instrumentation",
    summary: "VWPs, inclinometers, monitoring systems installed and commissioned.",
    href: "/services#instrumentation",
  },
  {
    num: "03",
    title: "Downhole",
    summary: "Geophysical logging, borehole surveying, deviation control.",
    href: "/services#downhole",
  },
  {
    num: "04",
    title: "Data & Digital",
    summary: "Krux platform and MWD for accurate, structured field data.",
    href: "/services#data",
  },
] as const;

function MobileHighlights() {
  return (
    <section
      aria-label="Highlights"
      // No padding-top — the 48px navy→white fade above already provides
      // the breathing room. An extra pt-10 here read as a "blank line"
      // gap between the hero and the first content card.
      className="relative flex flex-col gap-10 bg-white px-5 pb-12 lg:hidden"
    >
      {/* Services — 2×2 grid of compact category cards. */}
      <div className="flex flex-col gap-4">
        <p
          className="font-display font-bold uppercase"
          style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--color-amber-dim)" }}
        >
          01 — What we deliver
        </p>
        <div className="grid grid-cols-2 gap-px bg-border">
          {SERVICE_CATEGORIES.map((c) => (
            <Link
              key={c.num}
              href={c.href}
              className="group relative flex h-full flex-col gap-2 bg-white p-4 transition-colors duration-200 hover:bg-deep"
            >
              <span
                className="font-display font-black"
                style={{ fontSize: "22px", lineHeight: "1", color: "var(--color-amber-dim)" }}
              >
                {c.num}
              </span>
              <span
                className="font-display font-extrabold uppercase text-deep-navy"
                style={{ fontSize: "14px", letterSpacing: "0.04em", lineHeight: "1.15" }}
              >
                {c.title}
              </span>
              <span
                className="font-sans text-muted"
                style={{ fontSize: "12.5px", lineHeight: "1.45" }}
              >
                {c.summary}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Operations — compact card with the Singapore → Asia-Pacific cue. */}
      <Link
        href="/contact"
        className="group flex flex-col gap-3 rounded-2xl bg-deep-navy px-5 py-6 transition-colors hover:bg-[color:var(--color-surface)]"
        aria-label="Where we operate — open the contact page with the operations map"
      >
        <p
          className="font-display font-bold uppercase text-amber"
          style={{ fontSize: "11px", letterSpacing: "0.22em" }}
        >
          02 — Where we operate
        </p>
        <div className="flex items-center gap-3">
          <span
            className="font-mono uppercase text-on-navy"
            style={{ fontSize: "13px", letterSpacing: "0.18em" }}
          >
            Singapore
          </span>
          <svg
            width="32"
            height="12"
            viewBox="0 0 34 14"
            fill="none"
            aria-hidden
            className="text-amber transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M0 7 H30" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2.5" />
            <path d="M28 2 L33 7 L28 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span
            className="font-mono uppercase font-bold text-on-navy"
            style={{ fontSize: "13px", letterSpacing: "0.18em" }}
          >
            Asia-Pacific
          </span>
        </div>
        <p
          className="font-sans text-on-navy-muted"
          style={{ fontSize: "13.5px", lineHeight: "1.6" }}
        >
          Singapore headquarters, field operations in Papua New Guinea, and
          mobile crews across the region.
        </p>
        <span
          className="mt-1 inline-flex items-center gap-2 font-display font-bold uppercase text-amber"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          See the map
          <svg width="12" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>

      {/* Quick path to /about for visitors who want the story before the CTA. */}
      <div className="flex justify-center pt-2">
        <SectionLink href="/about" label="About" />
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HomeScrollSnap />
      {/* Single canonical h1 — visual hero blobs (HeroPoster + HeroStack) use
          aria-hidden divs so the static DOM has exactly one <h1>. */}
      <h1 className="sr-only">Built on Drilling. Driven by Delivery.</h1>
      <HeroPoster />
      <HeroStack />
      <MobileHighlights />
      <TaglineStrip />
      <CtaBanner
        headline="Send us your scope."
        body="We&rsquo;ll come back with a method mix, a mobilisation timeline, and a single point of contact. No middle layers."
        cta="Start a conversation"
        href="/contact"
      />
    </>
  );
}
