import { client } from './sanity/client';
import { GET_ALL_POSTS_QUERY, GET_POST_BY_SLUG_QUERY, GET_ALL_POST_SLUGS_QUERY } from './sanity/queries';

export interface NewsArticle {
  _id: string;
  slug: string;
  status: "draft" | "published";
  title: string;
  excerpt: string;
  publishedAt: string;
  cover: any; // Sanity image object
  body?: any; // Portable text block
}

export async function fetchNewsList(): Promise<NewsArticle[]> {
  try {
    const posts = await client.fetch(GET_ALL_POSTS_QUERY);
    return posts || [];
  } catch (err) {
    console.error("[news] list fetch failed", err);
    return [];
  }
}

export async function fetchNewsBySlug(slug: string): Promise<NewsArticle | null> {
  if (!slug) return null;
  try {
    const post = await client.fetch(GET_POST_BY_SLUG_QUERY, { slug });
    return post || null;
  } catch (err) {
    console.error("[news] article fetch failed", err);
    return null;
  }
}

export async function fetchAllNewsSlugs(): Promise<{ slug: string }[]> {
  try {
    return await client.fetch(GET_ALL_POST_SLUGS_QUERY);
  } catch (err) {
    console.error("[news] slugs fetch failed", err);
    return [];
  }
}
