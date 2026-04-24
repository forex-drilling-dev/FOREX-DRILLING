import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "./SectionHeader";
import { PillarCard } from "./PillarCard";
import { ArrowLink } from "@/components/ui/Link";
import { FadeIn } from "@/components/motion/FadeIn";

export function AboutTeaser() {
  return (
    <section className="bg-deep py-32">
      <Container className="grid gap-16 md:grid-cols-12">
        <FadeIn className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden border border-border">
            <Image
              src="https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=1200"
              alt="Drilling operation in remote terrain"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </FadeIn>
        <div className="flex flex-col gap-10 md:col-span-7">
          <SectionHeader index="02" label="About Us" title="Built for demanding environments." />
          <p className="max-w-2xl text-body-lg text-subtle">
            Forex Drilling is a specialist drilling contractor supporting mining, exploration, and civil projects.
            Headquartered in Singapore and operating in Papua New Guinea, we combine strong operational experience
            with a deep understanding of geotechnical, hydrogeological, and exploration requirements.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <PillarCard title="Versatility" body="Crews and rigs capable of covering multiple scopes on a single mobilisation." />
            <PillarCard title="Resilience" body="Built into our people, equipment, and systems to perform under pressure." />
            <PillarCard title="Reliability" body="Structured maintenance and disciplined field practice deliver consistent output." />
          </div>
          <ArrowLink href="/about">Read our full story</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
