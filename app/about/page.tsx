import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  CircleImageRing,
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
      line1="Built on Drilling."
      line2="Driven by Delivery."
      photo={{ src: "/images/rig-forest.jpg", alt: "Drilling rig in forested terrain" }}
      body={null}
    />
  );
}

// ─── WHO WE ARE — text left of the spine, circle photo + backing right ──────

function WhoWeAre() {
  return (
    <section className="relative z-10 py-16 md:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 md:px-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <SectionLabel number="01" label="Who We Are" />
          <p
            className="font-sans font-medium"
            style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--color-fore)" }}
          >
            Our team combines strong operational experience with a clear
            understanding of geotechnical, hydrogeological, grade control,
            structural geology, resource geology, and exploration requirements.
          </p>
          
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-2xl bg-deep p-6">
              <h4 className="font-display font-bold uppercase tracking-wide text-amber" style={{ fontSize: "14px" }}>
                High-Quality Data
              </h4>
              <p className="font-sans" style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--color-fore)" }}>
                Executing drilling programs to produce reliable data for high-confidence interpretation and modelling.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-deep p-6">
              <h4 className="font-display font-bold uppercase tracking-wide text-amber" style={{ fontSize: "14px" }}>
                Critical Engineering
              </h4>
              <p className="font-sans" style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--color-fore)" }}>
                Data that underpins geotechnical, environmental, groundwater, and resource decisions.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-deep p-6">
              <h4 className="font-display font-bold uppercase tracking-wide text-amber" style={{ fontSize: "14px" }}>
                Integrated Solutions
              </h4>
              <p className="font-sans" style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--color-fore)" }}>
                Proposing practical, solution-driven approaches&mdash;from selecting methods to turnkey projects.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-deep p-6">
              <h4 className="font-display font-bold uppercase tracking-wide text-amber" style={{ fontSize: "14px" }}>
                Beyond Minimums
              </h4>
              <p className="font-sans" style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--color-fore)" }}>
                Working closely with clients to identify risks and exceed standard requirements for successful outcomes.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={120} className="hidden justify-center lg:flex">
          <div className="relative">
            {/* Navy backing panel — gives the photo visual mass. */}
            <span
              aria-hidden
              className="absolute -bottom-7 -right-7 hidden rounded-[2rem] bg-surface sm:block"
              style={{ width: "82%", height: "82%" }}
            />
            <CircleImageRing
              src="/images/rig-vertical-clean.jpg"
              alt="Forex Drilling vertical rig on a prepared drill pad"
              size={360}
              ringOffset={18}
              className="relative z-[1]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}



// ─── OPERATING MODEL — pillars zigzag along the spine ───────────────────────

function OperatingModel() {
  return (
    <section className="relative z-10 py-16 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-14">
        <Reveal className="mb-16">
          <SectionLabel number="02" label="Operating Model" />
        </Reveal>

        <div className="relative flex flex-col gap-12 lg:gap-8">
          {/* Center spine — vertical hairline running down the middle */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border lg:block"
          />
          {PILLARS.map((pillar, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={pillar.title} delay={i * 80} className="flex flex-col gap-3">
                {/* Header row — number + spine dot, vertically centered together */}
                <div className="grid grid-cols-1 items-center gap-3 lg:grid-cols-[1fr_220px_1fr]">
                  <span
                    aria-hidden
                    className={
                      left
                        ? "font-display font-black leading-none text-amber lg:col-start-1 lg:row-start-1 lg:pr-20 lg:text-right"
                        : "font-display font-black leading-none text-amber lg:col-start-3 lg:row-start-1 lg:pl-20"
                    }
                    style={{ fontSize: "clamp(40px, 5vw, 54px)" }}
                  >
                    {pillar.num}
                  </span>
                  <span
                    aria-hidden
                    className="hidden lg:col-start-2 lg:row-start-1 lg:flex lg:justify-center"
                  >
                    <span className="h-3.5 w-3.5 rounded-full bg-amber ring-4 ring-white" />
                  </span>
                </div>
                {/* Body row — title + copy aligned under the number */}
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_220px_1fr]">
                  <div
                    className={
                      left
                        ? "flex flex-col gap-3 lg:col-start-1 lg:items-end lg:pr-20 lg:text-right"
                        : "flex flex-col gap-3 lg:col-start-3 lg:items-start lg:pl-20"
                    }
                  >
                    <h3
                      className="font-display font-extrabold uppercase text-deep-navy"
                      style={{ fontSize: "20px", letterSpacing: "0.04em" }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="max-w-[42ch] font-sans"
                      style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-fore)" }}
                    >
                      {pillar.body}
                    </p>
                  </div>
                </div>
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
      <div className="relative bg-white">
        <AboutHero />
        <WhoWeAre />
        <OperatingModel />
      </div>
      <NextPageStrip />
    </>
  );
}

function NextPageStrip() {
  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="mx-auto flex max-w-[1500px] justify-center px-6 md:px-14">
        <SectionLink href="/services" label="Services" />
      </div>
    </section>
  );
}
