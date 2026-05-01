import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/sanity";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";
import {
  NavyBlob,
  YellowBadge,
  CircleImageRing,
  SectionLabel,
  SectionHeading,
  CtaBanner,
  Reveal,
  Crosshair,
  BgGreyShape,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected drilling programs across the Asia-Pacific region.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white pt-[calc(var(--spacing-nav)+48px)] pb-20 md:pb-32">
        <BgGreyShape className="top-[80px] right-[-100px] hidden lg:block" />
        <Crosshair size={36} className="absolute top-[120px] right-[120px] hidden lg:block" />
        <div className="relative mx-auto max-w-[1500px] px-6 md:px-14">
          <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
            <div className="relative md:col-span-7">
              <YellowBadge className="relative z-20 -mb-6 ml-4 lg:-mb-8">PROJECTS</YellowBadge>
              <NavyBlob className="relative z-10 h-auto w-full max-w-[640px]">
                <p className="font-display font-extrabold uppercase leading-[1.1] text-on-navy" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px" }}>
                  Selected
                </p>
                <p className="font-display font-extrabold uppercase leading-[1.1] text-amber" style={{ fontSize: "clamp(28px, 4vw, 38px)", letterSpacing: "0.5px", marginBottom: "26px" }}>
                  field programs.
                </p>
                <p className="font-sans font-normal text-on-navy-muted" style={{ fontSize: "13px", lineHeight: "1.7", maxWidth: "440px" }}>
                  Across mining, exploration, civil works, and groundwater
                  programs in the Asia-Pacific region — delivered with
                  structured operations, reliable data capture, and a strong
                  safety culture.
                </p>
              </NavyBlob>
            </div>
            <div className="flex flex-col items-end gap-6 md:col-span-5 md:pt-12">
              <CircleImageRing
                src="/images/site-aerial-trees.jpg"
                alt="Aerial view — drilling site amongst trees"
                size={320}
                ringOffset={22}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative bg-deep py-24 md:py-32">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
          <Reveal className="flex flex-col gap-5 max-w-[700px]">
            <SectionLabel number="01" label="Case Studies" />
            <SectionHeading line1="Mining, exploration," line2="civil." />
          </Reveal>

          <div className="grid gap-px bg-border md:grid-cols-2">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                id={p.slug}
                href={`/projects#${p.slug}`}
                className="group flex h-full flex-col bg-white transition-shadow duration-300 hover:shadow-deep"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={optimizedSrc(p.cover)}
                    alt={p.title}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    {...(blurPlaceholder(p.cover)
                      ? { placeholder: "blur" as const, blurDataURL: blurPlaceholder(p.cover) }
                      : {})}
                  />
                  <span
                    className="absolute left-6 top-6 bg-amber px-4 py-1.5 font-display font-bold uppercase text-white"
                    style={{ fontSize: "11px", letterSpacing: "0.18em" }}
                  >
                    {p.scope}
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-7">
                  <span
                    className="font-display font-bold uppercase text-amber"
                    style={{ fontSize: "11px", letterSpacing: "0.18em" }}
                  >
                    {String(i + 1).padStart(2, "0")} — {p.location}
                  </span>
                  <h3
                    className="font-display font-extrabold uppercase text-deep-navy"
                    style={{ fontSize: "22px", letterSpacing: "0.04em", lineHeight: "1.15" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="font-sans"
                    style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
                  >
                    {p.outcomes}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.methods.map((m) => (
                      <li
                        key={m}
                        className="border border-border px-3 py-1 font-sans font-medium uppercase text-deep-navy"
                        style={{ fontSize: "10px", letterSpacing: "0.12em" }}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        headline="Planning a program in the region?"
        body="Tell us where, when, and what. We&rsquo;ll propose how. Mining, exploration, civil, groundwater — we&rsquo;ve drilled them all."
        cta="Discuss your program"
        href="/contact"
      />
    </>
  );
}
