import type { Metadata } from "next";
import Image from "next/image";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  OverlayImageCard,
  DrillBitPin,
  CtaBanner,
  Reveal,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Fleet & Capabilities",
  description:
    "Modern, versatile drilling equipment designed to perform reliably in demanding environments, supported by experienced crews and a strong maintenance culture.",
};

function FleetHero() {
  return (
    <PageHero
      badge="FLEET"
      line1="Modern equipment."
      line2="Reliable performance."
      photo={{
        src: "/images/site-operations.jpg",
        alt: "Forex Drilling site operations — crew with rig in field",
      }}
      body={
        <>
          Forex Drilling operates modern, versatile drilling equipment designed
          to perform reliably in demanding environments, supported by
          experienced crews, robust logistics, and a strong maintenance culture.
        </>
      }
    />
  );
}

function CapabilitiesSection() {
  const items = [
    "Scalable multi-rig deployment aligned with project requirements",
    "Versatile drill rigs (including dual head sonic/diamond capability)",
    "Operation in active mine pits and remote greenfield locations",
    "Rod and casing handling systems where applicable to improve safety and efficiency",
  ];
  return (
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <Reveal className="flex flex-col gap-6 md:col-span-5">
            <SectionLabel number="01" label="Capabilities" />
            <SectionHeading line1="Scalable, versatile," line2="resilient." />
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Our equipment is supported by experienced crews, robust logistics,
              and a strong maintenance culture. Designed to provide resilience
              in the field, maintaining performance even under challenging
              ground conditions, logistical constraints, and operational
              pressures.
            </p>
          </Reveal>
          <div className="md:col-span-7 md:pt-6">
            <OverlayImageCard
              src="/images/rig-horizontal.jpg"
              alt="Modern dual-head drilling rig"
              title="Multi-method, scalable rigs"
              body={
                <>
                  Designed to deliver multiple scopes from a single mobilisation,
                  including dual-head sonic / diamond capability for difficult
                  ground.
                </>
              }
            />
          </div>
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 border-t border-border pt-5">
              <span className="flex shrink-0 pt-0.5" aria-hidden>
                <DrillBitPin size={20} />
              </span>
              <span className="font-sans font-medium text-deep-navy" style={{ fontSize: "15px", lineHeight: "1.55" }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MaintenanceSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-14">
        <div className="md:col-span-5 md:order-2">
          <div className="relative">
            <div aria-hidden className="absolute -top-5 -left-5 h-[calc(100%+40px)] w-[calc(100%+40px)] rounded-2xl border border-surface/30" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl" style={{ boxShadow: "var(--shadow-image)" }}>
              <Image
                src="/images/drill-head-closeup.jpg"
                alt="Drill head — maintenance close-up"
                fill
                sizes="(min-width:768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <Reveal className="flex flex-col gap-8 md:col-span-7 md:order-1">
          <SectionLabel number="02" label="Maintenance" />
          <SectionHeading line1="A core operational" line2="priority." />
          <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Equipment reliability is critical to performance. We place strong
            emphasis on maintenance, with structured preventative maintenance
            programs, regular inspections, and disciplined field practices,
            supporting high rig availability, consistent productivity, and
            dependable project delivery.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function FleetPage() {
  return (
    <>
      <FleetHero />
      <CapabilitiesSection />
      <MaintenanceSection />
      <CtaBanner
        headline="Discuss your program."
        body="Tell us about scope, location, and timeline. We&rsquo;ll get back to you within one business day."
        cta="Get in touch"
        href="/contact"
      />
    </>
  );
}
