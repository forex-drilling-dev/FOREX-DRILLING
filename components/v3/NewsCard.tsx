import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/lib/news";
import { urlForImage } from "@/lib/sanity";
import { formatNewsDate } from "@/lib/date";

/**
 * News list card — cover (Sanity CDN), mono date, display title, muted
 * excerpt, amber arrow on hover. Mirrors the editorial language of the
 * fleet rig cards / SectionLink. Server component, zero client JS.
 */
export function NewsCard({ article }: { article: NewsArticle }) {
  const cover = urlForImage(article.coverImage)?.width(900).url() ?? null;
  const alt = article.coverImage?.alt ?? article.title;

  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-card transition-shadow duration-300 hover:shadow-deep"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-deep">
        {cover && (
          <Image
            src={cover}
            alt={alt}
            fill
            sizes="(min-width:768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span
          className="font-mono uppercase text-[var(--color-amber-dim)]"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          {formatNewsDate(article.publishedAt)}
        </span>
        <h3
          className="font-display font-bold uppercase text-deep-navy"
          style={{ fontSize: "clamp(18px, 3vw, 22px)", lineHeight: "1.15", letterSpacing: "-0.005em" }}
        >
          {article.title}
        </h3>
        <p
          className="font-sans text-muted"
          style={{ fontSize: "14px", lineHeight: "1.6" }}
        >
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-display font-bold uppercase text-deep-navy" style={{ fontSize: "12px", letterSpacing: "0.18em" }}>
          <span className="draw-underline draw-underline-base pb-[3px] transition-colors group-hover:text-amber">
            Read
          </span>
          <svg
            width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden
            className="text-amber transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M1 5h12m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
