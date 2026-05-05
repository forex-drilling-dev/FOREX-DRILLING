import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  DrillBitPin,
  Reveal,
  SectionLink,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Quality & Performance",
  description:
    "Structured quality systems, accurate data, and continuous improvement embedded across every program.",
};

const qmItems = [
  "Quality Management Plans aligned with project requirements",
  "Accurate drillhole logging and reporting",
  "Core recovery optimisation",
  "Verification of instrumentation installation",
  "Continuous monitoring of drilling performance",
];

function QualityHero() {
  return (
    <PageHero
      badge="QUALITY"
      line1="Quality &"
      line2="Performance."
      photo={{
        src: "/images/drill-head-closeup.jpg",
        alt: "Close-up of an orange Forex Drilling rotary drill head with hydraulic lines",
      }}
      body={
        <>
          Forex Drilling is committed to delivering high-quality drilling
          services supported by structured quality systems.
        </>
      }
    />
  );
}

function QmSection() {
  return (
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-12 px-6 md:gap-16 md:px-14">
        {/* Intro — full-width header so the items list below can breathe.
            Mirrors the services/page.tsx pattern that fixed the empty
            left-column gap of the original side-by-side layout. */}
        <Reveal className="flex max-w-[820px] flex-col gap-5">
          <SectionLabel number="01" label="Quality Management" />
          <SectionHeading line1="Our approach" line2="includes." />
        </Reveal>

        {/* Items list — 2 cols on md+, 1 col on mobile.
            5 items split 3 / 2 — kept as a single ul for AT semantics. */}
        <ul className="grid gap-x-12 gap-y-2 md:grid-cols-2">
          {qmItems.map((item) => (
            <li
              key={item}
              className="flex items-center gap-4 border-t border-border py-5"
            >
              <span className="flex shrink-0" aria-hidden>
                <DrillBitPin size={20} />
              </span>
              <span
                className="font-sans font-medium text-deep-navy"
                style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.55" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>

        <Reveal className="flex max-w-[820px] flex-col gap-5">
          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-fore)" }}
          >
            We operate with clear performance metrics, including productivity
            tracking, structured reporting, and regular performance reviews.
            Continuous improvement is embedded in our operations to ensure
            consistent, reliable, and high-quality delivery.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function DigitalSection() {
  return (
    <section className="relative bg-white py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[820px]">
          <SectionLabel number="02" label="Digital Systems" />
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We also leverage digital data capture and monitoring systems,
            including platforms such as Krux and Measurement While Drilling
            (MWD) technologies, to ensure accurate, real-time data collection.
            These systems enhance data quality, improve traceability, and
            provide additional insight into subsurface conditions when
            interpreted alongside geological and geotechnical analysis.
          </p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="border-l-4 border-[var(--color-amber-dim)] pl-8">
            <p className="font-display font-bold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--color-amber-dim)" }}>Digital Platform</p>
            <a
              href="https://www.kruxanalytics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block transition-opacity hover:opacity-80"
              aria-label="Krux Analytics — opens in new tab"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/krux-logo.svg"
                alt="Krux Analytics"
                width={180}
                height={56}
                className="h-12 w-auto md:h-14"
              />
            </a>
            <p className="mt-5 font-sans" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Digital platforms such as Krux for data collection, reporting,
              and operational monitoring, ensuring that drilling data is
              captured accurately and consistently throughout the project.
            </p>
          </div>
          <div className="border-l-4 border-[var(--color-amber-dim)] pl-8">
            <p className="font-display font-bold uppercase" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--color-amber-dim)" }}>Downhole Telemetry</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>MWD</h3>
            <p className="mt-5 font-sans" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              We also utilise Measurement While Drilling (MWD) systems to
              collect downhole parameters during drilling operations. When
              properly interpreted, this data provides valuable insights into
              ground conditions, supports geological and geotechnical
              understanding, and enhances decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function QualityPage() {
  return (
    <>
      <QualityHero />
      <QmSection />
      <DigitalSection />
      <NextPageStrip />
    </>
  );
}

function NextPageStrip() {
  return (
    <section className="relative bg-deep py-14 md:py-20">
      <div className="mx-auto flex max-w-[1500px] justify-center px-6 md:px-14">
        <SectionLink href="/projects" label="Projects" />
      </div>
    </section>
  );
}
