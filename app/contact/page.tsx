import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description: "Discuss your drilling program with the Forex Drilling team.",
};

export default function ContactPage() {
  return (
    <section className="pt-[calc(var(--spacing-nav)+6rem)] pb-32">
      <Container className="grid gap-20 md:grid-cols-12">

        {/* Left — info panel */}
        <FadeIn className="flex flex-col gap-8 md:col-span-5">
          <Tag>// Get in Touch</Tag>
          <h1 className="font-display text-display-lg uppercase leading-[0.92] text-fore text-balance">
            Start a conversation.
          </h1>
          <p className="text-body-lg text-muted">
            Whether you have a program to discuss, a technical question, or want to understand how we
            can support your project — we&rsquo;re ready to engage.
          </p>
          <dl className="flex flex-col gap-6 border-t border-border pt-8 text-body">
            <div>
              <dt className="font-mono text-mono-xs uppercase tracking-widest text-amber">Headquarters</dt>
              <dd className="mt-2 text-fore">Singapore</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase tracking-widest text-amber">Operations</dt>
              <dd className="mt-2 text-fore">Papua New Guinea · Asia-Pacific</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase tracking-widest text-amber">Scope</dt>
              <dd className="mt-2 text-fore">Mining · Exploration · Civil Works</dd>
            </div>
            <div>
              <dt className="font-mono text-mono-xs uppercase tracking-widest text-amber">Email</dt>
              <dd className="mt-2">
                <a href="mailto:contact@forexdrilling.com" className="text-fore hover:text-amber transition-colors duration-fast">
                  contact@forexdrilling.com
                </a>
              </dd>
            </div>
          </dl>
        </FadeIn>

        {/* Right — form */}
        <FadeIn delay={0.1} className="md:col-span-7">
          <ContactForm />
        </FadeIn>

      </Container>
    </section>
  );
}
