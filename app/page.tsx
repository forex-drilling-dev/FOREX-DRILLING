import Image from "next/image";
import Link from "next/link";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";
import { cn } from "@/lib/utils";
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
  Reveal,
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
      aria-labelledby="hero-title-desktop"
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
        <h1
          id="hero-title-desktop"
          className="font-display font-extrabold uppercase leading-[1.05] text-on-navy text-balance"
          style={{ fontSize: "clamp(30px, 2.6vw, 44px)", letterSpacing: "-0.005em" }}
        >
          Built on Drilling.
          <br />
          <span className="text-amber">Driven by Delivery.</span>
        </h1>
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
            style={{ fontSize: "10.5px", letterSpacing: "0.22em" }}
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
      aria-labelledby="hero-title-mobile"
      className="home-snap relative mx-auto flex min-h-screen max-w-[460px] flex-col items-center justify-center gap-7 px-5 pt-[calc(var(--spacing-nav)+24px)] pb-16 lg:hidden"
    >
      <NavyBlob
        className="h-auto w-full"
        style={{ padding: "36px 28px 36px 28px" }}
      >
        <h1
          id="hero-title-mobile"
          className="font-display font-extrabold uppercase leading-[0.95] tracking-[-0.005em] text-on-navy text-balance"
          style={{ fontSize: "clamp(30px, 8.5vw, 40px)" }}
        >
          Built on Drilling.
          <br />
          <span className="text-amber">Driven by Delivery.</span>
        </h1>
        <p
          className="mt-5 font-sans font-normal text-on-navy-muted"
          style={{ fontSize: "15px", lineHeight: "1.65" }}
        >
          Delivering safe, reliable and high-quality drilling services across
          the Asia-Pacific region.
        </p>

        {/* Scope strip — verbatim brief categories */}
        <div className="mt-5 border-t border-amber/30 pt-3.5">
          <p
            className="font-mono uppercase text-on-navy-muted flex flex-wrap gap-x-2 gap-y-1"
            style={{ fontSize: "10px", letterSpacing: "0.18em" }}
          >
            <span className="text-amber">Mining</span>
            <span className="opacity-50">·</span>
            <span className="text-amber">Exploration</span>
            <span className="opacity-50">·</span>
            <span className="text-amber">Civil</span>
            <span className="opacity-50">·</span>
            <span className="text-amber">Groundwater</span>
          </p>
        </div>
      </NavyBlob>

      {/* Multi-rig site image — featured, full width */}
      <div className="relative w-full mt-2">
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-[6] flex gap-3">
          <DrillBitPin size={32} className="rotate-180" />
          <DrillBitPin size={32} />
        </div>
        <div
          className="relative aspect-[2.3/1] w-full overflow-hidden rounded-xl"
          style={{ boxShadow: "var(--shadow-image)" }}
        >
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
        </div>
      </div>
    </section>
  );
}

// ─── TAGLINE STRIP — full-viewport editorial moment with mask-reveal anim ───

function TaglineStrip() {
  return (
    <section className="home-snap relative flex min-h-screen items-center justify-center bg-white px-6 py-24 md:px-14">
      <TaglineAnimated />
    </section>
  );
}

// ─── EXPLORE — quick navigation grid into every inner page ─────────────────
// Six section cards (About / Services / Fleet / HSE / Quality / Projects)
// each closing on a CTA arrow link. Lets the homepage act as a hub for the
// rest of the site without dumping detailed copy here.

const exploreCards = [
  {
    label: "About",
    title: "Specialist drilling.",
    body: "Singapore HQ, Asia-Pacific operations. Mining, exploration, civil and groundwater programs.",
    href: "/about",
  },
  {
    label: "Services",
    title: "Drilling & associated services.",
    body: "Diamond, sonic, RC, directional and horizontal drilling. Instrumentation, downhole, and Krux + MWD data acquisition.",
    href: "/services",
  },
  {
    label: "Fleet",
    title: "Modern, versatile equipment.",
    body: "Multi-method scalable rigs, dual-head sonic / diamond capability, strong maintenance culture.",
    href: "/fleet",
  },
  {
    label: "HSE",
    title: "Safety at the core.",
    body: "Structured systems: SOP, JSEA, PTW, Take 5, toolbox meetings, full PPE compliance.",
    href: "/hse",
  },
  {
    label: "Quality",
    title: "Quality & performance.",
    body: "Quality Management Plans, accurate logging, core recovery optimisation, continuous monitoring.",
    href: "/quality",
  },
  {
    label: "Projects",
    title: "Project delivery approach.",
    body: "Drilling is critical to project success — alignment, mobilisation, structured reporting, proactive issue resolution.",
    href: "/projects",
  },
] as const;

function ExploreSection() {
  return (
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-12 px-6 md:gap-16 md:px-14">
        <Reveal className="flex max-w-[820px] flex-col gap-4">
          <p
            className="font-display font-bold uppercase text-amber"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            Explore
          </p>
          <h2
            className="font-display font-extrabold uppercase leading-[1.05] text-deep-navy text-balance"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.005em" }}
          >
            What we do, how we deliver.
          </h2>
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {exploreCards.map((card) => (
            <li key={card.href}>
              <ExploreCard {...card} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface ExploreCardProps {
  label: string;
  title: string;
  body: string;
  href: string;
}

function ExploreCard({ label, title, body, href }: ExploreCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col justify-between gap-8 rounded-xl border border-border bg-white p-7",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-lg",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber",
      )}
    >
      <div className="flex flex-col gap-4">
        <p
          className="font-display font-bold uppercase text-amber"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          {label}
        </p>
        <h3
          className="font-display font-extrabold uppercase leading-[1.1] text-deep-navy"
          style={{ fontSize: "22px", letterSpacing: "-0.005em" }}
        >
          {title}
        </h3>
        <p
          className="font-sans text-muted"
          style={{ fontSize: "14px", lineHeight: "1.6" }}
        >
          {body}
        </p>
      </div>

      <span
        className="flex items-center gap-2 font-display font-bold uppercase text-deep-navy transition-colors group-hover:text-amber"
        style={{ fontSize: "11px", letterSpacing: "0.16em" }}
      >
        <span>Read more</span>
        <svg
          width="18"
          height="12"
          viewBox="0 0 18 12"
          fill="none"
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path
            d="M1 6h15m-5-5 5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HomeScrollSnap />
      <HeroPoster />
      <HeroStack />
      <TaglineStrip />
      <ExploreSection />
      <CtaBanner
        headline="Send us your scope."
        body="We&rsquo;ll come back with a method mix, a mobilisation timeline, and a single point of contact. No middle layers."
        cta="Start a conversation"
        href="/contact"
      />
    </>
  );
}
