import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/services";
import {
  NavyBlob,
  YellowBadge,
  SpeechBubble,
  DrillBitPin,
  YellowWave,
  Crosshair,
  CircleImageRing,
  OverlayImageCard,
  BgGreyShape,
  SectionLabel,
  SectionHeading,
  PillarCard,
  ServiceListGroup,
  QuoteBlock,
  ProtocolGrid,
  CtaBanner,
  StatStrip,
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
      className="relative hidden h-[850px] w-full overflow-hidden bg-white pt-[var(--spacing-nav)] lg:block"
    >
      {/* Watermarks anchored to VIEWPORT right edge */}
      <BgGreyShape className="top-[80px] right-[-50px]" />
      <YellowWave className="bottom-[-50px] right-[-50px] z-[1]" />

      {/* Decorative thin circle outline (top-left of composition) */}
      <div
        aria-hidden
        className="absolute top-[-50px] h-[200px] w-[200px] rounded-full border border-border"
        style={{ left: "clamp(280px, 28vw, 460px)" }}
      />

      {/* Crosshair coords — top-right of viewport */}
      <div
        className="absolute top-[120px]"
        style={{ right: "clamp(140px, 16vw, 320px)" }}
      >
        <Crosshair size={36} coords="06°S · 145°E" />
      </div>

      {/* Navy blob — anchored to viewport LEFT, fluid width */}
      <NavyBlob
        className="absolute top-[100px] left-0 h-[440px] z-[2]"
        style={{
          width: "clamp(560px, 46vw, 720px)",
          paddingLeft: "clamp(40px, 4vw, 80px)",
          paddingRight: "clamp(40px, 4vw, 60px)",
          paddingTop: "100px",
          paddingBottom: "40px",
        }}
      >
        <p
          id="hero-title-desktop"
          className="font-display font-bold uppercase leading-[1.05] text-on-navy"
          style={{ fontSize: "clamp(28px, 2.4vw, 38px)", letterSpacing: "0.5px" }}
        >
          Built to deliver.
        </p>
        <p
          className="font-display font-bold uppercase leading-[1.05] text-amber"
          style={{
            fontSize: "clamp(28px, 2.4vw, 38px)",
            letterSpacing: "0.5px",
            marginBottom: "30px",
          }}
        >
          On challenging<br />drilling programs?
        </p>
        <p
          className="font-sans font-normal text-on-navy-muted"
          style={{ fontSize: "14px", lineHeight: "1.7", maxWidth: "420px" }}
        >
          Delivering safe, reliable and high-quality drilling services across
          the Asia-Pacific region.
        </p>
      </NavyBlob>

      {/* Yellow badge — floats over blob top-left */}
      <div
        className="absolute top-[70px] z-[3]"
        style={{ left: "clamp(40px, 4vw, 80px)" }}
      >
        <YellowBadge>FOREX</YellowBadge>
      </div>

      {/* Speech bubble — overlaps blob right edge */}
      <div
        className="absolute top-[180px] z-[4]"
        style={{ left: "clamp(440px, 36vw, 580px)" }}
      >
        <SpeechBubble label="METHODS" value="12+" />
      </div>

      {/* Center note */}
      <div
        className="absolute top-[340px] z-[2] max-w-[280px]"
        style={{ left: "clamp(620px, 50vw, 800px)" }}
      >
        <p
          className="font-display font-bold leading-[1.3] text-deep-navy"
          style={{ fontSize: "16px" }}
        >
          Drilling, instrumentation, downhole &amp; data.
        </p>
        <p
          className="font-sans"
          style={{
            fontSize: "14px",
            marginTop: "8px",
            color: "var(--color-surface)",
            opacity: 0.85,
            lineHeight: "1.55",
          }}
        >
          A full spectrum of specialist capabilities in one mobilisation.
        </p>
      </div>

      {/* Rectangular image card — anchored to viewport RIGHT, fluid width */}
      <div
        className="absolute bottom-[140px] z-[5] h-[260px]"
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
            src="/images/hero-night-site.jpg"
            alt="Multi-rig night drilling operation in Papua New Guinea"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-y-0 right-0 flex flex-col justify-center px-6"
            style={{ background: "rgba(17, 40, 78, 0.95)", width: "44%" }}
          >
            <p
              className="font-display font-bold uppercase leading-[1.4] text-amber"
              style={{ fontSize: "13px", marginBottom: "14px", letterSpacing: "0.04em" }}
            >
              Multi-rig site operations<br />— night &amp; day
            </p>
            <p
              className="font-sans font-normal text-on-navy-muted"
              style={{ fontSize: "11px", lineHeight: "1.55" }}
            >
              From greenfield exploration to active mine pits. Modern, versatile
              rigs deployed with experienced crews and reliable data capture.
            </p>
          </div>
        </div>
      </div>

      {/* Circle operator photo — anchored bottom-left, fluid offset */}
      <div
        className="absolute bottom-[140px] z-[5]"
        style={{ left: "clamp(60px, 7vw, 160px)" }}
      >
        <CircleImageRing
          src="/images/rig-vertical-operator.jpg"
          alt="Forex Drilling crew on site"
          size={280}
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
      className="relative mx-auto flex max-w-[640px] flex-col gap-12 px-5 pt-[calc(var(--spacing-nav)+24px)] pb-16 lg:hidden"
    >
      <YellowBadge className="self-start">FOREX</YellowBadge>

      <NavyBlob
        className="-mt-7 ml-3 h-auto w-full max-w-[580px]"
        style={{ padding: "60px 28px 50px 32px" }}
      >
        <p
          id="hero-title-mobile"
          className="font-display font-bold uppercase leading-[1.1] text-on-navy"
          style={{ fontSize: "26px", letterSpacing: "0.5px" }}
        >
          Built to deliver.
        </p>
        <p
          className="font-display font-bold uppercase leading-[1.1] text-amber"
          style={{ fontSize: "26px", letterSpacing: "0.5px", marginBottom: "20px" }}
        >
          On challenging drilling programs?
        </p>
        <p
          className="font-sans font-normal text-on-navy-muted"
          style={{ fontSize: "13px", lineHeight: "1.65" }}
        >
          Delivering safe, reliable and high-quality drilling services across
          the Asia-Pacific region.
        </p>
      </NavyBlob>

      <div className="flex justify-center">
        <SpeechBubble label="METHODS" value="12+" />
      </div>

      <div className="flex flex-col gap-2 px-2">
        <p
          className="font-display font-extrabold leading-[1.3] text-deep-navy"
          style={{ fontSize: "16px" }}
        >
          Drilling, instrumentation, downhole &amp; data.
        </p>
        <p
          className="font-sans"
          style={{ fontSize: "14px", color: "var(--color-surface)", opacity: 0.85 }}
        >
          A full spectrum of specialist capabilities in one mobilisation.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <CircleImageRing
          src="/images/rig-vertical-operator.jpg"
          alt="Forex Drilling crew on site"
          size={240}
          ringOffset={16}
          priority
        />
      </div>

      <div className="relative mt-4">
        <div className="absolute -top-12 left-12 z-[6] flex gap-4">
          <DrillBitPin size={42} />
          <DrillBitPin size={42} />
        </div>
        <div
          className="relative aspect-[2.3/1] w-full overflow-hidden rounded-xl"
          style={{ boxShadow: "var(--shadow-image)" }}
        >
          <Image
            src="/images/hero-night-site.jpg"
            alt="Multi-rig night drilling operation"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-y-0 right-0 flex w-2/5 flex-col justify-center px-5"
            style={{ background: "rgba(16, 33, 66, 0.95)" }}
          >
            <p
              className="font-display font-extrabold uppercase leading-[1.4] text-amber"
              style={{ fontSize: "12px", marginBottom: "10px", letterSpacing: "0.04em" }}
            >
              Multi-rig operations
            </p>
            <p
              className="font-sans font-normal text-on-navy-muted"
              style={{ fontSize: "10px", lineHeight: "1.55" }}
            >
              Modern, versatile rigs with experienced crews — across mining,
              exploration, and civil projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INTRO — three-paragraph mission statement ──────────────────────────────

function IntroSection() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-6 md:col-span-5">
          <SectionLabel number="01" label="Mission" />
          <SectionHeading
            line1="Field-proven solutions"
            line2="in demanding environments."
          />
        </Reveal>
        <div className="flex flex-col gap-6 md:col-span-7">
          <p
            className="font-sans"
            style={{ fontSize: "17px", lineHeight: "1.7", color: "var(--color-fore)" }}
          >
            Based in Singapore and operating across the Asia-Pacific region, Forex
            Drilling provides specialised drilling services and solutions
            supporting major mining operations, greenfield exploration projects,
            civil infrastructure works, as well as environmental and groundwater
            programs.
          </p>
          <p
            className="font-sans"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            We operate in demanding environments where accuracy, safety and
            reliability are critical — and where resilience in execution makes
            the difference. Our focus is on delivering high-quality data,
            maintaining strict operational standards, and supporting our
            clients&rsquo; technical and operational decision-making.
          </p>
          <p
            className="font-sans font-medium"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-deep-navy)" }}
          >
            We take ownership of our work, solve problems early, and deliver
            what we commit to.
          </p>
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
    summary: "Vibrating Wire Piezometers, inclinometers, standpipe piezometers — installed and commissioned.",
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
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <Reveal className="flex max-w-[600px] flex-col gap-5">
            <SectionLabel number="02" label="Capabilities" />
            <SectionHeading
              line1="A full spectrum"
              line2="of specialist services."
            />
          </Reveal>
          <p
            className="font-sans max-w-[420px]"
            style={{ fontSize: "15px", lineHeight: "1.65", color: "var(--color-muted)" }}
          >
            From diamond and sonic drilling to instrumentation, downhole services
            and digital data systems — chosen to deliver reliable, high-quality
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
            All Services ({services.length})
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT TEASER — pillars + portrait ───────────────────────────────────────

function AboutTeaser() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
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
      <div className="relative mx-auto grid max-w-[1500px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-14">
        {/* Left — image with floating badge + index */}
        <div className="flex flex-col gap-8 md:col-span-5">
          <div className="relative mx-auto w-fit">
            <CircleImageRing
              src="/images/rig-aerial.jpg"
              alt="Drilling site aerial view"
              size={380}
              ringOffset={24}
            />
            {/* Floating yellow badge — overlaps bottom-right of circle, partially outside */}
            <div className="absolute bottom-[40px] right-[-40px] z-10 hidden md:block">
              <YellowBadge>FIELD-PROVEN</YellowBadge>
            </div>
          </div>
        </div>

        {/* Right — heading + body + 3 pillars */}
        <div className="flex flex-col gap-10 md:col-span-7">
          <Reveal className="flex flex-col gap-5">
            <SectionLabel number="03" label="About Us" />
            <SectionHeading
              line1="Specialist drilling."
              line2="Demanding environments."
            />
          </Reveal>
          <p
            className="font-sans"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Forex Drilling is a specialist drilling contractor supporting mining,
            exploration, and civil projects with a broad range of drilling
            services. Our team combines strong operational experience with a
            clear understanding of geotechnical, hydrogeological, grade control,
            structural geology, resource geology, and exploration requirements.
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            <PillarCard number="01" title="Versatility">
              Crews and equipment capable of covering multiple scopes — reducing
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
    </section>
  );
}

// ─── FLEET TEASER — image card with overlay ─────────────────────────────────

function FleetTeaser() {
  return (
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-14">
        <Reveal className="flex flex-col gap-8 md:col-span-5">
          <SectionLabel number="04" label="Fleet & Capabilities" />
          <SectionHeading
            line1="Modern equipment."
            line2="Reliable performance."
          />
          <p
            className="font-sans"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Forex Drilling operates modern, versatile drilling equipment designed
            to perform reliably in demanding environments — supported by experienced
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
                Designed to deliver multiple scopes from a single mobilisation —
                including dual-head sonic / diamond capability, in active mine pits
                and remote greenfield locations.
              </>
            }
          />
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
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[1000px]">
          <SectionLabel number="05" label="Health, Safety & Environment" />
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
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number="06" label="Project Delivery Approach" />
          <SectionHeading
            line1="Drilling is critical"
            line2="to project success."
          />
          <p
            className="mt-2 font-sans"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
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
                    style={{ fontSize: "16px", lineHeight: "1.55" }}
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
            project needs — contributing to planning, problem-solving, and
            overall project performance.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

const keyFacts = [
  { value: "12+",       label: "Drilling Methods" },
  { value: "Singapore", label: "Headquarters" },
  { value: "PNG",       label: "Field Operations" },
  { value: "24/7",      label: "Site Coverage" },
] as const;

export default function HomePage() {
  return (
    <>
      <HeroPoster />
      <HeroStack />
      <StatStrip items={keyFacts} />
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
