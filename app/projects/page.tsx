import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  Reveal,
  DrillBitPin,
  SectionLink,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project Delivery Approach — Forex Drilling's delivery model for mining, exploration, civil, and groundwater programs across the Asia-Pacific region.",
  // Hold the placeholder out of the index until real client case studies
  // are published.
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
        <Reveal className="flex max-w-[820px] flex-col gap-6">
          <SectionLabel number="01" label="Project Delivery Approach" />
          <p
            className="font-display font-extrabold uppercase text-deep-navy"
            style={{ fontSize: "clamp(28px, 5vw, 40px)", lineHeight: "1.05", letterSpacing: "-0.005em" }}
          >
            We understand that drilling is critical to project success.
          </p>
          <p
            className="font-sans"
            style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.7", color: "var(--color-deep-navy)" }}
          >
            Our delivery model focuses on:
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

        <Reveal className="flex max-w-[820px] flex-col gap-5">
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            We maintain a hands-on, solution-driven approach throughout each
            project. We engage early, understand project challenges in detail,
            and remain actively involved to ensure issues are addressed before
            they impact delivery.
          </p>
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            Where required, we go beyond drilling execution to support broader
            project needs &mdash; contributing to planning, problem-solving,
            and overall project performance.
          </p>
          <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
            From planning through to execution, our objective is to deliver
            outcomes that meet both technical requirements and operational
            expectations.
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
        line1="Project Delivery"
        line2="Approach."
        photo={{
          src: "/images/site-aerial-trees.jpg",
          alt: "Aerial view of a Forex Drilling site cleared in dense forested terrain",
        }}
        body={
          <>
            We understand that drilling is critical to project success.
          </>
        }
      />

      <DeliveryApproachSection />
      <NextPageStrip />
    </>
  );
}

function NextPageStrip() {
  return (
    <section className="relative bg-deep py-14 md:py-20">
      <div className="mx-auto flex max-w-[1500px] justify-center px-6 md:px-14">
        <SectionLink href="/contact" label="Contact" />
      </div>
    </section>
  );
}
