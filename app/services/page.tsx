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
      photo={{ src: "/images/rig-meadow.jpg", alt: "Drilling rig" }}
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
    <section id={id} className={`relative scroll-mt-[100px] py-24 md:py-32 ${bg === "deep" ? "bg-deep" : "bg-white"}`}>
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number={number} label={label} />
          <SectionHeading line1={line1} line2={line2} />
          <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            {body}
          </p>
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
    <section id="data" className="relative scroll-mt-[100px] bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[760px]">
          <SectionLabel number="04" label="Data Acquisition" />
          <SectionHeading line1="Krux" line2="& MWD." />
          <p className="font-sans" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Digital systems used on Forex Drilling programs.
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Digital Platform</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>Krux</h3>
            <p className="mt-5 font-sans" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Data capture and reporting platform.
            </p>
          </div>
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Downhole Telemetry</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>MWD</h3>
            <p className="mt-5 font-sans" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Measurement While Drilling — downhole telemetry system.
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
        body="Forex Drilling provides the following drilling services:"
        items={drillingItems}
      />
      <CategorySection
        id="instrumentation" bg="white" number="02" label="Instrumentation"
        line1="Instrumentation" line2="installation."
        body="Forex Drilling installs the following instrumentation:"
        items={instrumentationItems}
      />
      <CategorySection
        id="downhole" bg="deep" number="03" label="Downhole Services"
        line1="Downhole" line2="services."
        body="Forex Drilling provides the following downhole services:"
        items={downholeItems}
      />
      <DataSection />
      <CtaBanner
        headline="Discuss your program."
        body="Tell us about scope, location, and timeline. We&rsquo;ll get back to you within one business day."
        cta="Get in touch"
        href="/contact"
      />
    </>
  );
}
