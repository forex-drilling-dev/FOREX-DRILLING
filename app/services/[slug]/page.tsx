import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { padNumber } from "@/lib/utils";
import { FadeIn } from "@/components/motion/FadeIn";
import { Check } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="pt-[calc(var(--spacing-nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>{service.category.toUpperCase()}</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.9] text-balance">
            {service.title}
          </h1>
          <p className="max-w-3xl text-body-lg text-subtle">{service.summary}</p>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeader index="01" label="Overview" title="What we deliver." />
          </div>
          <FadeIn as="p" className="text-body-lg text-subtle md:col-span-8">
            {service.body}
          </FadeIn>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeader index="02" label="Applications" title="Where it fits." />
          </div>
          <ul className="flex flex-col gap-4 md:col-span-8">
            {service.applications.map((a, i) => (
              <FadeIn
                as="li"
                key={a}
                delay={i * 0.05}
                className="flex items-start gap-4 border-t border-border pt-4"
              >
                <Check className="h-5 w-5 shrink-0 text-amber" aria-hidden />
                <span className="text-body-lg text-fore">{a}</span>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-deep py-24">
          <Container className="flex flex-col gap-12">
            <SectionHeader index="03" label="Related" title="Services we often deploy together." />
            <div className="grid gap-px bg-border md:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard
                  key={s.slug}
                  index={padNumber(i + 1)}
                  title={s.title}
                  summary={s.summary}
                  href={`/services/${s.slug}`}
                  className="h-full"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBanner headline="Have a program that needs this scope?" cta="Request a Quote" href="/contact" />
    </>
  );
}
