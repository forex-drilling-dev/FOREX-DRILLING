import type { Metadata } from "next";
import Image from "next/image";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";
import {
  PageHero,
  SectionLabel,
  OverlayImageCard,
  DrillBitPin,
  Reveal,
  SectionLink,
  ImageLightbox,
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
    <section className="relative bg-deep py-12 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-14">
        <div className="grid gap-12 md:grid-cols-12 md:gap-20">
          {/* Left column — section label + intro + bullet list. Bullets sit
              in this column (instead of below, full-width) so the white
              space next to the right-hand image card is filled. */}
          <Reveal className="flex flex-col gap-8 md:col-span-5">
            <div className="flex flex-col gap-5">
              <SectionLabel number="01" label="Key Capabilities" />
              <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
                Key capabilities include:
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex shrink-0" aria-hidden>
                    <DrillBitPin size={20} />
                  </span>
                  <span className="font-sans font-medium text-deep-navy" style={{ fontSize: "15px", lineHeight: "1.55" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right column — image card. md:pt-6 keeps it visually aligned
              with the left section label baseline. */}
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
      </div>
    </section>
  );
}

// Rig data and photos sourced from the 2026 Capability Statement ("Our
// fleet — Modern, versatile rigs", p.05). Update both together.
const rigs = [
  {
    name: "MRS 200 DUO",
    meta: "Fleet: 1 unit · Royal Eijkelkamp",
    image: "/images/rig-mrs-200-duo.jpg",
    imageAlt: "MRS 200 DUO sonic/rotary rig with hydraulic rod handler, mast raised",
    points: [
      "Sonic + rotary coring in a single hole — no rig swap to prove bedrock",
      "Continuous, high-recovery sampling through fill, clay and mixed overburden",
      "Compact footprint for tight and access-constrained sites",
      "Hydraulic rod handler keeps crews' hands off the string",
    ],
  },
  {
    name: "LRS-275 DUO",
    meta: "Fleet: 2 units · Royal Eijkelkamp",
    image: "/images/rig-lrs-275-duo.jpg",
    imageAlt: "LRS-275 DUO dual-head crawler rig in transport position with ManipAll arm",
    points: [
      "Heavy dual-head platform for deeper, larger-diameter sonic and diamond core",
      "Clean, continuous recovery through overburden, then diamond core into rock",
      "Remote ManipAll handling removes hands from the rod string",
      "Angle drilling",
    ],
  },
  {
    name: "Fraste Mito 8C",
    meta: "Fleet: 1 unit · Fraste",
    image: "/images/rig-fraste-mito-8c.jpg",
    imageAlt: "Fraste Mito 8C lightweight crawler rig with mast raised on grass",
    points: [
      "Lightweight crawler that reaches remote, tight or low-bearing ground",
      "Fast to mobilise — ideal rapid second rig or standalone for smaller scopes",
      "Diamond core and rotary drilling in one versatile platform — Sonic option available",
      "One platform across geotech, water-bore, micropiling and horizontal scopes",
    ],
  },
];

function RigsSection() {
  return (
    <section className="relative bg-white py-12 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
        <Reveal className="flex max-w-[820px] flex-col gap-5">
          <SectionLabel number="02" label="Our Rigs" />
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Modern, multi-method drilling rigs, kept running by experienced
            crews and a disciplined preventative-maintenance program.
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {rigs.map((rig) => (
            <Reveal key={rig.name} className="flex flex-col gap-4">
              {/* Photo from the Capability Statement — 4/3 crop in the card,
                  click to open the full image in a lightbox. */}
              <ImageLightbox
                src={optimizedSrc(rig.image)}
                alt={rig.imageAlt}
                sizes="(min-width:768px) 33vw, 100vw"
                blurDataURL={blurPlaceholder(rig.image)}
              />
              <div className="border-b-2 border-amber pb-3">
                <h3
                  className="font-display font-black uppercase text-deep-navy"
                  style={{ fontSize: "clamp(20px, 5vw, 24px)", letterSpacing: "-0.005em", lineHeight: "1.1" }}
                >
                  {rig.name}
                </h3>
                <p
                  className="mt-1.5 font-display font-bold uppercase"
                  style={{ fontSize: "12px", letterSpacing: "0.14em", color: "var(--color-amber-dim)" }}
                >
                  {rig.meta}
                </p>
              </div>
              <ul className="flex flex-col">
                {rig.points.map((point, i) => (
                  <li
                    key={point}
                    className={`px-4 py-3 font-sans ${i % 2 === 0 ? "bg-deep" : "bg-white"}`}
                    style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--color-muted)" }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaintenanceSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-32">
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
          <SectionLabel number="03" label="Maintenance" />
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
      <RigsSection />
      <MaintenanceSection />
      <NextPageStrip />
    </>
  );
}

function NextPageStrip() {
  return (
    <section className="relative bg-deep py-14 md:py-20">
      <div className="mx-auto flex max-w-[1500px] justify-center px-6 md:px-14">
        <SectionLink href="/hse" label="HSE" />
      </div>
    </section>
  );
}
