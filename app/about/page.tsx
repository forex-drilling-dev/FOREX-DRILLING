import type { Metadata } from "next";
import Image from "next/image";
import {
  NavyBlob,
  YellowBadge,
  CircleImageRing,
  IndexNumber,
  SectionLabel,
  SectionHeading,
  PillarCard,
  CtaBanner,
  Crosshair,
  BgGreyShape,
  DrillBitPin,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "About",
  description:
    "Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil projects across the Asia-Pacific region.",
};

// ─── HERO — editorial poster spread ─────────────────────────────────────────

function AboutHero() {
  return (
    <section className="relative bg-white pt-[calc(var(--spacing-nav)+48px)] pb-20 md:pb-32">
      <BgGreyShape className="top-[80px] right-[-100px] hidden lg:block" />
      <Crosshair size={36} className="absolute top-[120px] right-[120px] hidden lg:block" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-14">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="relative md:col-span-7">
            <YellowBadge className="relative z-20 -mb-6 ml-4 lg:-mb-8">
              ABOUT
            </YellowBadge>

            <NavyBlob className="relative z-10 h-auto w-full max-w-[640px]">
              <p
                className="font-display font-extrabold uppercase leading-[1.1] text-on-navy"
                style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px" }}
              >
                Specialist drilling.
              </p>
              <p
                className="font-display font-extrabold uppercase leading-[1.1] text-amber"
                style={{
                  fontSize: "clamp(28px, 4vw, 38px)",
                  letterSpacing: "0.5px",
                  marginBottom: "26px",
                }}
              >
                Built for the field.
              </p>
              <p
                className="font-display font-normal text-on-navy-muted"
                style={{ fontSize: "13px", lineHeight: "1.7", maxWidth: "440px" }}
              >
                Forex Drilling is a specialist drilling contractor supporting
                mining, exploration, and civil projects with a broad range of
                drilling services. Headquartered in Singapore and operating
                across the Asia-Pacific region, the company is structured to
                deliver efficient, field-proven solutions in remote and
                challenging environments.
              </p>
            </NavyBlob>
          </div>

          <div className="flex flex-col items-end gap-6 md:col-span-5 md:pt-12">
            <CircleImageRing
              src="/images/sunset-rig.jpg"
              alt="Drilling rig at sunset"
              size={300}
              ringOffset={20}
            />
            <IndexNumber label="EST." index="17" code="003" className="mr-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHO WE ARE — body paragraphs ───────────────────────────────────────────

function WhoWeAre() {
  return (
    <section className="relative bg-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
        <div className="flex flex-col gap-5 md:col-span-4">
          <SectionLabel number="01" label="Who We Are" />
          <SectionHeading
            line1="Strong field"
            line2="experience."
          />
        </div>
        <div className="flex flex-col gap-6 md:col-span-8">
          <p
            className="font-display"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-fore)" }}
          >
            Our team combines strong operational experience with a clear
            understanding of geotechnical, hydrogeological, grade control,
            structural geology, resource geology, and exploration requirements.
          </p>
          <p
            className="font-display"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Each drilling program is executed with the objective of producing
            reliable, high-quality geological data that supports high-confidence
            geological interpretation. This data underpins geotechnical,
            environmental, groundwater, grade control, and resource modelling,
            and informs critical engineering decisions.
          </p>
          <p
            className="font-display"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            We work closely with our clients from early stages through execution
            — understanding project constraints, identifying risks, and proposing
            practical, solution-driven approaches. From selecting the right
            drilling methods to delivering fully integrated or turnkey projects
            when required, we consistently aim to go beyond minimum requirements
            to ensure successful outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── OPERATING MODEL — 3 pillars detailed ──────────────────────────────────

function OperatingModel() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-14 px-6 md:px-14">
        <div className="flex flex-col gap-5 max-w-[700px]">
          <SectionLabel number="02" label="Operating Model" />
          <SectionHeading
            line1="Three pillars"
            line2="underpin everything."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <PillarCard number="01" title="Versatility">
            We prioritise deploying crews and equipment capable of covering
            multiple scopes of work, reducing the need for multiple rigs on
            site. This improves efficiency, reduces downtime, and simplifies
            project execution in often complex environments.
          </PillarCard>
          <PillarCard number="02" title="Resilience">
            Built into how we operate — through our people, our equipment, and
            our systems. We are structured to maintain performance under
            pressure, adapt to changing ground conditions, and continue
            delivering safely and reliably in challenging environments.
          </PillarCard>
          <PillarCard number="03" title="Reliability">
            Structured preventative maintenance programs, regular inspections,
            and disciplined field practices ensure high rig availability,
            consistent productivity, and dependable project delivery.
          </PillarCard>
        </div>
      </div>
    </section>
  );
}

// ─── MAINTENANCE — image + text spread ─────────────────────────────────────

function MaintenanceSection() {
  return (
    <section className="relative overflow-hidden bg-deep py-24 md:py-32">
      <div className="mx-auto grid max-w-[1280px] gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-14">
        <div className="md:col-span-6 md:order-2">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -top-5 -left-5 h-[calc(100%+40px)] w-[calc(100%+40px)] rounded-2xl border border-surface/30"
            />
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
              style={{ boxShadow: "var(--shadow-image)" }}
            >
              <Image
                src="/images/drill-head-closeup.jpg"
                alt="Drill head — maintenance close-up"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:col-span-6 md:order-1">
          <SectionLabel number="03" label="Equipment Reliability" />
          <SectionHeading
            line1="Maintenance"
            line2="is a core priority."
          />
          <p
            className="font-display"
            style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--color-muted)" }}
          >
            Equipment reliability is critical to performance. We place strong
            emphasis on maintenance, with structured preventative maintenance
            programs, regular inspections, and disciplined field practices.
          </p>
          <ul className="flex flex-col gap-3 mt-2">
            {[
              "High rig availability",
              "Consistent productivity",
              "Dependable project delivery",
              "Performance under changing ground conditions",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex shrink-0 pt-0.5" aria-hidden>
                  <DrillBitPin size={20} />
                </span>
                <span
                  className="font-display font-medium text-deep-navy"
                  style={{ fontSize: "15px", lineHeight: "1.55" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <OperatingModel />
      <MaintenanceSection />
      <CtaBanner
        headline="Want to work with us?"
        body="From planning through to execution — let's discuss how Forex Drilling can support your next project."
        cta="Contact the Team"
        href="/contact"
      />
    </>
  );
}
