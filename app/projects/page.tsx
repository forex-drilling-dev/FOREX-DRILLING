import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getProjects } from "@/lib/sanity";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { padNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected drilling programs across Asia-Pacific.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="pt-[calc(var(--spacing-nav)+6rem)] pb-24">
        <Container className="flex flex-col gap-10">
          <Tag>Projects</Tag>
          <h1 className="max-w-5xl font-display text-display-xl uppercase leading-[0.88] text-balance text-fore">
            Selected <span className="text-ocre-400">field programs.</span>
          </h1>
        </Container>
      </section>

      <section className="border-y border-border bg-deep py-24">
        <Container className="flex flex-col gap-12">
          <SectionHeader index="01" label="Case Studies" title="Mining, exploration, civil." />
          <Stagger className="grid gap-px bg-border md:grid-cols-2">
            {projects.map((p, i) => (
              <StaggerItem key={p.slug}>
                <Link
                  href={`/projects#${p.slug}`}
                  id={p.slug}
                  className="group flex h-full flex-col bg-black transition-colors duration-base hover:bg-surface"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-slow group-hover:scale-105"
                    />
                    <span className="absolute left-6 top-6 bg-amber px-3 py-1 font-mono text-mono-xs uppercase tracking-widest text-black">
                      {p.scope}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4 p-8">
                    <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">
                      {padNumber(i + 1)} — {p.location}
                    </span>
                    <h3 className="font-display text-display-sm uppercase text-fore">{p.title}</h3>
                    <p className="text-body text-muted">{p.outcomes}</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {p.methods.map((m) => (
                        <li key={m} className="border border-border px-3 py-1 font-mono text-mono-xs uppercase tracking-widest text-muted">
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBanner headline="Have a program to share with us?" cta="Get in Touch" href="/contact" />
    </>
  );
}
