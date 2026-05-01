import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  CtaBanner,
  Reveal,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected drilling programs across the Asia-Pacific region.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        badge="PROJECTS"
        line1="Selected"
        line2="programs."
        photo={{
          src: "/images/site-aerial-trees.jpg",
          alt: "Drilling site",
        }}
        body={
          <>
            Forex Drilling supports mining, exploration, civil infrastructure,
            and groundwater programs across the Asia-Pacific region.
          </>
        }
      />

      <section className="relative bg-deep py-16 md:py-32">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:px-14">
          <Reveal className="flex flex-col gap-5 max-w-[700px]">
            <SectionLabel number="01" label="Case Studies" />
            <SectionHeading line1="Coming" line2="soon." />
            <p
              className="font-sans"
              style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}
            >
              Project case studies will be published here. To discuss specific
              programs or references in the meantime, please get in touch.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        headline="Discuss your program."
        body="Tell us about scope, location, and timeline. We&rsquo;ll get back to you within one business day."
        cta="Get in touch"
        href="/contact"
      />
    </>
  );
}
