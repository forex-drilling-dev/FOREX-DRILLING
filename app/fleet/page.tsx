import type { Metadata } from "next";
import Image from "next/image";
import {
  NavyBlob,
  YellowBadge,
  CircleImageRing,
  SectionLabel,
  SectionHeading,
  OverlayImageCard,
  DrillBitPin,
  CtaBanner,
  Crosshair,
  BgGreyShape,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Fleet & Capabilities",
  description:
    "Modern, versatile drilling equipment designed to perform reliably in demanding environments — supported by experienced crews and a strong maintenance culture.",
};

function FleetHero() {
  return (
    <section className="relative bg-white pt-[calc(var(--spacing-nav)+48px)] pb-20 md:pb-32">
      <BgGreyShape className="top-[80px] right-[-100px] hidden lg:block" />
      <Crosshair size={36} className="absolute top-[120px] right-[120px] hidden lg:block" />
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-14">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="relative md:col-span-7">
            <YellowBadge className="relative z-20 -mb-6 ml-4 lg:-mb-8">FLEET</YellowBadge>
            <NavyBlob className="relative z-10 h-auto w-full max-w-[640px]">
              <p className="font-display font-extrabold uppercase leading-[1.1] text-on-navy" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px" }}>
                Modern equipment.
              </p>
              <p className="font-display font-extrabold uppercase leading-[1.1] text-amber" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px", marginBottom: "26px" }}>
                Reliable performance.
              </p>
              <p className="font-sans font-normal text-on-navy-muted" style={{ fontSize: "13px", lineHeight: "1.7", maxWidth: "440px" }}>
                Forex Drilling operates modern, versatile drilling equipment
                designed to perform reliably in demanding environments. Supported
                by experienced crews, robust logistics, and a strong maintenance
                culture.
              </p>
            </NavyBlob>
          </div>
          <div className="flex flex-col items-end gap-6 md:col-span-5 md:pt-12">
            <CircleImageRing
              src="/images/rig-vertical-clean.jpg"
              alt="Forex Drilling rig — vertical product shot"
              size={300}
              ringOffset={20}
              priority
            />
          </div>
        </div>
      </div>
    </section>
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
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14 px-6 md:px-14">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="flex flex-col gap-6 md:col-span-5">
            <SectionLabel number="01" label="Capabilities" />
            <SectionHeading line1="Scalable, versatile," line2="resilient." />
            <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Our equipment is supported by experienced crews, robust logistics,
              and a strong maintenance culture. Designed to provide resilience
              in the field — maintaining performance even under challenging
              ground conditions, logistical constraints, and operational
              pressures.
            </p>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <OverlayImageCard
              src="/images/rig-horizontal.jpg"
              alt="Modern dual-head drilling rig"
              title="Multi-method, scalable rigs"
              body={
                <>
                  Designed to deliver multiple scopes from a single mobilisation
                  — including dual-head sonic / diamond capability for difficult
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
  const stats = [
    { value: "95%", label: "Target Uptime", description: "Equipment availability target across active rigs" },
    { value: "Daily", label: "Inspection Cadence", description: "Every rig, every shift, without exception" },
    { value: "Field-First", label: "Maintenance Culture", description: "Preventative programs lead component management" },
  ];
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-14">
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

        <div className="flex flex-col gap-8 md:col-span-7 md:order-1">
          <SectionLabel number="02" label="Maintenance" />
          <SectionHeading line1="Treated as a core" line2="operational priority." />
          <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Structured preventative maintenance programs, disciplined daily
            inspections, and proactive component management ensure high
            equipment availability and consistent performance. This focus on
            reliability directly supports productivity, reduces downtime, and
            strengthens overall project delivery.
          </p>
          <div className="grid gap-8 mt-2 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2 border-l-4 border-amber pl-5">
                <p className="font-display font-black text-deep-navy" style={{ fontSize: "36px", lineHeight: "1" }}>
                  {s.value}
                </p>
                <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
                  {s.label}
                </p>
                <p className="font-sans" style={{ fontSize: "13px", lineHeight: "1.5", color: "var(--color-muted)" }}>
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
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
        headline="Mobilisation to organise?"
        body="Send us location, ground conditions, and target depth. We&rsquo;ll come back with the rig, the crew, and a timeline you can plan against."
        cta="Contact operations"
        href="/contact"
      />
    </>
  );
}
