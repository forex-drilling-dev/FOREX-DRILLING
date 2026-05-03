import { Container } from "@/components/ui/Container";
import { ProtocolBadge } from "./ProtocolBadge";
import { FadeIn } from "@/components/motion/FadeIn";

const protocols = [
  { code: "SOP", label: "Standard Operating Procedures" },
  { code: "JSEA", label: "Job Safety & Environmental Analysis" },
  { code: "PTW", label: "Permit to Work" },
  { code: "T5", label: "Take 5 Assessment" },
  { code: "TBX", label: "Toolbox Meetings" },
  { code: "PPE", label: "Full PPE Compliance" },
];

export function HseStatement() {
  return (
    <section className="bg-black py-32">
      <Container className="flex flex-col gap-16">
        <FadeIn>
          <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">04 — Health, Safety &amp; Environment</p>
          <blockquote className="mt-6 max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            &ldquo;Safety is not a procedure.<br />
            <span className="text-amber">It&rsquo;s how we operate.</span>&rdquo;
          </blockquote>
          <p className="mt-10 max-w-2xl text-body-lg text-subtle">
            All activities operate in strict compliance with client safety standards, site procedures, and regulatory requirements.
            Every role is trained, certified, and competent — and we continuously invest in better practices, equipment, and systems.
          </p>
        </FadeIn>
        <div className="grid gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
          {protocols.map((p) => (
            <ProtocolBadge key={p.code} code={p.code} label={p.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
