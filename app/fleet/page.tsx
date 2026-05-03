import type { Metadata } from "next";
import Image from "next/image";
import {
  PageHero,
  SectionLabel,
  OverlayImageCard,
  DrillBitPin,
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
      line1="Fleet &"
      line2="Capabilities."
      photo={{
        src: "/images/rig-sunset.jpg",
        alt: "Forex Drilling rig at sunset, multiple drills on a maintenance pad",
      }}
      body={
        <>
          Forex Drilling operates modern, versatile drilling equipment designed
          to perform reliably in demanding environments.
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
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <Reveal className="flex flex-col gap-6 md:col-span-5">
            <SectionLabel number="01" label="Key Capabilities" />
            <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Key capabilities include:
            </p>
          </Reveal>
          <div className="md:col-span-7 md:pt-6">
            <OverlayImageCard
              src="/images/rig-vertical-orange.jpg"
              alt="Dual-head sonic / diamond drill rig with mast deployed"
              title="Multi-method, scalable rigs"
              aspect="balanced"
              imageFit="contain"
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
    <section className="relative overflow-hidden bg-white py-16 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-[1500px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-14">
        <div className="md:col-span-5 md:order-2">
          <div className="relative">
            <div aria-hidden className="absolute -top-5 -left-5 h-[calc(100%+40px)] w-[calc(100%+40px)] rounded-2xl border border-surface/30" />
            {/* Portrait drill-head close-up — the original "A core operational
                priority" photo. 3/4 (portrait) frame matches the photo's
                native aspect so the rig fills cleanly without cropping. */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-deep-navy" style={{ boxShadow: "var(--shadow-image)" }}>
              <Image
                src="/images/drill-head-closeup.jpg"
                alt="Close-up of an orange Forex Drilling rotary drill head with hydraulic lines"
                fill
                sizes="(min-width:768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <Reveal className="flex flex-col gap-8 md:col-span-7 md:order-1">
          <SectionLabel number="02" label="Maintenance" />
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-fore)" }}>
            Our equipment is supported by experienced crews, robust logistics,
            and a strong maintenance culture.
          </p>
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Maintenance is treated as a core operational priority. Structured
            preventative maintenance programs, disciplined daily inspections,
            and proactive component management ensure high equipment
            availability and consistent performance. This focus on reliability
            directly supports productivity, reduces downtime, and strengthens
            overall project delivery.
          </p>
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Our fleet and operational approach are designed to provide
            resilience in the field &mdash; maintaining performance even under
            challenging ground conditions, logistical constraints, and
            operational pressures.
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
    </>
  );
}
