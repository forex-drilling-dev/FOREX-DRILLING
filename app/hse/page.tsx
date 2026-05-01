import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  QuoteBlock,
  ProtocolGrid,
  CtaBanner,
  Reveal,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "HSE — Health, Safety & Environment",
  description:
    "Safety is at the core of our operations. Structured systems, certified personnel, and continuous improvement.",
};

const protocols = [
  { code: "SOP", label: "Standard Operating Procedures" },
  { code: "JSA", label: "Job Safety Analysis" },
  { code: "PTW", label: "Permit to Work" },
  { code: "T5", label: "Take 5 Risk Assessment" },
  { code: "TBX", label: "Toolbox Meetings" },
  { code: "PPE", label: "Full PPE Compliance" },
];

function HseHero() {
  return (
    <PageHero
      badge="HSE"
      line1="Health, Safety"
      line2="& Environment."
      photo={{
        src: "/images/hero-night-site.jpg",
        alt: "Forex Drilling site operation",
      }}
      body={
        <>
          Forex Drilling operates in strict compliance with client safety
          standards, site procedures, and regulatory requirements. Every
          activity is conducted under structured safety management systems.
        </>
      }
    />
  );
}

function QuoteSection() {
  return (
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-14">
        <QuoteBlock line1="Safety at the core" line2="of our operations.">
          All personnel are trained, certified, and competent for their roles.
        </QuoteBlock>
      </div>
    </section>
  );
}

function ProtocolsSection() {
  return (
    <section className="relative bg-white py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
        <Reveal className="flex flex-col gap-5 max-w-[700px]">
          <SectionLabel number="01" label="Protocols" />
          <SectionHeading line1="Structured systems" line2="on every job." />
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            All activities are conducted under structured safety management
            systems including the following:
          </p>
        </Reveal>
        <ProtocolGrid items={protocols} />
      </div>
    </section>
  );
}

function CommitmentSection() {
  return (
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto grid grid-cols-1 max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <Reveal className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number="02" label="Commitment" />
          <SectionHeading line1="Continuous" line2="improvement, embedded." />
        </Reveal>
        <div className="flex flex-col gap-6 md:col-span-7">
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-fore)" }}>
            All personnel are trained, certified, and competent for their roles. They actively participate in client-led safety reviews, audits, and
            continuous improvement processes.
          </p>
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We are committed to continuously improving safety performance through
            the adoption of better practices, technologies, and equipment. This
            includes the implementation of rod handling systems and other
            innovations aimed at reducing manual handling, minimizing exposure
            to hazards, and improving overall operational safety.
          </p>
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Environmental responsibility is integrated into our operations
            through proper waste management, site protection measures, and full
            compliance with environmental regulations.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HsePage() {
  return (
    <>
      <HseHero />
      <QuoteSection />
      <ProtocolsSection />
      <CommitmentSection />
      <CtaBanner
        headline="Discuss your program."
        body="Tell us about scope, location, and timeline. We&rsquo;ll get back to you within one business day."
        cta="Get in touch"
        href="/contact"
      />
    </>
  );
}
