import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  ServiceListGroup,
  CtaBanner,
  Reveal,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A comprehensive range of drilling and associated services: drilling, instrumentation, downhole, and data acquisition.",
};

function ServicesHero() {
  return (
    <PageHero
      badge="SERVICES"
      line1="Drilling &"
      line2="associated services."
      photo={{ src: "/images/rig-meadow.jpg", alt: "Forex Drilling rig deployed in open meadow terrain" }}
      body={
        <>
          A comprehensive range of drilling and associated services, supporting
          mining, exploration, civil infrastructure, and groundwater programs.
        </>
      }
    />
  );
}

const drillingItems = [
  "Diamond drilling",
  "Sonic drilling",
  "Directional drilling and coring",
  "Horizontal drilling (including depressurisation)",
  "Air and mud rotary drilling",
  "Reverse circulation (RC) drilling",
  "Standard Penetration Testing (SPT)",
  "Push tube sampling",
  "Pumping and packer testing",
  "Downhole surveying (gyro, core orientation, deviation control)",
  "Gas and hot ground drilling (well control)",
];
const instrumentationItems = [
  "Vibrating Wire Piezometers (VWP)",
  "Inclinometers",
  "Standpipe piezometers",
  "Monitoring systems installation and commissioning",
];
const downholeItems = [
  "Geophysical logging",
  "Borehole surveying and deviation control",
  "Borehole integrity verification",
];

function CategorySection({
  id, bg, number, label, line1, line2, body, items,
}: {
  id: string;
  bg: "white" | "deep";
  number: string;
  label: string;
  line1: string;
  line2: string;
  body: string;
  items: string[];
}) {
  return (
    <section id={id} className={`relative scroll-mt-[100px] py-16 md:py-32 ${bg === "deep" ? "bg-deep" : "bg-white"}`}>
      <div className="mx-auto grid grid-cols-1 max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number={number} label={label} />
          <SectionHeading line1={line1} line2={line2} />
          {body && (
            <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
              {body}
            </p>
          )}
        </Reveal>
        <div className="md:col-span-7">
          <ServiceListGroup title="" items={items} />
        </div>
      </div>
    </section>
  );
}

function DataSection() {
  return (
    <section id="data" className="relative scroll-mt-[100px] bg-white py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[820px]">
          <SectionLabel number="04" label="Data Acquisition & Digital" />
          <SectionHeading line1="Krux" line2="& MWD." />
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Forex Drilling integrates advanced data acquisition systems to
            improve accuracy, traceability, and overall drilling outcomes.
            Field data is reliable, structured, and directly usable by
            client technical teams.
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

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <CategorySection
        id="drilling" bg="deep" number="01" label="Drilling Services"
        line1="Drilling" line2="services."
        body=""
        items={drillingItems}
      />
      <CategorySection
        id="instrumentation" bg="white" number="02" label="Instrumentation"
        line1="Instrumentation" line2="installation."
        body=""
        items={instrumentationItems}
      />
      <CategorySection
        id="downhole" bg="deep" number="03" label="Downhole Services"
        line1="Downhole" line2="services."
        body=""
        items={downholeItems}
      />
      <DataSection />
      <CtaBanner
        headline="Need a specific drilling method?"
        body="Diamond, sonic, RC, directional, or a multi-method mix — tell us the scope and we&rsquo;ll come back with the right approach."
        cta="Discuss your scope"
        href="/contact"
      />
    </>
  );
}
