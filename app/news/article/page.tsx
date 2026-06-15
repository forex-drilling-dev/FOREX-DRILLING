"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchNewsBySlug, type NewsArticle } from "@/lib/news";
import { formatNewsDate } from "@/lib/date";
import { urlFor } from "@/lib/sanity/image";
import { YellowBadge, SectionLink } from "@/components/v3";
import { NewsBody } from "@/components/v3/NewsBody";

function slugFromPath(): string {
  // URL is /news/<slug>/ (Apache rewrites it to this shell). Pull the slug.
  if (typeof window === "undefined") return "";
  const parts = window.location.pathname.split("/").filter(Boolean);
  // ["news", "<slug>"] — guard against the bare /news/article/ shell URL.
  if (parts[0] !== "news") return "";
  const last = parts[parts.length - 1];
  if (!last || last === "article") return "";
  return last;
}

type ShellState = {
  status: "loading" | "ready" | "notfound";
  article: NewsArticle | null;
};

export default function NewsArticleShell() {
  const [state, setState] = useState<ShellState>({ status: "loading", article: null });

  useEffect(() => {
    let active = true;
    // An empty slug (bare /news/article/ shell) resolves to null → not-found,
    // so the only setState happens in this async callback (never synchronously).
    fetchNewsBySlug(slugFromPath()).then((article) => {
      if (!active) return;
      setState(article ? { status: "ready", article } : { status: "notfound", article: null });
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") {
    return (
      <div className="mx-auto max-w-[820px] px-6 pt-[calc(var(--spacing-nav)+56px)] md:px-14">
        <div className="h-3 w-24 animate-pulse rounded bg-deep/10" />
        <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-deep/10" />
        <div className="mt-4 h-20 w-full animate-pulse rounded bg-deep/10" />
      </div>
    );
  }

  if (state.status === "notfound" || !state.article) {
    return (
      <div className="mx-auto max-w-[760px] px-6 py-24 md:px-14">
        <p
          className="font-display font-extrabold uppercase text-deep-navy"
          style={{ fontSize: "clamp(22px, 5vw, 32px)" }}
        >
          Article not found.
        </p>
        <div className="mt-8">
          <SectionLink href="/news" label="All news" prefix="Back to" />
        </div>
      </div>
    );
  }

  const article = state.article;
  const cover = article.cover ? urlFor(article.cover).url() : null;

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
            <Image
              src={cover}
              alt={article.title}
              fill
              sizes="(min-width:1100px) 1040px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {article.body && (
        <div className="mx-auto mt-10 flex max-w-[760px] flex-col gap-5 px-6 pb-4 md:mt-16 md:px-14">
          <NewsBody body={article.body} />
        </div>
      )}

      <div className="mx-auto max-w-[760px] px-6 py-12 md:px-14 md:py-16">
        <SectionLink href="/news" label="All news" prefix="Back to" />
      </div>
    </article>
  );
}
