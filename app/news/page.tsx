import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  Reveal,
  NewsCard,
  SectionLink,
} from "@/components/v3";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news and updates from Forex Drilling — projects, fleet, and operations across the Asia-Pacific region.",
  alternates: { canonical: "/news" },
};

function EmptyState() {
  return (
    <Reveal className="flex max-w-[640px] flex-col gap-4">
      <p
        className="font-display font-extrabold uppercase text-deep-navy"
        style={{ fontSize: "clamp(22px, 5vw, 32px)", lineHeight: "1.1" }}
      >
        Nothing to report yet.
      </p>
      <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
        Updates on our projects, fleet and operations will appear here. In the
        meantime, reach out to discuss your program.
      </p>
    </Reveal>
  );
}

export default async function NewsPage() {
  const articles = await getAllNews();

  return (
    <>
      <PageHero
        badge="NEWS"
        line1="Latest"
        line2="News & updates."
        photo={{
          src: "/images/site-operations.jpg",
          alt: "Forex Drilling crew working a multi-rig site at night",
        }}
        body={
          <>
            News and updates from our projects, fleet, and operations across
            the Asia-Pacific region.
          </>
        }
      />

      <section className="relative bg-white py-12 md:py-32">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:gap-14 md:px-14">
          <Reveal className="flex max-w-[820px] flex-col gap-5">
            <SectionLabel number="01" label="Latest" />
          </Reveal>

          {articles.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article._id}>
                  <Reveal>
                    <NewsCard article={article} />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="relative bg-deep py-14 md:py-20">
        <div className="mx-auto flex max-w-[1500px] justify-center px-6 md:px-14">
          <SectionLink href="/contact" label="Contact" prefix="Get in touch" />
        </div>
      </section>
    </>
  );
}
