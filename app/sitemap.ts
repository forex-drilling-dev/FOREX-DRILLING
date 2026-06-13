import type { MetadataRoute } from "next";
import { getAllNews } from "@/lib/news";

const BASE = "https://forexdrilling.com";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Service details live in an in-page modal on /services — no detail URLs.
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,               priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${BASE}/about`,    priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/fleet`,    priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/hse`,      priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/quality`,  priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/news`,     priority: 0.8, changeFrequency: "weekly" as const  },
    // /projects is currently a placeholder (noindex) — exclude until populated.
    { url: `${BASE}/contact`,  priority: 0.7, changeFrequency: "yearly" as const  },
  ];

  // One entry per published article (build-time; empty if Sanity unset).
  const newsPages: MetadataRoute.Sitemap = (await getAllNews()).map((a) => ({
    url: `${BASE}/news/${a.slug}`,
    lastModified: a.publishedAt,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...newsPages];
}
