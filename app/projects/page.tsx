import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  CtaBanner,
  Reveal,
  DrillBitPin,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected drilling programs across the Asia-Pacific region.",
  // Page is currently a placeholder while real client case studies are
  // pending — keep it out of the index until the content is published.
  robots: { index: false, follow: true },
};

const deliveryFocus = [
  "Alignment with client technical and operational objectives",
  "Efficient mobilisation and setup",
  "Reliable day-to-day operations and structured reporting",
  "Close coordination with client technical and operational teams",
  "Transparent communication and proactive issue resolution",
];

function DeliveryApproachSection() {
  return (
    <section className="relative bg-white py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-12 px-6 md:gap-16 md:px-14">
        <Reveal className="flex max-w-[820px] flex-col gap-5">
          <SectionLabel number="01" label="Delivery Approach" />
          <SectionHeading line1="Drilling is critical" line2="to project success." />
          <p
            className="font-sans"
            style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.7", color: "var(--color-deep-navy)" }}
          >
            Our delivery model is built around a clear set of priorities that
            keep programs aligned, efficient, and predictable from
            mobilisation through demobilisation.
          </p>
        </Reveal>

        <Reveal>
          <ul className="grid gap-5 md:grid-cols-2 md:gap-x-12">
            {deliveryFocus.map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-border pt-5">
                <span className="flex shrink-0 pt-0.5" aria-hidden>
                  <DrillBitPin size={20} />
                </span>
                <span
                  className="font-sans font-medium text-deep-navy"
                  style={{ fontSize: "15px", lineHeight: "1.55" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="grid max-w-[1100px] gap-6 md:grid-cols-2 md:gap-12">
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We maintain a hands-on, solution-driven approach throughout each
            project. We engage early, understand project challenges in detail,
            and remain actively involved to ensure issues are addressed before
            they impact delivery.
          </p>
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Where required, we go beyond drilling execution to support broader
            project needs &mdash; contributing to planning, problem-solving,
            and overall project performance. From planning through to
            execution, our objective is to deliver outcomes that meet both
            technical requirements and operational expectations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  return (
    <section className="relative bg-deep py-16 md:py-32">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:px-14">
        <Reveal className="flex max-w-[820px] flex-col gap-5">
          <SectionLabel number="02" label="Case Studies" />
          <SectionHeading line1="Coming" line2="soon." />
          <p
            className="font-sans"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-on-navy-muted)" }}
          >
            Project case studies will be published here. To discuss specific
            programs or references in the meantime, please get in touch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

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

      <DeliveryApproachSection />
      <CaseStudiesSection />

      <CtaBanner
        headline="Planning a program in the region?"
        body="Mining, exploration, civil, groundwater. Tell us where, when, and what — we&rsquo;ll propose how."
        cta="Discuss your program"
        href="/contact"
      />
    </>
  );
}
