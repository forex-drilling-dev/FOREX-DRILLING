"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "./NewsCard";
import { Reveal } from "./Reveal";
import { fetchNewsList, type NewsArticle } from "@/lib/news";

/**
 * Client-rendered news list. The site is a static export, so the list is
 * fetched at runtime from the PHP read API (published articles only) — new
 * articles appear instantly, no rebuild. Shows a skeleton while loading and
 * a neutral empty state when there is nothing published yet.
 */
function Skeleton() {
  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {[0, 1, 2].map((i) => (
        <li key={i} className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
          <div className="aspect-[16/10] w-full animate-pulse bg-deep/10" />
          <div className="flex flex-col gap-3 p-6">
            <div className="h-3 w-20 animate-pulse rounded bg-deep/10" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-deep/10" />
            <div className="h-12 w-full animate-pulse rounded bg-deep/10" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <Reveal className="flex max-w-[640px] flex-col gap-4">
      <p
        className="font-display font-extrabold uppercase text-deep-navy"
        style={{ fontSize: "clamp(22px, 5vw, 32px)", lineHeight: "1.1" }}
      >
        Nothing to report yet.
      </p>
      <p className="font-sans" style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}>
        Updates on our projects, fleet and operations will appear here. In the
        meantime, reach out to discuss your program.
      </p>
    </Reveal>
  );
}

export function NewsList() {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    let active = true;
    fetchNewsList().then((list) => {
      if (active) {
        setArticles(list);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Skeleton />;
  if (articles.length === 0) return <EmptyState />;

  return (
    <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <li key={article.id || article.slug}>
          <Reveal>
            <NewsCard article={article} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
