/**
 * News data layer — RUNTIME (client-side) reads of the self-hosted PHP CMS.
 *
 * The site is a static export; the news section is rendered client-side and
 * fetches the PHP read API (same-origin `/api/news.php` in production, the
 * value of NEXT_PUBLIC_NEWS_ENDPOINT). The API only ever returns PUBLISHED
 * articles — drafts never leave the host. There is no build-time Sanity call.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_NEWS_ENDPOINT ?? "/api/news.php";

export interface NewsCover {
  url: string;
  alt: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  status: "draft" | "published";
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  cover: NewsCover | null;
  /** Markdown source. Present on single-article reads, omitted from the list. */
  body?: string;
}

function withSlug(endpoint: string, slug: string): string {
  const sep = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${sep}slug=${encodeURIComponent(slug)}`;
}

/** All published articles, newest first. Returns [] on any failure. */
export async function fetchNewsList(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(ENDPOINT, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];
    const data = (await res.json()) as { articles?: NewsArticle[] };
    return Array.isArray(data.articles) ? data.articles : [];
  } catch (err) {
    console.error("[news] list fetch failed", err);
    return [];
  }
}

/** A single published article by slug, or null if missing/unpublished/error. */
export async function fetchNewsBySlug(slug: string): Promise<NewsArticle | null> {
  if (!slug) return null;
  try {
    const res = await fetch(withSlug(ENDPOINT, slug), {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { article?: NewsArticle };
    return data.article ?? null;
  } catch (err) {
    console.error("[news] article fetch failed", err);
    return null;
  }
}
