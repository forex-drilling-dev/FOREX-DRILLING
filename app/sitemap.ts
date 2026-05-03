import type { MetadataRoute } from "next";
import { services } from "@/content/services";

const BASE = "https://forex-drilling.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE,               priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${BASE}/about`,    priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/fleet`,    priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/hse`,      priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${BASE}/quality`,  priority: 0.8, changeFrequency: "monthly" as const },
    // /projects is currently a placeholder (noindex) — exclude until populated.
    { url: `${BASE}/contact`,  priority: 0.7, changeFrequency: "yearly" as const  },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...servicePages];
}
