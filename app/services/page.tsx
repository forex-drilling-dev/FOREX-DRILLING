import type { Metadata } from "next";
import {
  NavyBlob,
  YellowBadge,
  CircleImageRing,
  IndexNumber,
  SectionLabel,
  SectionHeading,
  ServiceListGroup,
  CtaBanner,
  Crosshair,
  BgGreyShape,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A comprehensive range of drilling and associated services — drilling, instrumentation, downhole, and data acquisition.",
};

function ServicesHero() {
  return (
    <section className="relative bg-white pt-[calc(var(--spacing-nav)+48px)] pb-20 md:pb-32">
      <BgGreyShape className="top-[80px] right-[-100px] hidden lg:block" />
      <Crosshair size={36} className="absolute top-[120px] right-[120px] hidden lg:block" />
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-14">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="relative md:col-span-7">
            <YellowBadge className="relative z-20 -mb-6 ml-4 lg:-mb-8">SERVICES</YellowBadge>
            <NavyBlob className="relative z-10 h-auto w-full max-w-[640px]">
              <p className="font-display font-extrabold uppercase leading-[1.1] text-on-navy" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px" }}>
                A full spectrum
              </p>
              <p className="font-display font-extrabold uppercase leading-[1.1] text-amber" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px", marginBottom: "26px" }}>
                of capabilities.
              </p>
              <p className="font-display font-normal text-on-navy-muted" style={{ fontSize: "13px", lineHeight: "1.7", maxWidth: "440px" }}>
                Forex Drilling provides a comprehensive range of drilling and
                associated services — chosen to deliver reliable, high-quality
                outcomes in demanding environments across mining, exploration,
                civil, and groundwater programs.
              </p>
            </NavyBlob>
          </div>
          <div className="flex flex-col items-end gap-6 md:col-span-5 md:pt-12">
            <CircleImageRing
              src="/images/rig-vertical-clean.jpg"
              alt="Forex Drilling rig — vertical product shot"
              size={300}
              ringOffset={20}
            />
            <IndexNumber label="EST." index="17" code="004" className="mr-4" />
          </div>
        </div>
      </div>
    </section>
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
  "Downhole surveying — gyro, core orientation, deviation control",
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
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <div className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number={number} label={label} />
          <SectionHeading line1={line1} line2={line2} />
          <p className="font-display" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            {body}
          </p>
        </div>
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
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14 px-6 md:px-14">
        <div className="flex flex-col gap-5 max-w-[760px]">
          <SectionLabel number="04" label="Data Acquisition" />
          <SectionHeading line1="Krux & MWD." line2="Reliable, structured data." />
          <p className="font-display" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Forex Drilling integrates advanced data acquisition systems to
            improve accuracy, traceability, and overall drilling outcomes.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Digital Platform</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>Krux</h3>
            <p className="mt-5 font-display" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Digital platform for data collection, reporting, and operational
              monitoring — ensuring drilling data is captured accurately and
              consistently throughout the project, with structured outputs ready
              for client technical teams.
            </p>
          </div>
          <div className="border-l-4 border-amber pl-8">
            <p className="font-display font-bold uppercase text-amber" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>Downhole Telemetry</p>
            <h3 className="mt-3 font-display font-black uppercase text-deep-navy" style={{ fontSize: "36px", letterSpacing: "-0.005em", lineHeight: "1" }}>MWD</h3>
            <p className="mt-5 font-display" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
              Measurement While Drilling collects downhole parameters during
              operations. When properly interpreted, this data provides valuable
              insights into ground conditions, supports geological and
              geotechnical understanding, and enhances decision-making.
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
        line1="Drilling" line2="methods."
        body="From diamond and sonic to RC and rotary — chosen to match the geology, access, and outcome required for each program."
        items={drillingItems}
      />
      <CategorySection
        id="instrumentation" bg="white" number="02" label="Instrumentation"
        line1="Monitoring" line2="systems."
        body="VWPs, inclinometers, and standpipe piezometers — installed, commissioned, and verified by experienced crews."
        items={instrumentationItems}
      />
      <CategorySection
        id="downhole" bg="deep" number="03" label="Downhole Services"
        line1="Borehole" line2="integrity & data."
        body="Geophysical logging and surveying to support geological understanding and verify borehole integrity."
        items={downholeItems}
      />
      <DataSection />
      <CtaBanner
        headline="Need a custom scope?"
        body="Tell us about your program — we&rsquo;ll propose the right combination of methods, crews, and equipment."
        cta="Get in Touch"
        href="/contact"
      />
    </>
  );
}
