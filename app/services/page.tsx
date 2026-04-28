import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { services, type ServiceCategory } from "@/content/services";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { padNumber } from "@/lib/utils";
import { CtaBanner } from "@/components/sections/CtaBanner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "A full spectrum of drilling, instrumentation, downhole, and data acquisition services.",
};

const categoryLabels: Record<ServiceCategory, string> = {
  drilling: "Drilling Services",
  instrumentation: "Instrumentation",
  downhole: "Downhole Services",
  data: "Data Acquisition",
};

export default function ServicesPage() {
  const grouped = (Object.keys(categoryLabels) as ServiceCategory[]).map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    items: services.filter((s) => s.category === cat),
  }));

  return (
    <>
      <section className="pt-[calc(var(--spacing-nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>Services</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            A full spectrum of <span className="text-amber">specialist capabilities.</span>
          </h1>
          <p className="max-w-2xl text-body-lg text-subtle">
            From diamond and sonic drilling to instrumentation, downhole services, and digital data systems —
            everything we deploy is chosen to deliver reliable, high-quality outcomes in demanding
            environments.
          </p>
        </Container>
      </section>

      {grouped.map((group, gi) => (
        <section key={group.category} className={gi % 2 === 0 ? "bg-deep py-24" : "py-24"}>
          <Container className="flex flex-col gap-12">
            <SectionHeader index={padNumber(gi + 1)} label={group.label} title={group.label} />
            <Stagger className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((s, i) => (
                <StaggerItem key={s.slug}>
                  <ServiceCard
                    index={padNumber(i + 1)}
                    title={s.title}
                    summary={s.summary}
                    href={`/services/${s.slug}`}
                    className="h-full"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ))}

      <CtaBanner headline="Need a custom scope?" cta="Get in Touch" href="/contact" />
    </>
  );
}
