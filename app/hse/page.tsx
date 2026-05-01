import type { Metadata } from "next";
import {
  NavyBlob,
  YellowBadge,
  CircleImageRing,
  IndexNumber,
  SectionLabel,
  SectionHeading,
  QuoteBlock,
  ProtocolGrid,
  CtaBanner,
  Crosshair,
  BgGreyShape,
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
    <section className="relative bg-white pt-[calc(var(--spacing-nav)+48px)] pb-20 md:pb-32">
      <BgGreyShape className="top-[80px] right-[-100px] hidden lg:block" />
      <Crosshair size={36} className="absolute top-[120px] right-[120px] hidden lg:block" />
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-14">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="relative md:col-span-7">
            <YellowBadge className="relative z-20 -mb-6 ml-4 lg:-mb-8">HSE</YellowBadge>
            <NavyBlob className="relative z-10 h-auto w-full max-w-[640px]">
              <p className="font-display font-extrabold uppercase leading-[1.1] text-on-navy" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px" }}>
                Safety is not
              </p>
              <p className="font-display font-extrabold uppercase leading-[1.1] text-amber" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px", marginBottom: "26px" }}>
                a procedure.
              </p>
              <p className="font-display font-normal text-on-navy-muted" style={{ fontSize: "13px", lineHeight: "1.7", maxWidth: "440px" }}>
                Forex Drilling operates in strict compliance with client safety
                standards, site procedures, and regulatory requirements. Every
                activity is conducted under structured safety management systems.
              </p>
            </NavyBlob>
          </div>
          <div className="flex flex-col items-end gap-6 md:col-span-5 md:pt-12">
            <CircleImageRing
              src="/images/hero-night-site.jpg"
              alt="Forex Drilling night drilling operation"
              size={300}
              ringOffset={20}
              priority
            />
            <IndexNumber label="EST." index="17" code="006" className="mr-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-14">
        <QuoteBlock line1="It&rsquo;s how we" line2="operate.">
          Every role is trained, certified, and competent — and we continuously
          invest in better practices, equipment, and systems.
        </QuoteBlock>
      </div>
    </section>
  );
}

function ProtocolsSection() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14 px-6 md:px-14">
        <div className="flex flex-col gap-5 max-w-[700px]">
          <SectionLabel number="01" label="Protocols" />
          <SectionHeading line1="Structured systems" line2="on every job." />
          <p className="font-display" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            All activities are conducted under structured safety management
            systems including the following:
          </p>
        </div>
        <ProtocolGrid items={protocols} />
      </div>
    </section>
  );
}

function CommitmentSection() {
  return (
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <div className="flex flex-col gap-5 md:col-span-5">
          <SectionLabel number="02" label="Commitment" />
          <SectionHeading line1="Continuous" line2="improvement, embedded." />
        </div>
        <div className="flex flex-col gap-6 md:col-span-7">
          <p className="font-display" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-fore)" }}>
            All personnel are trained, certified, and competent for their roles.
            We actively participate in client-led safety reviews, audits, and
            continuous improvement processes.
          </p>
          <p className="font-display" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We are committed to continuously improving safety performance through
            the adoption of better practices, technologies, and equipment. This
            includes the implementation of rod handling systems and other
            innovations aimed at reducing manual handling, minimizing exposure
            to hazards, and improving overall operational safety.
          </p>
          <p className="font-display" style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}>
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
        headline="Looking for a safety-first drilling partner?"
        body="Discuss your safety standards with us — we operate in strict compliance and continuously invest in better practices."
        cta="Talk to Us"
        href="/contact"
      />
    </>
  );
}
