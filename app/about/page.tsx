import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  QuoteBlock,
  CircleImageRing,
  CentralDrill,
  Reveal,
  SectionLink,
} from "@/components/v3";

// Operating-model pillars — short triad, arranged as a zigzag down the spine.
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

// ─── WHO WE ARE — text left of the spine, circle photo right ────────────────

function WhoWeAre() {
  return (
    <section className="relative z-10 py-12 md:py-28">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 px-6 md:px-14 lg:grid-cols-[1fr_140px_1fr] lg:gap-0">
        <Reveal className="flex flex-col gap-6 lg:pr-14">
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

        {/* Center lane — left clear for the drill spine on desktop. */}
        <div aria-hidden className="hidden lg:block" />

        <Reveal from="right" delay={120} className="flex justify-center lg:pl-14">
          <CircleImageRing
            src="/images/rig-vertical-clean.jpg"
            alt="Forex Drilling vertical rig on a prepared drill pad"
            size={300}
            ringOffset={18}
          />
        </Reveal>
      </div>
    </section>
  );
}

// ─── PULL-QUOTE — navy node centred on the spine ────────────────────────────

function PullQuote() {
  return (
    <section className="relative z-20 px-6 py-6 md:px-14">
      <div className="mx-auto max-w-[620px] rounded-2xl bg-surface px-8 py-12 text-center shadow-card">
        <QuoteBlock
          variant="dark"
          line1="We go beyond"
          line2="minimum requirements."
          className="items-center text-center"
        />
      </div>
    </section>
  );
}

// ─── OPERATING MODEL — pillars zigzag along the spine ───────────────────────

function OperatingModel() {
  return (
    <section className="relative z-10 py-12 md:py-28">
      <div className="mx-auto max-w-[1500px] px-6 md:px-14">
        <Reveal className="mb-12 flex justify-center">
          {/* Backing plate so the label stays readable over the spine. */}
          <span className="bg-deep px-5 py-1">
            <SectionLabel number="02" label="Operating Model" />
          </span>
        </Reveal>

        <div className="flex flex-col gap-10 lg:gap-4">
          {PILLARS.map((pillar, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal
                key={pillar.title}
                delay={i * 80}
                className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[1fr_140px_1fr]"
              >
                <div
                  className={
                    left
                      ? "flex flex-col gap-3 lg:col-start-1 lg:items-end lg:text-right"
                      : "flex flex-col gap-3 lg:col-start-3 lg:items-start"
                  }
                >
                  <span
                    aria-hidden
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(36px, 4vw, 44px)",
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
                    className="max-w-[46ch] font-sans"
                    style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
                  >
                    {pillar.body}
                  </p>
                </div>

                {/* Spine node — desktop only. */}
                <span
                  aria-hidden
                  className="hidden h-3.5 w-3.5 rounded-full bg-amber lg:col-start-2 lg:mx-auto lg:block"
                  style={{ boxShadow: "0 0 0 5px var(--color-deep)" }}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      {/* Body canvas — single continuous surface so the drill spine reads
          end to end. The spine sits behind (z-0); content sits above. The
          drill point lands at the bottom of this block, above the next strip. */}
      <div className="relative overflow-hidden bg-deep">
        <CentralDrill />
        <WhoWeAre />
        <PullQuote />
        <OperatingModel />
      </div>
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
