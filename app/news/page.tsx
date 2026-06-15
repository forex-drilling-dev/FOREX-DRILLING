import type { Metadata } from "next";
import {
  PageHero,
  SectionLabel,
  Reveal,
  NewsList,
} from "@/components/v3";

export const metadata: Metadata = {
  title: "News",
  description:
    "Latest news and updates from Forex Drilling — projects, fleet, and operations across the Asia-Pacific region.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
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

          <NewsList />
        </div>
      </section>
    </>
  );
}
