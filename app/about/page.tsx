import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PillarCard } from "@/components/sections/PillarCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "About",
  description:
    "Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil projects across Asia-Pacific.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-[calc(var(--spacing-nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>About Us</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            A specialist drilling contractor built for{" "}
            <span className="text-amber">challenging environments.</span>
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <FadeIn className="md:col-span-4">
            <SectionHeader index="01" label="Who We Are" title="Built for the field." />
          </FadeIn>
          <div className="flex flex-col gap-6 text-body-lg text-subtle md:col-span-8">
            <FadeIn as="p" delay={0.05}>
              Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil
              projects with a broad range of drilling services. Headquartered in Singapore and operating in
              Papua New Guinea, the company is structured to deliver efficient, field-proven solutions in
              remote and challenging environments.
            </FadeIn>
            <FadeIn as="p" delay={0.1}>
              Our team combines strong operational experience with a clear understanding of geotechnical,
              hydrogeological, and exploration requirements. Each drilling program is executed with the
              objective of producing reliable, high-quality data that directly supports geological
              interpretation, slope stability assessments, groundwater modelling, resource modelling, and
              engineering decisions.
            </FadeIn>
            <FadeIn as="p" delay={0.15}>
              We work closely with our clients from early stages through execution — understanding project
              constraints, identifying risks, and proposing practical, solution-driven approaches. From
              selecting the right drilling methods to delivering fully integrated or turnkey projects when
              required, we consistently aim to go beyond minimum requirements to ensure successful outcomes.
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="py-32">
        <Container className="flex flex-col gap-16">
          <SectionHeader
            index="02"
            label="Operating Model"
            title="Three pillars underpin everything we do."
          />
          <div className="grid gap-12 md:grid-cols-3">
            <PillarCard
              title="Versatility"
              body="We prioritise deploying crews and equipment capable of covering multiple scopes of work, reducing the need for multiple rigs on site. This improves efficiency, reduces downtime, and simplifies project execution."
            />
            <PillarCard
              title="Resilience"
              body="Built into our people, equipment, and systems — we are structured to maintain performance under pressure, adapt to changing ground conditions, and continue delivering safely and reliably."
            />
            <PillarCard
              title="Reliability"
              body="Structured preventative maintenance programs, regular inspections, and disciplined field practices ensure high rig availability, consistent productivity, and dependable project delivery."
            />
          </div>
        </Container>
      </section>

      <CtaBanner headline="Want to work with us?" cta="Contact the Team" href="/contact" />
    </>
  );
}
