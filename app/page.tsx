import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/Link";
import { Tag } from "@/components/ui/Tag";
import { Blob } from "@/components/ui/Blob";
import { CircleImage } from "@/components/ui/CircleImage";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { MarqueeBanner } from "@/components/sections/MarqueeBanner";
import { StatCard } from "@/components/sections/StatCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { PillarCard } from "@/components/sections/PillarCard";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { StepItem } from "@/components/sections/StepItem";
import { CtaBanner } from "@/components/sections/CtaBanner";

// ─── Section 1 — Hero ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/hero-night-site.jpg"
        alt="Forex Drilling night operation — multi-rig site"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Gradient overlay: heavy at bottom, lighter at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-20 pt-[calc(var(--spacing-nav)+6rem)]">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Left column */}
          <div className="flex flex-col gap-10 md:col-span-8">
            <FadeIn>
              <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">
                SINGAPORE · ASIA-PACIFIC
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="font-display text-display-xl uppercase leading-[0.88]">
                <span className="block text-fore">BUILT TO</span>
                <span className="block text-ocre-400">DELIVER.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="max-w-lg text-body-lg text-fore/80">
                Specialized drilling services across the Asia-Pacific region. Based in Singapore
                with operations spanning the region, Forex Drilling supports major mining,
                greenfield exploration, and civil projects in demanding environments where accuracy,
                safety, and reliability are non-negotiable.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="flex flex-wrap items-center gap-6">
              <Button href="/services" variant="amber">Our Services →</Button>
              <Button href="/about" variant="ghost">Learn more</Button>
            </FadeIn>
          </div>

          {/* Right column — floating stats card */}
          <FadeIn delay={0.4} className="md:col-span-4">
            <div className="flex flex-col gap-8 border border-border bg-surface/80 p-8 backdrop-blur-md">
              <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">
                // OPERATIONAL PROFILE
              </p>
              <StatCard
                staticValue="SG"
                label="Headquarters · Singapore"
              />
              <StatCard
                value={12}
                suffix="+"
                label="Methods & Associated Services"
              />
              <StatCard
                staticValue="AP"
                label="Operations · Asia-Pacific"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

// ─── Section 2 — Marquee Trust Bar ───────────────────────────────────────────

const marqueeItems = [
  "DIAMOND DRILLING",
  "SONIC DRILLING",
  "DIRECTIONAL DRILLING",
  "RC DRILLING",
  "INSTRUMENTATION",
  "MWD SYSTEMS",
  "KRUX DATA",
  "GEOPHYSICAL LOGGING",
  "SPT",
  "GROUNDWATER PROGRAMS",
  "GREENFIELD EXPLORATION",
  "CIVIL WORKS",
];

// ─── Section 3 — About Teaser ─────────────────────────────────────────────────

function AboutTeaser() {
  return (
    <section className="bg-deep py-32">
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-12">
          {/* Left — image with blob */}
          <div className="relative md:col-span-5">
            <CircleImage
              src="/images/rig-vertical-operator.jpg"
              alt="Operator in front of drilling rig"
              size={480}
              priority={false}
            />
            <Blob
              variant="ocre"
              size="300px"
              className="absolute -bottom-12 -left-12 opacity-20 blob-morph"
            />
            {/* Floating badge */}
            <div className="absolute bottom-8 right-0 bg-amber px-4 py-2">
              <span className="font-mono text-mono-xs uppercase tracking-widest text-black">
                FIELD-PROVEN SOLUTIONS
              </span>
            </div>
          </div>

          {/* Right — copy */}
          <div className="flex flex-col gap-10 md:col-span-7">
            <FadeIn>
              <Tag>// 01 — ABOUT US</Tag>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-display-lg uppercase text-fore">
                Specialist Drilling.
                <br />
                Demanding Environments.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-body-lg text-muted">
                Forex Drilling is a Singapore-based specialist drilling contractor operating across
                the Asia-Pacific region. We combine technical depth with genuine field experience
                to deliver reliable results on complex programs.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-body-lg text-muted">
                From greenfield exploration in remote PNG highlands to instrumentation programs on
                major civil infrastructure, our crews are built for environments where failure
                is not an option.
              </p>
            </FadeIn>
            <Stagger className="flex flex-col gap-6">
              <StaggerItem>
                <PillarCard
                  title="Technical Capability"
                  body="Multi-method drilling expertise — diamond, sonic, directional, RC, and specialized instrumentation across geology and civil."
                />
              </StaggerItem>
              <StaggerItem>
                <PillarCard
                  title="Operational Reliability"
                  body="Structured mobilisation, KPI-backed execution, and proactive communication — so programs run on time and on budget."
                />
              </StaggerItem>
              <StaggerItem>
                <PillarCard
                  title="Safety Culture"
                  body="HSE is embedded at every level — from PTW and JSA systems to daily TBX and Take 5 practices in the field."
                />
              </StaggerItem>
            </Stagger>
            <FadeIn delay={0.4}>
              <ArrowLink href="/about">About Forex Drilling</ArrowLink>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Section 4 — Services Preview ────────────────────────────────────────────

function ServicesPreview() {
  return (
    <section className="bg-black py-32">
      <Container>
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            index="02"
            label="Our Services"
            title="Precision methods. Proven results."
          />
          <ArrowLink href="/services">View All →</ArrowLink>
        </div>
        <Stagger className="grid gap-6 md:grid-cols-2">
          <StaggerItem>
            <ServiceCard
              index="01 // Diamond & Sonic Drilling"
              title="Diamond & Sonic Drilling"
              summary="High-recovery core and sonic drilling for precise geological and geotechnical data."
              href="/services/diamond-drilling"
            />
          </StaggerItem>
          <StaggerItem>
            <ServiceCard
              index="02 // Directional & Horizontal Drilling"
              title="Directional & Horizontal Drilling"
              summary="Deviation control, directional coring and depressurisation programs."
              href="/services/directional-drilling"
            />
          </StaggerItem>
          <StaggerItem>
            <ServiceCard
              index="03 // Instrumentation Installation"
              title="Instrumentation Installation"
              summary="VWPs, inclinometers, monitoring systems — installed and commissioned."
              href="/services/instrumentation-installation"
            />
          </StaggerItem>
          <StaggerItem>
            <ServiceCard
              index="04 // Data Acquisition & Digital Systems"
              title="Data Acquisition & Digital Systems"
              summary="Krux, MWD, and structured digital workflows for reliable field data."
              href="/services/data-acquisition"
            />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}

// ─── Section 5 — Fleet Teaser ─────────────────────────────────────────────────

function FleetTeaser() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/rig-horizontal.jpg"
        alt="Forex Drilling horizontal rig"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Left-to-right gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

      {/* Content panel */}
      <div className="relative z-10 flex min-h-[70vh] items-center">
        <Container>
          <div className="max-w-xl py-24">
            <FadeIn>
              <Tag>// 03 — FLEET &amp; CAPABILITIES</Tag>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-8 font-display text-display-lg uppercase text-fore">
                Modern Equipment.
                <br />
                Reliable Performance.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-8 text-body-lg text-muted">
                Our fleet spans sonic, diamond, directional, and multipurpose rigs — maintained to
                the highest standards and deployable across single and multi-rig programs. Equipment
                built for the work. Not just the brochure.
              </p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <span className="bg-amber px-4 py-2 font-mono text-mono-xs uppercase tracking-widest text-black">
                Dual Head Sonic/Diamond
              </span>
              <span className="bg-amber px-4 py-2 font-mono text-mono-xs uppercase tracking-widest text-black">
                Multi-Rig Deployment
              </span>
            </FadeIn>
            <FadeIn delay={0.4} className="mt-10">
              <ArrowLink href="/fleet">View Our Fleet</ArrowLink>
            </FadeIn>
          </div>
        </Container>
      </div>
    </section>
  );
}

// ─── Section 6 — HSE Statement ────────────────────────────────────────────────

const hseProtocols = [
  { code: "SOP", label: "Standard Operating Procedure" },
  { code: "JSA", label: "Job Safety Analysis" },
  { code: "PTW", label: "Permit to Work" },
  { code: "TAKE 5", label: "Take 5 Self-Risk Assessment" },
  { code: "TBX", label: "Toolbox Talk" },
  { code: "PPE", label: "Personal Protective Equipment" },
];

function HseStatement() {
  return (
    <section className="bg-surface py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">
              // 04 — HEALTH, SAFETY &amp; ENVIRONMENT
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote className="mt-12 font-display text-display-lg uppercase leading-[0.92]">
              <span className="block text-fore">SAFETY IS NOT</span>
              <span className="block text-fore">A PROCEDURE.</span>
              <span className="block text-fore">IT&apos;S HOW WE</span>
              <span className="block text-ocre-400">OPERATE.</span>
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-body-lg text-muted">
              Our HSE framework is built from the ground up — not bolted on. Every crew member
              is trained, empowered, and expected to uphold the highest standards on every shift,
              in every environment.
            </p>
          </FadeIn>

          {/* Protocol badges */}
          <Stagger className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-2 md:grid-cols-3">
            {hseProtocols.map((p) => (
              <StaggerItem key={p.code}>
                <div className="border border-border bg-deep px-6 py-4 text-center">
                  <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">
                    {p.code}
                  </p>
                  <p className="mt-2 text-body text-muted">{p.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

// ─── Section 7 — Project Delivery Steps ──────────────────────────────────────

function ProjectApproach() {
  return (
    <section className="bg-black py-32">
      <Container>
        <FadeIn>
          <SectionHeader
            index="05"
            label="Our Approach"
            title="Hands-on, solution-driven delivery."
          />
        </FadeIn>
        <Stagger className="mt-16 grid gap-8 md:grid-cols-4">
          <StaggerItem>
            <StepItem
              number="01"
              title="Early Engagement"
              body="We engage at planning stage to understand constraints, identify risks, and align on method before mobilisation."
            />
          </StaggerItem>
          <StaggerItem>
            <StepItem
              number="02"
              title="Efficient Mobilisation"
              body="Structured setup to get productive on site as quickly as possible — with the right crew, equipment, and documentation."
            />
          </StaggerItem>
          <StaggerItem>
            <StepItem
              number="03"
              title="Reliable Execution"
              body="Day-to-day operations backed by KPIs and close coordination with your team to keep programs on track."
            />
          </StaggerItem>
          <StaggerItem>
            <StepItem
              number="04"
              title="Transparent Communication"
              body="Proactive issue resolution and clear reporting — no surprises, ever."
            />
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBanner items={marqueeItems} />
      <AboutTeaser />
      <ServicesPreview />
      <FleetTeaser />
      <HseStatement />
      <ProjectApproach />
      <CtaBanner
        headline="READY TO DISCUSS YOUR PROGRAM?"
        body="Contact us to explore how Forex Drilling can support your next project."
        cta="Get in Touch →"
        href="/contact"
      />
    </>
  );
}
