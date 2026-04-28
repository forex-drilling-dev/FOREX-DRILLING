import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { StatCard } from "@/components/sections/StatCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Fleet & Capabilities",
  description:
    "Modern, versatile drilling equipment designed to perform reliably in demanding environments.",
};

export default function FleetPage() {
  return (
    <>
      <section className="pt-[calc(var(--spacing-nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>Fleet &amp; Capabilities</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            Equipment built to <span className="text-amber">perform under pressure.</span>
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <FadeIn className="md:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1400"
                alt="Drill rig in operation"
                fill
                sizes="(min-width:768px) 45vw, 100vw"
                className="object-cover grayscale"
              />
            </div>
          </FadeIn>
          <div className="md:col-span-7">
            <SectionHeader index="01" label="Capabilities" title="Scalable, versatile, resilient." />
            <ul className="mt-10 flex flex-col gap-6 text-body-lg text-subtle">
              <li className="border-t border-border pt-4">
                <span className="text-fore">Scalable multi-rig deployment</span> aligned with project
                requirements.
              </li>
              <li className="border-t border-border pt-4">
                <span className="text-fore">Versatile drill rigs</span> including dual-head sonic/diamond
                capability.
              </li>
              <li className="border-t border-border pt-4">
                <span className="text-fore">Operation in active mine pits</span> and remote greenfield
                locations.
              </li>
              <li className="border-t border-border pt-4">
                <span className="text-fore">Rod and casing handling systems</span> for safer, more efficient
                operations.
              </li>
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader
              index="02"
              label="Maintenance"
              title="Treated as a core operational priority."
            />
          </div>
          <div className="flex flex-col gap-10 md:col-span-7">
            <p className="text-body-lg text-subtle">
              Structured preventative maintenance programs, disciplined daily inspections, and proactive
              component management ensure high equipment availability and consistent performance. This focus
              on reliability directly supports productivity, reduces downtime, and strengthens overall project
              delivery.
            </p>
            <div className="grid gap-12 sm:grid-cols-3">
              <StatCard
                value={95}
                suffix="%"
                label="Target Uptime"
                description="Equipment availability target across active rigs"
              />
              <StatCard
                staticValue="Daily"
                label="Inspection Cadence"
                description="Every rig, every shift, without exception"
              />
              <StatCard
                staticValue="Field-First"
                label="Maintenance Culture"
                description="Preventative programs lead component management"
              />
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner headline="Need a rig on site?" cta="Contact Operations" href="/contact" />
    </>
  );
}
