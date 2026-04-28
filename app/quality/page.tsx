import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StatCard } from "@/components/sections/StatCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Quality & Performance",
  description: "Structured quality systems, accurate data, and continuous improvement embedded across every program.",
};

export default function QualityPage() {
  return (
    <>
      {/* Hero — drill closeup */}
      <section className="relative overflow-hidden pt-[calc(var(--spacing-nav)+6rem)] pb-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/drill-head-closeup.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95" />
        </div>
        <Container className="flex flex-col gap-10">
          <Tag>Quality &amp; Performance</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.88] text-balance text-fore">
            Reliable data,{" "}
            <span className="text-ocre-400">consistent delivery.</span>
          </h1>
        </Container>
      </section>

      {/* Quality management list */}
      <section className="border-y border-border bg-surface py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader index="01" label="Quality Management" title="Structured. Documented. Auditable." />
          </div>
          <ul className="flex flex-col gap-4 md:col-span-7">
            {[
              "Quality Management Plans aligned with project requirements",
              "Accurate drillhole logging and reporting",
              "Core recovery optimisation",
              "Verification of instrumentation installation",
              "Continuous monitoring of drilling performance",
            ].map((item, i) => (
              <FadeIn as="li" key={item} delay={i * 0.05}
                className="border-t border-border pt-4 text-body-lg text-fore">
                {item}
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {/* Krux + MWD */}
      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-2">
          <FadeIn className="border-l-4 border-amber pl-8">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Digital Platform</p>
            <h3 className="mt-4 font-display text-display-md uppercase text-fore">Krux</h3>
            <p className="mt-6 text-body-lg text-muted">
              Real-time data collection, reporting, and operational monitoring. Drilling data is captured accurately and
              consistently across the program, with structured outputs ready for client technical teams.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="border-l-4 border-amber pl-8">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Downhole Telemetry</p>
            <h3 className="mt-4 font-display text-display-md uppercase text-fore">MWD</h3>
            <p className="mt-6 text-body-lg text-muted">
              Measurement While Drilling collects downhole parameters during operations. When interpreted alongside
              geological and geotechnical data, it provides valuable insight into ground conditions and enhances
              decision-making.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-t border-border bg-surface py-24">
        <Container className="grid gap-12 sm:grid-cols-3">
          <StatCard value={100} suffix="%" label="Reporting Coverage" description="Every shift, every hole" />
          <StatCard staticValue="Real-Time" label="Data Capture" description="Krux + MWD integrated" />
          <StatCard staticValue="Continuous" label="Improvement" description="KPI-driven reviews on every program" />
        </Container>
      </section>

      <CtaBanner headline="Need auditable, structured delivery?" cta="Start a Conversation" href="/contact" />
    </>
  );
}
