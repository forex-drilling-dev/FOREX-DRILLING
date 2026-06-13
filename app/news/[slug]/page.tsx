import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { YellowBadge, PortableBody, CtaBanner, SectionLink } from "@/components/v3";
import { getNewsBySlug, getNewsSlugs } from "@/lib/news";
import { urlForImage } from "@/lib/sanity";
import { formatNewsDate } from "@/lib/date";

type Params = { params: Promise<{ slug: string }> };

// Static export: only slugs known at build time produce pages.
export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};
  const ogImage = urlForImage(article.coverImage)?.width(1200).height(630).fit("crop").url();
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url: `/news/${article.slug}`,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function NewsArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const cover = urlForImage(article.coverImage)?.width(1600).url() ?? null;
  const coverAlt = article.coverImage?.alt ?? article.title;

  return (
    <>
      <article className="bg-white">
        {/* Header — editorial, no dependency on local blur data */}
        <header className="mx-auto max-w-[820px] px-6 pt-[calc(var(--spacing-nav)+32px)] md:px-14 md:pt-[calc(var(--spacing-nav)+56px)]">
          <YellowBadge size="sm">NEWS</YellowBadge>
          <p
            className="mt-6 font-mono uppercase text-[var(--color-amber-dim)]"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            {formatNewsDate(article.publishedAt)}
          </p>
          <h1
            className="mt-3 font-display font-extrabold uppercase text-deep-navy text-balance"
            style={{ fontSize: "clamp(30px, 6vw, 56px)", lineHeight: "1.04", letterSpacing: "-0.005em" }}
          >
            {article.title}
          </h1>
          <p
            className="mt-5 font-sans font-medium text-deep-navy"
            style={{ fontSize: "clamp(16px, 4.4vw, 19px)", lineHeight: "1.6" }}
          >
            {article.excerpt}
          </p>
        </header>

        {cover && (
          <div className="mx-auto mt-10 max-w-[1100px] px-6 md:mt-14 md:px-14">
            <div
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-deep"
              style={{ boxShadow: "var(--shadow-image)" }}
            >
              <Image
                src={cover}
                alt={coverAlt}
                fill
                sizes="(min-width:1100px) 1040px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {article.body && article.body.length > 0 && (
          <div className="mx-auto mt-10 flex max-w-[760px] flex-col gap-5 px-6 pb-4 md:mt-16 md:px-14">
            <PortableBody value={article.body} />
          </div>
        )}

        <div className="mx-auto max-w-[760px] px-6 py-12 md:px-14 md:py-16">
          <SectionLink href="/news" label="All news" prefix="Back to" />
        </div>
      </article>

      <CtaBanner
        headline="Talk to our team."
        body="Have a program to discuss or a question about our operations? We respond within one business day."
        cta="Start a conversation"
        href="/contact"
      />
    </>
  );
}
