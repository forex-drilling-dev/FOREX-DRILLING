import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  YellowBadge,
  SectionHeading,
  BgGreyShape,
  Reveal,
  OperationsMap,
  SectionLink,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss your drilling program with the Forex Drilling team. Based in Singapore, operating across the Asia-Pacific region.",
};

export default function ContactPage() {
  // Re-used eyebrow label style across the info dl — kept compact and
  // amber-dim so the four facts read as data, not as four sub-sections.
  const dtCls = "font-display font-bold uppercase";
  const dtStyle = { fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-amber-dim)" } as const;

  return (
    <section className="relative overflow-hidden bg-white pt-[calc(var(--spacing-nav)+24px)] pb-16 md:pt-[calc(var(--spacing-nav)+48px)] md:pb-32">
      <BgGreyShape className="top-[80px] right-[-100px] hidden lg:block" />

      <div className="relative mx-auto grid grid-cols-1 max-w-[1500px] gap-10 px-5 md:grid-cols-12 md:gap-20 md:px-14">
        {/* Left — info. Two office addresses (HQ + operations) alongside scope
            and email, stacked as a single editorial column on every breakpoint
            — full-width addresses don't fit the old 2-col mobile grid. */}
        <Reveal className="flex flex-col gap-5 md:col-span-5 md:gap-8">
          <YellowBadge size="sm" className="self-start md:hidden">CONTACT</YellowBadge>
          <YellowBadge className="hidden self-start md:inline-flex">CONTACT</YellowBadge>

          <SectionHeading as="h1" line1="Let&rsquo;s discuss" line2="your program." />

          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.6", color: "var(--color-muted)" }}
          >
            Whether you have a program to discuss, a technical question, or want
            to understand how we can support your project, we&rsquo;re ready to engage.
            Tell us about scope, location, and timeline, and we&rsquo;ll get back to
            you within one business day.
          </p>

          <dl className="mt-1 flex flex-col gap-5 border-t border-border pt-6 md:gap-6 md:pt-8">
            <div>
              <dt className={dtCls} style={dtStyle}>Headquarters</dt>
              <dd className="mt-1 font-sans text-deep-navy md:mt-2" style={{ fontSize: "15px", lineHeight: "1.65" }}>
                1 North Bridge Road, #11-04<br />
                High Street Centre<br />
                Singapore 179094
              </dd>
            </div>
            <div>
              <dt className={dtCls} style={dtStyle}>Operations</dt>
              <dd className="mt-1 font-sans text-deep-navy md:mt-2" style={{ fontSize: "15px", lineHeight: "1.65" }}>
                Level 5, Avara Annex Building<br />
                Brampton Street<br />
                Port Moresby, Moresby South District<br />
                National Capital District<br />
                Papua New Guinea
              </dd>
            </div>
            <div>
              <dt className={dtCls} style={dtStyle}>Scope</dt>
              <dd className="mt-1 font-sans text-deep-navy md:mt-2" style={{ fontSize: "15px" }}>
                Mining · Exploration · Civil · Groundwater · Geothermal
              </dd>
            </div>
            <div>
              <dt className={dtCls} style={dtStyle}>Email</dt>
              <dd className="mt-1 md:mt-2">
                <a
                  href="mailto:admin@forexdrilling.com"
                  className="font-sans text-deep-navy transition-colors duration-200 hover:text-[var(--color-amber-dim)]"
                  style={{ fontSize: "15px" }}
                >
                  admin@forexdrilling.com
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        {/* Right — form */}
        <Reveal className="md:col-span-7" delay={120}>
          <ContactForm />
        </Reveal>

        {/* Operations map — full width below the form/info columns */}
        <Reveal className="md:col-span-12" delay={180}>
          <div className="mt-4 flex flex-col gap-4 md:mt-8">
            <p
              className="font-display font-bold uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--color-amber-dim)" }}
            >
              Where we operate
            </p>
            <OperationsMap />
          </div>
        </Reveal>

        {/* Close the journey — /contact was a dead-end. Send the visitor
            back to the homepage so the next exploration starts naturally. */}
        <Reveal className="md:col-span-12" delay={240}>
          <div className="mt-12 flex justify-center md:mt-16">
            <SectionLink href="/" label="Back to home" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
