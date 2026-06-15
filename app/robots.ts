import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // /news/article/ is the bare client shell that renders /news/<slug>/ —
    // keep it out of the index. The Studio lives on Sanity's hosting, not here.
    rules: { userAgent: "*", allow: "/", disallow: ["/news/article/"] },
    sitemap: ["https://forexdrilling.com/sitemap.xml"],
  };
}
