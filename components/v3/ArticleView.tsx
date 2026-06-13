"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { YellowBadge } from "./YellowBadge";
import { SectionLink } from "./SectionLink";
import { NewsBody } from "./NewsBody";
import { fetchNewsBySlug, type NewsArticle } from "@/lib/news";
import { formatNewsDate } from "@/lib/date";

/**
 * Client-rendered article view. The static export ships a single shell at
 * /news/article/; Apache rewrites /news/<slug>/ to article.php (which injects
 * per-article SEO/OG tags) and serves this same shell. Here we read the slug
 * from the path and fetch the published article at runtime.
 */
function slugFromPath(): string {
  if (typeof window === "undefined") return "";
  // Pathname is /news/<slug>/ (trailingSlash) — or /news/article/ for the raw shell.
  const parts = window.location.pathname.split("/").filter(Boolean);
  const slug = parts[1] ?? "";
  return slug === "article" ? "" : slug;
}

export function ArticleView() {
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  const [article, setArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    let active = true;
    const slug = slugFromPath();
    const pending = slug ? fetchNewsBySlug(slug) : Promise.resolve(null);
    pending.then((a) => {
      if (!active) return;
      if (a) {
        setArticle(a);
        setState("ready");
        document.title = `${a.title} — Forex Drilling`;
      } else {
        setState("missing");
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="mx-auto max-w-[820px] px-6 pt-[calc(var(--spacing-nav)+56px)] md:px-14" aria-hidden>
        <div className="h-4 w-24 animate-pulse rounded bg-deep/10" />
        <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-deep/10" />
        <div className="mt-4 h-20 w-full animate-pulse rounded bg-deep/10" />
        <div className="mt-10 aspect-[16/9] w-full animate-pulse rounded-2xl bg-deep/10" />
      </div>
    );
  }

  if (state === "missing" || !article) {
    return (
      <div className="mx-auto flex max-w-[820px] flex-col gap-6 px-6 pt-[calc(var(--spacing-nav)+56px)] md:px-14">
        <YellowBadge size="sm">NEWS</YellowBadge>
        <h1
          className="font-display font-extrabold uppercase text-deep-navy"
          style={{ fontSize: "clamp(28px, 6vw, 48px)", lineHeight: "1.05" }}
        >
          Article not found.
        </h1>
        <p className="font-sans text-muted" style={{ fontSize: "16px", lineHeight: "1.6" }}>
          This article may have been unpublished or the link is incorrect.
        </p>
        <div className="pt-2">
          <SectionLink href="/news" label="All news" prefix="Back to" />
        </div>
      </div>
    );
  }

  const cover = article.cover?.url ?? null;
  const coverAlt = article.cover?.alt ?? article.title;

  return (
    <article className="bg-white">
      <header className="mx-auto max-w-[820px] px-6 pt-[calc(var(--spacing-nav)+32px)] md:px-14 md:pt-[calc(var(--spacing-nav)+56px)]">
        <YellowBadge size="sm">NEWS</YellowBadge>
        <p
          className="mt-6 font-mono uppercase text-[var(--color-amber-dim)]"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          {formatNewsDate(article.publishedAt)}
        </p>
        <h1
          className="mt-3 font-display font-extrabold uppercase text-deep-navy text-balance"
          style={{ fontSize: "clamp(30px, 6vw, 56px)", lineHeight: "1.04", letterSpacing: "-0.005em" }}
        >
          {article.title}
        </h1>
        <p
          className="mt-5 font-sans font-medium text-deep-navy"
          style={{ fontSize: "clamp(16px, 4.4vw, 19px)", lineHeight: "1.6" }}
        >
          {article.excerpt}
        </p>
      </header>

      {cover && (
        <div className="mx-auto mt-10 max-w-[1100px] px-6 md:mt-14 md:px-14">
          <div
            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-deep"
            style={{ boxShadow: "var(--shadow-image)" }}
          >
            <Image src={cover} alt={coverAlt} fill sizes="(min-width:1100px) 1040px, 100vw" className="object-cover" priority />
          </div>
        </div>
      )}

      {article.body && article.body.trim() !== "" && (
        <div className="mx-auto mt-10 flex max-w-[760px] flex-col gap-5 px-6 pb-4 md:mt-16 md:px-14">
          <NewsBody markdown={article.body} />
        </div>
      )}

      <div className="mx-auto max-w-[760px] px-6 py-12 md:px-14 md:py-16">
        <SectionLink href="/news" label="All news" prefix="Back to" />
      </div>
    </article>
  );
}
