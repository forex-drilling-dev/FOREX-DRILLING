import Image from "next/image";
import Link from "next/link";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";
import {
  NavyBlob,
  YellowBadge,
  DrillBitPin,
  YellowWave,
  CircleImageRing,
  OverlayImageCard,
  BgGreyShape,
  SectionLabel,
  SectionDivider,
  SectionHeading,
  PillarCard,
  QuoteBlock,
  ProtocolGrid,
  CtaBanner,
  PrimaryButton,
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
      className="relative hidden h-screen min-h-[780px] w-full overflow-hidden bg-white pt-[var(--spacing-nav)] lg:block"
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
          style={{ fontSize: "clamp(28px, 2.2vw, 38px)", letterSpacing: "0.5px" }}
        >
          Built to deliver
          <br />
          <span className="text-amber">on challenging drilling programs?</span>
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

      {/* Rectangular image card — anchored to viewport RIGHT, fluid width */}
      <div
        className="absolute bottom-[100px] z-[5] h-[260px]"
        style={{
          right: "clamp(40px, 5vw, 120px)",
          width: "clamp(520px, 42vw, 680px)",
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
          <DrillBitPin size={42} />
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
      className="relative mx-auto flex max-w-[460px] flex-col items-center gap-7 px-5 pt-[calc(var(--spacing-nav)+24px)] pb-16 lg:hidden"
    >
      <NavyBlob
        className="h-auto w-full"
        style={{ padding: "36px 28px 36px 28px" }}
      >
        <h1
          id="hero-title-mobile"
          className="font-display font-extrabold uppercase leading-[0.95] tracking-[-0.005em] text-on-navy text-balance"
          style={{ fontSize: "clamp(30px, 8.5vw, 36px)" }}
        >
          Built to deliver
          <br />
          <span className="text-amber">on challenging drilling programs?</span>
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
          <DrillBitPin size={32} />
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

// ─── INTRO — three-paragraph mission statement ──────────────────────────────

function IntroSection() {
  return (
    <section className="relative bg-white py-20 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
        <SectionDivider number="01" label="Mission" variant="light" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeading
              line1="Field-proven solutions"
              line2="in demanding environments."
            />
          </Reveal>
          <div className="flex flex-col gap-5 md:col-span-7 md:gap-6">
            <p
              className="font-sans"
              style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.65", color: "var(--color-fore)" }}
            >
              Based in Singapore and operating across the Asia-Pacific region, Forex
              Drilling provides specialised drilling services and solutions
              supporting major mining operations, greenfield exploration projects,
              civil infrastructure works, as well as environmental and groundwater
              programs.
            </p>
            <p
              className="font-sans"
              style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.65", color: "var(--color-muted)" }}
            >
              We operate in demanding environments where accuracy, safety and
              reliability are critical, and where resilience in execution makes
              the difference. Our focus is on delivering high-quality data,
              maintaining strict operational standards, and supporting our
              clients&rsquo; technical and operational decision-making.
            </p>
            <p
              className="border-l-2 border-amber pl-5 font-sans font-medium"
              style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.55", color: "var(--color-deep-navy)" }}
            >
              We take ownership of our work, solve problems early, and deliver
              what we commit to.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES PREVIEW — 4 categories ─────────────────────────────────────────

const serviceCategories = [
  {
    number: "01",
    title: "Drilling Services",
    summary: "Diamond, sonic, directional, RC, rotary, SPT, push tube, packer testing, downhole surveying.",
    href: "/services#drilling",
  },
  {
    number: "02",
    title: "Instrumentation Installation",
    summary: "Vibrating Wire Piezometers, inclinometers, standpipe piezometers, installed and commissioned.",
    href: "/services#instrumentation",
  },
  {
    number: "03",
    title: "Downhole Services",
    summary: "Geophysical logging, borehole surveying and deviation control, integrity verification.",
    href: "/services#downhole",
  },
  {
    number: "04",
    title: "Data Acquisition & Digital",
    summary: "Krux platforms for data capture and reporting. MWD systems for downhole telemetry.",
    href: "/services#data",
  },
] as const;

function ServicesPreview() {
  return (
    <section className="relative bg-deep py-20 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
        <SectionDivider number="03" label="Capabilities" variant="dark" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <Reveal className="max-w-[600px]">
            <SectionHeading
              line1="A full spectrum"
              line2="of specialist services."
            />
          </Reveal>
          <p
            className="font-sans max-w-[420px]"
            style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--color-muted)" }}
          >
            From diamond and sonic drilling to instrumentation, downhole services,
            and digital data systems chosen to deliver reliable, high-quality
            outcomes in demanding environments.
          </p>
        </div>

        <div className="grid gap-px bg-border md:grid-cols-2">
          {serviceCategories.map((cat) => (
            <Link
              key={cat.number}
              href={cat.href}
              className="group relative flex flex-col gap-5 bg-white p-9 transition-all duration-300 hover:bg-amber"
            >
              <p
                className="font-display font-black"
                style={{
                  fontSize: "44px",
                  lineHeight: "1",
                  color: "var(--color-amber)",
                }}
              >
                <span className="transition-colors duration-300 group-hover:text-deep-navy">
                  {cat.number}
                </span>
              </p>
              <h3
                className="font-display font-extrabold uppercase text-deep-navy transition-colors duration-300 group-hover:text-deep-navy"
                style={{ fontSize: "22px", letterSpacing: "0.04em" }}
              >
                {cat.title}
              </h3>
              <p
                className="font-sans max-w-[44ch] transition-colors duration-300 group-hover:text-deep-navy"
                style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
              >
                {cat.summary}
              </p>
              <span
                className="mt-3 inline-flex items-center gap-2 font-display font-bold uppercase text-amber transition-all duration-300 group-hover:text-deep-navy group-hover:gap-3"
                style={{ fontSize: "12px", letterSpacing: "0.12em" }}
              >
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <PrimaryButton href="/services" variant="navy">
            Explore all services
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT TEASER — pillars + portrait ───────────────────────────────────────

function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      {/* Subtle background watermark — only on lg+, anchored bottom-left, bleeds */}
      <div
        aria-hidden
        className="pointer-events-none absolute hidden lg:block"
        style={{
          bottom: "-80px",
          left: "-100px",
          width: "320px",
          height: "320px",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          background: "var(--color-amber)",
          opacity: 0.08,
        }}
      />
      <div className="relative mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
        <SectionDivider number="02" label="About Us" variant="light" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-20">
          {/* Left — image with floating badge + index */}
          <div className="flex flex-col gap-8 md:col-span-5">
            <div className="relative mx-auto w-full max-w-[220px] md:max-w-none md:w-fit">
              <CircleImageRing
                src="/images/rig-aerial.jpg"
                alt="Drilling site aerial view"
                size={380}
                ringOffset={24}
              />
            </div>
          </div>

          {/* Right — heading + body + 3 pillars */}
          <div className="flex flex-col gap-8 md:col-span-7 md:gap-10">
          <Reveal>
            <SectionHeading
              line1="Specialist drilling."
              line2="Demanding environments."
            />
          </Reveal>
          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Forex Drilling is a specialist drilling contractor supporting mining,
            exploration, and civil projects with a broad range of drilling
            services. Our team combines strong operational experience with a
            clear understanding of geotechnical, hydrogeological, grade control,
            structural geology, resource geology, and exploration requirements.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <PillarCard number="01" title="Versatility">
              Crews and equipment capable of covering multiple scopes. This reduces
              the need for multiple rigs on site.
            </PillarCard>
            <PillarCard number="02" title="Resilience">
              Performance under pressure, adapting to changing ground conditions
              and continuing safely and reliably.
            </PillarCard>
            <PillarCard number="03" title="Reliability">
              Structured preventative maintenance, regular inspections, and
              disciplined field practice deliver consistent output.
            </PillarCard>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <PrimaryButton href="/about" variant="ghost-on-light">
              Read our story
            </PrimaryButton>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

// ─── FLEET TEASER — image card with overlay ─────────────────────────────────

function FleetTeaser() {
  return (
    <section className="relative bg-deep py-20 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
        <SectionDivider number="04" label="Fleet & Capabilities" variant="dark" />
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-20">
        <Reveal className="flex flex-col gap-6 md:col-span-5">
          <SectionHeading
            line1="Modern equipment."
            line2="Reliable performance."
          />
          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Forex Drilling operates modern, versatile drilling equipment designed
            to perform reliably in demanding environments, supported by experienced
            crews, robust logistics, and a strong maintenance culture.
          </p>
          <ul className="flex flex-col gap-3 mt-2">
            {[
              "Scalable multi-rig deployment",
              "Dual-head sonic / diamond capability",
              "Active mine pit & remote greenfield ops",
              "Rod and casing handling systems",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex shrink-0 pt-0.5" aria-hidden>
                  <DrillBitPin size={20} />
                </span>
                <span
                  className="font-sans font-medium text-deep-navy"
                  style={{ fontSize: "15px", lineHeight: "1.55" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <PrimaryButton href="/fleet" variant="ghost-on-light" className="mt-4 self-start">
            Explore the fleet
          </PrimaryButton>
        </Reveal>
        <div className="md:col-span-7 md:pt-6">
          <OverlayImageCard
            src="/images/rig-horizontal.jpg"
            alt="Modern dual-head drilling rig"
            title="Versatile, multi-method rigs"
            body={
              <>
                Designed to deliver multiple scopes from a single mobilisation,
                including dual-head sonic / diamond capability, in active mine pits
                and remote greenfield locations.
              </>
            }
          />
        </div>
        </div>
      </div>
    </section>
  );
}

// ─── HSE STATEMENT — pull quote + protocol grid ─────────────────────────────

const hseProtocols = [
  { code: "SOP", label: "Standard Operating Procedures" },
  { code: "JSA", label: "Job Safety Analysis" },
  { code: "PTW", label: "Permit to Work" },
  { code: "T5", label: "Take 5 Risk Assessment" },
  { code: "TBX", label: "Toolbox Meetings" },
  { code: "PPE", label: "Full PPE Compliance" },
];

function HseStatement() {
  return (
    <section className="relative bg-white py-20 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
        <SectionDivider number="05" label="Health, Safety & Environment" variant="light" />
        <Reveal className="max-w-[1000px]">
          <QuoteBlock
            line1="Safety is at the core"
            line2="of our operations."
          >
            Forex Drilling operates in strict compliance with client safety
            standards, site procedures, and regulatory requirements. All
            activities are conducted under structured safety management systems.
          </QuoteBlock>
        </Reveal>
        <ProtocolGrid items={hseProtocols} />
        <PrimaryButton href="/hse" variant="ghost-on-light" className="self-start">
          Our HSE approach
        </PrimaryButton>
      </div>
    </section>
  );
}

// ─── APPROACH — verbatim Project Delivery model from client brief ──────────

const deliveryFocus = [
  "Alignment with client technical and operational objectives",
  "Efficient mobilisation and setup",
  "Reliable day-to-day operations and structured reporting",
  "Close coordination with client technical and operational teams",
  "Transparent communication and proactive issue resolution",
];

function ApproachSection() {
  return (
    <section className="relative bg-deep py-20 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
        <SectionDivider number="06" label="Project Delivery Approach" variant="dark" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
        <Reveal className="flex flex-col gap-5 md:col-span-5">
          <SectionHeading
            line1="Drilling is critical"
            line2="to project success."
          />
          <p
            className="mt-2 font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            We maintain a hands-on, solution-driven approach throughout each
            project. We engage early, understand project challenges in detail,
            and remain actively involved to ensure issues are addressed before
            they impact delivery.
          </p>
        </Reveal>

        <div className="flex flex-col gap-6 md:col-span-7">
          <p
            className="font-sans font-medium uppercase text-amber"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            Our delivery model focuses on
          </p>
          <ul className="flex flex-col gap-3">
            {deliveryFocus.map((item, i) => (
              <Reveal key={item} delay={i * 80}>
                <li className="flex items-start gap-4 border-t border-border pt-4">
                  <span className="flex shrink-0 pt-0.5" aria-hidden>
                    <DrillBitPin size={20} />
                  </span>
                  <span
                    className="font-sans font-medium text-deep-navy"
                    style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.55" }}
                  >
                    {item}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <p
            className="mt-4 font-sans"
            style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Where required, we go beyond drilling execution to support broader
            project needs. We contribute to planning, problem-solving, and
            overall project performance.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroPoster />
      <HeroStack />
      <IntroSection />
      <AboutTeaser />
      <ServicesPreview />
      <FleetTeaser />
      <HseStatement />
      <ApproachSection />
      <CtaBanner
        headline="Send us your scope."
        body="We&rsquo;ll come back with a method mix, a mobilisation timeline, and a single point of contact. No middle layers."
        cta="Start a conversation"
        href="/contact"
      />
    </>
  );
}
