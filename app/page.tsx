import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/Link";
import { Tag } from "@/components/ui/Tag";
import { HeroStats } from "@/components/sections/HeroStats";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { HseStatement } from "@/components/sections/HseStatement";
import { ProjectApproach } from "@/components/sections/ProjectApproach";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FadeIn } from "@/components/motion/FadeIn";
import { WebGLHero } from "@/components/three/WebGLHeroClient";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden pt-nav">
        <WebGLHero />
        <Container className="relative z-10 flex min-h-[calc(100svh-var(--spacing-nav))] flex-col justify-end pb-20 pt-20">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="flex flex-col gap-10 md:col-span-8">
              <FadeIn>
                <Tag>01 — Forex Drilling</Tag>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-display text-display-xl uppercase leading-[0.85] text-balance">
                  Built to<br /><span className="text-amber">Deliver.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="max-w-xl text-body-lg text-subtle">
                  Specialized drilling services across the Asia-Pacific region. Based in Singapore with operations in Papua New Guinea,
                  Forex Drilling supports major mining, greenfield exploration, and civil projects — in demanding environments where
                  accuracy, safety, and reliability are critical.
                </p>
              </FadeIn>
              <FadeIn delay={0.3} className="flex flex-wrap items-center gap-6">
                <Button href="/services" variant="amber">Our Services</Button>
                <ArrowLink href="/about">Learn more</ArrowLink>
              </FadeIn>
            </div>
            <FadeIn delay={0.4} className="md:col-span-4">
              <HeroStats />
            </FadeIn>
          </div>
        </Container>
      </section>
      <TrustBar />
      <AboutTeaser />
      <ServicesPreview />
      <HseStatement />
      <ProjectApproach />
      <CtaBanner
        headline="Ready to discuss your program?"
        body="We engage early, understand your constraints, and build the right crew and method mix for your site."
        cta="Get in Touch"
        href="/contact"
      />
    </>
  );
}
