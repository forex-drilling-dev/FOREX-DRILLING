import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/news/article/"] },
    sitemap: [
      "https://forexdrilling.com/sitemap.xml",
      // Runtime sitemap of published news articles (self-hosted CMS).
      "https://forexdrilling.com/sitemap-news.php",
    ],
  };
}
