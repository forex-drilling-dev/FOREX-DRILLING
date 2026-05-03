import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  PillarCard,
  CtaBanner,
  Reveal,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "About",
  description:
    "Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil projects across the Asia-Pacific region.",
};

// ─── HERO — shared full-bleed editorial poster (PageHero) ────────────────────

function AboutHero() {
  return (
    <PageHero
      badge="ABOUT"
      line1="Specialist drilling."
      line2="Built for the field."
      photo={{ src: "/images/rig-forest.jpg", alt: "Drilling rig in forested terrain" }}
      body={
        <>
          Forex Drilling is a specialist drilling contractor supporting mining,
          exploration, and civil projects with a broad range of drilling services.
          Headquartered in Singapore and operating across the Asia-Pacific region,
          structured to deliver efficient, field-proven solutions in remote and
          challenging environments.
        </>
      }
    />
  );
}

// ─── WHO WE ARE — body paragraphs ───────────────────────────────────────────

function WhoWeAre() {
  return (
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-5 md:col-span-4">
          <SectionLabel number="01" label="Who We Are" />
          <SectionHeading
            line1="Strong field"
            line2="experience."
          />
        </Reveal>
        <div className="flex flex-col gap-6 md:col-span-8">
          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-fore)" }}
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
            We work closely with our clients from early stages through execution: understanding project constraints, identifying risks, and proposing
            practical, solution-driven approaches. From selecting the right
            drilling methods to delivering fully integrated or turnkey projects
            when required, we consistently aim to go beyond minimum requirements
            to ensure successful outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── OPERATING MODEL — 3 pillars detailed ──────────────────────────────────

function OperatingModel() {
  return (
    <section className="relative bg-white py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[700px]">
          <SectionLabel number="02" label="Operating Model" />
          <SectionHeading
            line1="Three pillars"
            line2="underpin everything."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          <PillarCard number="01" title="Versatility">
            We prioritise deploying crews and equipment capable of covering
            multiple scopes of work, reducing the need for multiple rigs on
            site. This improves efficiency, reduces downtime, and simplifies
            project execution in often complex environments.
          </PillarCard>
          <PillarCard number="02" title="Resilience">
            Built into how we operate, through our people, our equipment, and
            our systems. We are structured to maintain performance under
            pressure, adapt to changing ground conditions, and continue
            delivering safely and reliably in challenging environments.
          </PillarCard>
          <PillarCard number="03" title="Reliability">
            Structured preventative maintenance programs, regular inspections,
            and disciplined field practices ensure high rig availability,
            consistent productivity, and dependable project delivery.
          </PillarCard>
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
      <OperatingModel />
      <CtaBanner
        headline="Get to know the team."
        body="Singapore HQ, field operations across the Asia-Pacific. Tell us about your program and we&rsquo;ll get back within one business day."
        cta="Talk to us"
        href="/contact"
      />
    </>
  );
}
