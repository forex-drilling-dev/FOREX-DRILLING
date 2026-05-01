import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  YellowBadge,
  SectionHeading,
  Crosshair,
  BgGreyShape,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss your drilling program with the Forex Drilling team — based in Singapore, operating across the Asia-Pacific region.",
};

export default function ContactPage() {
  return (
    <section className="relative bg-white pt-[calc(var(--spacing-nav)+48px)] pb-32">
      <BgGreyShape className="top-[80px] right-[-100px] hidden lg:block" />
      <Crosshair size={36} className="absolute top-[120px] right-[120px] hidden lg:block" />

      <div className="relative mx-auto grid max-w-[1280px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-14">
        {/* Left — info */}
        <div className="flex flex-col gap-8 md:col-span-5">
          <YellowBadge className="self-start">CONTACT</YellowBadge>
          <SectionHeading line1="Let&rsquo;s discuss" line2="your program." />

          <p
            className="font-display"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Whether you have a program to discuss, a technical question, or want
            to understand how we can support your project — we&rsquo;re ready to engage.
            Tell us about scope, location, and timeline, and we&rsquo;ll get back to
            you within one business day.
          </p>

          <dl className="mt-2 flex flex-col gap-6 border-t border-border pt-8">
            <div>
              <dt
                className="font-display font-bold uppercase text-amber"
                style={{ fontSize: "11px", letterSpacing: "0.18em" }}
              >
                Headquarters
              </dt>
              <dd
                className="mt-2 font-display text-deep-navy"
                style={{ fontSize: "16px" }}
              >
                Singapore
              </dd>
            </div>
            <div>
              <dt
                className="font-display font-bold uppercase text-amber"
                style={{ fontSize: "11px", letterSpacing: "0.18em" }}
              >
                Operations
              </dt>
              <dd
                className="mt-2 font-display text-deep-navy"
                style={{ fontSize: "16px" }}
              >
                Papua New Guinea · Asia-Pacific
              </dd>
            </div>
            <div>
              <dt
                className="font-display font-bold uppercase text-amber"
                style={{ fontSize: "11px", letterSpacing: "0.18em" }}
              >
                Scope
              </dt>
              <dd
                className="mt-2 font-display text-deep-navy"
                style={{ fontSize: "16px" }}
              >
                Mining · Exploration · Civil · Groundwater
              </dd>
            </div>
            <div>
              <dt
                className="font-display font-bold uppercase text-amber"
                style={{ fontSize: "11px", letterSpacing: "0.18em" }}
              >
                Email
              </dt>
              <dd className="mt-2">
                <a
                  href="mailto:contact@forexdrilling.com"
                  className="font-display text-deep-navy transition-colors duration-200 hover:text-amber"
                  style={{ fontSize: "16px" }}
                >
                  contact@forexdrilling.com
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right — form */}
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
