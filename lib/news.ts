import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./sanity";

export type NewsImage = SanityImageSource & {
  alt?: string;
};

/** A published news article as consumed by the static pages. */
export type NewsArticle = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  coverImage?: NewsImage;
  body?: PortableTextBlock[];
};

// Only published, slugged documents — newest first. The "published"
// perspective on the client already drops drafts.*; the status gate lets an
// editor hold a finished doc back.
const PUBLISHED = `_type == "news" && status == "published" && defined(slug.current)`;

const LIST_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage
}`;

// Neutral placeholder shown until the first real article is published.
// It guarantees the /news/[slug] route always has at least one page, which
// `output: export` requires (a dynamic route with zero params is a build
// error). As soon as Sanity returns a published article, this disappears.
const FALLBACK_NEWS: NewsArticle[] = [
  {
    _id: "fallback-welcome",
    title: "Forex Drilling news is coming soon",
    slug: "welcome",
    publishedAt: "2026-01-01T00:00:00.000Z",
    excerpt:
      "Updates on our projects, fleet and operations across the Asia-Pacific will be published here. This placeholder is replaced automatically once the first article goes live in the CMS.",
    body: [
      {
        _type: "block",
        _key: "fallback-b1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "fallback-s1",
            marks: [],
            text: "This is a placeholder entry. Once an editor publishes the first article in the Sanity Studio and the site is rebuilt, real news appears here automatically.",
          },
        ],
      },
    ] as PortableTextBlock[],
  },
];

/** All published articles, newest first. Falls back to the demo entry when
 *  Sanity has nothing (unconfigured or no published docs) so the static
 *  export always has at least one news page. */
export async function getAllNews(): Promise<NewsArticle[]> {
  if (!sanityClient) return FALLBACK_NEWS;
  const articles = await sanityClient.fetch<NewsArticle[]>(
    `*[${PUBLISHED}] | order(publishedAt desc) ${LIST_PROJECTION}`,
  );
  return articles.length > 0 ? articles : FALLBACK_NEWS;
}

/** Slugs for generateStaticParams (derived from getAllNews, so always ≥1). */
export async function getNewsSlugs(): Promise<string[]> {
  const articles = await getAllNews();
  return articles.map((a) => a.slug);
}

/** A single article by slug. Falls back to the demo entry by slug. */
export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  if (sanityClient) {
    const article = await sanityClient.fetch<NewsArticle | null>(
      `*[${PUBLISHED} && slug.current == $slug][0] ${LIST_PROJECTION.replace("}", ",\n  body\n}")}`,
      { slug },
    );
    if (article) return article;
  }
  return FALLBACK_NEWS.find((a) => a.slug === slug) ?? null;
}
