import { Container } from "@/components/ui/Container";
import { SectionHeader } from "./SectionHeader";
import { ServiceCard } from "./ServiceCard";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { ArrowLink } from "@/components/ui/Link";

const preview = [
  {
    index: "01",
    title: "Diamond Drilling",
    summary: "High-recovery core drilling for precise geological and geotechnical data.",
    href: "/services/diamond-drilling",
  },
  {
    index: "02",
    title: "Instrumentation Installation",
    summary: "VWPs, inclinometers, and monitoring systems — installed and commissioned.",
    href: "/services/instrumentation-installation",
  },
  {
    index: "03",
    title: "Data Acquisition",
    summary: "Krux, MWD, and structured digital workflows for reliable field data.",
    href: "/services/data-acquisition",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-32">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader index="03" label="Our Services" title="A full spectrum of specialist capabilities." />
          <ArrowLink href="/services">All Services</ArrowLink>
        </div>
        <Stagger className="grid gap-px bg-border md:grid-cols-3">
          {preview.map((s) => (
            <StaggerItem key={s.index}>
              <ServiceCard {...s} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
