import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getService, type ServiceCategory } from "@/content/services";
import {
  PageHero,
  SectionLabel,
  SectionHeading,
  DrillBitPin,
  CtaBanner,
  Reveal,
} from "@/components/v3";

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

const categoryHero: Record<ServiceCategory, string> = {
  drilling: "/images/rig-vertical-clean.jpg",
  instrumentation: "/images/rig-aerial.jpg",
  downhole: "/images/drill-head-closeup.jpg",
  data: "/images/rig-horizontal.jpg",
};

const categoryHeroAlt: Record<ServiceCategory, string> = {
  drilling: "Forex Drilling vertical drill rig with mast deployed on a prepared pad",
  instrumentation: "Aerial view of a Forex Drilling site with instrumentation equipment",
  downhole: "Close-up of an orange Forex Drilling rotary drill head with hydraulic lines",
  data: "Forex Drilling truck-mounted horizontal rig in operation",
};

const categoryLabel: Record<ServiceCategory, string> = {
  drilling: "DRILLING",
  instrumentation: "INSTRUMENTATION",
  downhole: "DOWNHOLE",
  data: "DATA ACQUISITION",
};

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const heroPhoto = categoryHero[service.category];

  // Service detail uses one-line title (the service name itself), so we
  // pass an empty string for line2 — PageHero gracefully handles single-line
  // titles via the line2 yellow accent.
  return (
    <>
      <PageHero
        badge={categoryLabel[service.category]}
        line1={service.title}
        line2=""
        photo={{ src: heroPhoto, alt: categoryHeroAlt[service.category] }}
        body={service.summary}
      />

      {/* OVERVIEW */}
      <section className="relative bg-deep py-16 md:py-32">
        <div className="mx-auto grid grid-cols-1 max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
          <Reveal className="flex flex-col gap-5 md:col-span-5">
            <SectionLabel number="01" label="Overview" />
            <SectionHeading line1="What we" line2="deliver." />
          </Reveal>
          <p
            className="font-sans md:col-span-7"
            style={{ fontSize: "clamp(15px, 4.4vw, 17px)", lineHeight: "1.75", color: "var(--color-fore)" }}
          >
            {service.body}
          </p>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="relative bg-white py-16 md:py-32">
        <div className="mx-auto grid grid-cols-1 max-w-[1500px] gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-14">
          <Reveal className="flex flex-col gap-5 md:col-span-5">
            <SectionLabel number="02" label="Applications" />
            <SectionHeading line1="Where it" line2="fits." />
          </Reveal>
          <ul className="flex flex-col gap-4 md:col-span-7">
            {service.applications.map((a) => (
              <li key={a} className="flex items-start gap-4 border-t border-border pt-4">
                <span className="flex shrink-0 pt-0.5" aria-hidden>
                  <DrillBitPin size={20} />
                </span>
                <span
                  className="font-sans font-medium text-deep-navy"
                  style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.55" }}
                >
                  {a}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="relative bg-deep py-16 md:py-32">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-6 md:px-14">
            <Reveal className="flex flex-col gap-5 max-w-[700px]">
              <SectionLabel number="03" label="Related" />
              <SectionHeading line1="Services we" line2="often deploy together." />
            </Reveal>
            <div className="grid gap-px bg-border md:grid-cols-3">
              {related.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col gap-5 bg-white p-7 transition-all duration-300 hover:bg-amber"
                >
                  <p
                    className="font-display font-black"
                    style={{ fontSize: "36px", lineHeight: "1", color: "var(--color-amber)" }}
                  >
                    <span className="transition-colors duration-300 group-hover:text-deep-navy">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </p>
                  <h3
                    className="font-display font-extrabold uppercase text-deep-navy"
                    style={{ fontSize: "18px", letterSpacing: "0.04em" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="font-sans"
                    style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--color-muted)" }}
                  >
                    {s.summary}
                  </p>
                  <span
                    className="mt-auto inline-flex items-center gap-2 font-display font-bold uppercase text-amber transition-all duration-300 group-hover:text-deep-navy group-hover:gap-3"
                    style={{ fontSize: "11px", letterSpacing: "0.12em" }}
                  >
                    Explore
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        headline="Got a hole that needs this method?"
        body="Send target depth, ground conditions, and timeline. We&rsquo;ll come back with rig selection, crew composition, and a quote."
        cta="Request a quote"
        href="/contact"
      />
    </>
  );
}
