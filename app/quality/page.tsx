import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  DrillBitPin,
  Reveal,
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
      line2="performance."
      photo={{
        src: "/images/drill-head-closeup.jpg",
        alt: "Drill head close-up",
      }}
      body={
        <>
          Forex Drilling is committed to delivering high-quality drilling
          services supported by structured quality systems and continuous
          improvement.
        </>
      }
    />
  );
}

function QmSection() {
  return (
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number="01" label="Quality Management" />
          <SectionHeading line1="Quality" line2="management." />
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Our quality approach focuses on the following:
          </p>
        </Reveal>
        <ul className="flex flex-col gap-4 md:col-span-7">
          {qmItems.map((item) => (
            <li key={item} className="flex items-start gap-4 border-t border-border pt-5">
              <span className="flex shrink-0 pt-0.5" aria-hidden>
                <DrillBitPin size={20} />
              </span>
              <span className="font-sans font-medium text-deep-navy" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.55" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
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
          <SectionHeading line1="Krux" line2="& MWD." />
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We leverage digital data capture and monitoring systems to ensure
            accurate, real-time data collection. These systems enhance data
            quality, improve traceability, and provide additional insight into
            subsurface conditions when interpreted alongside geological and
            geotechnical analysis.
          </p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Digital Platform</p>
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
              Digital platform for data collection, reporting, and operational
              monitoring, ensuring drilling data is captured accurately and
              consistently throughout the project, with structured outputs
              ready for client technical teams.
            </p>
          </div>
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Downhole Telemetry</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>MWD</h3>
            <p className="mt-5 font-sans" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Measurement While Drilling collects downhole parameters during
              operations. When properly interpreted, this data provides
              valuable insights into ground conditions, supports geological
              and geotechnical understanding, and enhances decision-making.
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
    </>
  );
}
