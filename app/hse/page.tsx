import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ProtocolBadge } from "@/components/sections/ProtocolBadge";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "HSE — Health, Safety & Environment",
  description: "Safety is at the core of our operations. Structured systems, certified personnel, and continuous improvement.",
};

const protocols = [
  { code: "SOP", label: "Standard Operating Procedures" },
  { code: "JSA", label: "Job Safety Analysis" },
  { code: "PTW", label: "Permit to Work" },
  { code: "T5",  label: "Take 5 Risk Assessment" },
  { code: "TBX", label: "Toolbox Meetings" },
  { code: "PPE", label: "Full PPE Compliance" },
];

export default function HsePage() {
  return (
    <>
      {/* Hero — night site image */}
      <section className="relative overflow-hidden pt-[calc(var(--spacing-nav)+6rem)] pb-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-night-site.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
        </div>
        <Container className="flex flex-col gap-10">
          <Tag>HSE</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.88] text-balance text-fore">
            Safety is not a procedure.<br />
            <span className="text-ocre-400">It&rsquo;s how we operate.</span>
          </h1>
          <p className="max-w-2xl text-body-lg text-muted">
            Forex Drilling operates in strict compliance with client safety standards, site procedures, and regulatory
            requirements. Every activity is conducted under structured safety management systems.
          </p>
        </Container>
      </section>

      {/* Protocol badges */}
      <section className="border-y border-border bg-surface py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeader index="01" label="Protocols" title="Structured systems on every job." />
          <div className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
            {protocols.map((p) => (
              <ProtocolBadge key={p.code} code={p.code} label={p.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* Commitment */}
      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionHeader index="02" label="Commitment" title="Continuous improvement, embedded." />
          </div>
          <FadeIn className="flex flex-col gap-6 text-body-lg text-muted md:col-span-7">
            <p>
              All personnel are trained, certified, and competent for their roles. We actively participate in client-led
              safety reviews, audits, and continuous improvement processes.
            </p>
            <p>
              We are committed to continuously improving safety performance through the adoption of better practices,
              technologies, and equipment. This includes rod handling systems and other innovations aimed at reducing
              manual handling, minimizing exposure to hazards, and improving overall operational safety.
            </p>
            <p>
              Environmental responsibility is integrated into our operations through proper waste management, site protection
              measures, and full compliance with environmental regulations.
            </p>
          </FadeIn>
        </Container>
      </section>

      <CtaBanner headline="Looking for a safety-first drilling partner?" cta="Talk to Us" href="/contact" />
    </>
  );
}
