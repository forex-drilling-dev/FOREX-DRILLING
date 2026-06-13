import type { Metadata } from "next";
import { ArticleView } from "@/components/v3";

/**
 * Single-article shell. The static export emits ONE page here (/news/article/).
 * Apache rewrites /news/<slug>/ to article.php, which injects per-article
 * SEO/OpenGraph tags and serves this shell; the body is fetched client-side
 * by <ArticleView/> from the PHP read API. Generic metadata only — the real
 * per-article tags are injected by article.php into the served HTML (so social
 * scrapers get correct per-article OpenGraph). The bare /news/article/ URL is
 * kept out of the index via robots.txt (Disallow), NOT via a noindex meta here
 * — a noindex would be re-applied by React on hydration to real article pages.
 */
export const metadata: Metadata = {
  title: "News",
  description: "Forex Drilling — news, projects, fleet and operations.",
};

export default function NewsArticleShell() {
  return <ArticleView />;
}
