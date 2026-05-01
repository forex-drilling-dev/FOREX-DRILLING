import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  DrillBitPin,
  CtaBanner,
  Reveal,
  StatCounter,
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
      line1="Reliable data,"
      line2="consistent delivery."
      photo={{
        src: "/images/drill-head-closeup.jpg",
        alt: "Drill head — precision close-up",
      }}
      body={
        <>
          Forex Drilling is committed to delivering high-quality drilling
          services supported by structured quality systems, KPI-driven reviews,
          and continuous improvement.
        </>
      }
    />
  );
}

function QmSection() {
  return (
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number="01" label="Quality Management" />
          <SectionHeading line1="Structured." line2="Documented. Auditable." />
          <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We operate with clear performance metrics — productivity tracking,
            structured reporting, and regular performance reviews. Continuous
            improvement is embedded across our operations.
          </p>
        </Reveal>
        <ul className="flex flex-col gap-4 md:col-span-7">
          {qmItems.map((item) => (
            <li key={item} className="flex items-start gap-4 border-t border-border pt-5">
              <span className="flex shrink-0 pt-0.5" aria-hidden>
                <DrillBitPin size={20} />
              </span>
              <span className="font-sans font-medium text-deep-navy" style={{ fontSize: "16px", lineHeight: "1.55" }}>
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
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[760px]">
          <SectionLabel number="02" label="Digital Systems" />
          <SectionHeading line1="Krux & MWD." line2="Real-time, reliable data." />
          <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We leverage digital data capture and monitoring systems to ensure
            accurate, real-time data collection — enhancing data quality,
            improving traceability, and providing additional insight into
            subsurface conditions when interpreted alongside geological and
            geotechnical analysis.
          </p>
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Digital Platform</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>Krux</h3>
            <p className="mt-5 font-display" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Real-time data collection, reporting, and operational monitoring.
              Drilling data is captured accurately and consistently across the
              program, with structured outputs ready for client technical teams.
            </p>
          </div>
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Downhole Telemetry</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>MWD</h3>
            <p className="mt-5 font-display" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Measurement While Drilling collects downhole parameters during
              operations. When interpreted alongside geological and geotechnical
              data, it provides valuable insight into ground conditions and
              enhances decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats: Array<{
    value?: string;
    counter?: { to: number; suffix?: string };
    label: string;
    description: string;
  }> = [
    { counter: { to: 100, suffix: "%" }, label: "Reporting Coverage", description: "Every shift, every hole" },
    { value: "Real-Time", label: "Data Capture", description: "Krux + MWD integrated" },
    { value: "Continuous", label: "Improvement", description: "KPI-driven reviews on every program" },
  ];
  return (
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-14">
        <div className="grid gap-10 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2 border-l-4 border-amber pl-6">
              <p className="font-display font-black text-deep-navy" style={{ fontSize: "44px", lineHeight: "1" }}>
                {s.counter ? (
                  <StatCounter to={s.counter.to} suffix={s.counter.suffix ?? ""} />
                ) : (
                  s.value
                )}
              </p>
              <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
                {s.label}
              </p>
              <p className="font-sans" style={{ fontSize: "13px", lineHeight: "1.55", color: "var(--color-muted)" }}>
                {s.description}
              </p>
            </div>
          ))}
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
      <StatsSection />
      <CtaBanner
        headline="Program needs audit-ready data?"
        body="Krux, MWD, KPIs — every meter logged, every shift reported. We plug straight into your technical teams&rsquo; workflow."
        cta="See QM approach"
        href="/contact"
      />
    </>
  );
}
