import type { MetadataRoute } from "next";

const BASE = "https://forexdrilling.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages only. News articles are fetched client-side from Sanity and
  // are not known at build time, so they are not listed here (accepted SEO
  // trade-off of the client-side news model).
  // Service details live in an in-page modal on /services — no detail URLs.
  return [
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
}
