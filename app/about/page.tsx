import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  QuoteBlock,
  CircleImageRing,
  DrillBitPin,
  Reveal,
  SectionLink,
} from "@/components/v3";

// Operating-model pillars — short triad, editorial column layout.
const PILLARS = [
  {
    num: "01",
    title: "Versatility",
    body:
      "We prioritise deploying crews and equipment capable of covering multiple scopes of work, reducing the need for multiple rigs on site. This improves efficiency, reduces downtime, and simplifies project execution in often complex environments.",
  },
  {
    num: "02",
    title: "Resilience",
    body:
      "Built into how we operate, through our people, our equipment, and our systems. We are structured to maintain performance under pressure, adapt to changing ground conditions, and continue delivering safely and reliably in challenging environments.",
  },
  {
    num: "03",
    title: "Reliability",
    body:
      "Structured preventative maintenance programs, regular inspections, and disciplined field practices ensure high rig availability, consistent productivity, and dependable project delivery.",
  },
] as const;

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

// ─── OPERATING MODEL — editorial columns divided by hairlines ───────────────

function OperatingModel() {
  return (
    <section className="relative bg-white py-12 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[700px]">
          <SectionLabel number="02" label="Operating Model" />
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0">
          {PILLARS.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 100}
              className={
                i === 0
                  ? "flex flex-col gap-4 md:pr-12"
                  : "flex flex-col gap-4 md:border-l md:border-border md:px-12"
              }
            >
              <span
                aria-hidden
                className="font-display font-black leading-none"
                style={{
                  fontSize: "clamp(40px, 5vw, 48px)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px var(--color-amber)",
                }}
              >
                {pillar.num}
              </span>
              <h3
                className="font-display font-extrabold uppercase text-deep-navy"
                style={{ fontSize: "18px", letterSpacing: "0.04em" }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-sans"
                style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
              >
                {pillar.body}
              </p>
            </Reveal>
          ))}
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
