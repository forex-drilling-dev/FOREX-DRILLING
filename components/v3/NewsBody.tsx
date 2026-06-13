import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import type { Components } from "react-markdown";

/**
 * Renders a news article's Markdown body as React, styled with the V3 tokens.
 * Security: `rehype-sanitize` strips dangerous tags/attributes (script,
 * javascript:/data: URLs, event handlers) before our component map runs — no
 * `dangerouslySetInnerHTML`. Mirrors the editorial styling of the old
 * Portable Text renderer so the article reads identically.
 */
const components: Components = {
  p: ({ children }) => (
    <p className="font-sans" style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.75", color: "var(--color-muted)" }}>
      {children}
    </p>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 font-display font-extrabold uppercase text-deep-navy" style={{ fontSize: "clamp(24px, 5vw, 34px)", lineHeight: "1.1", letterSpacing: "-0.005em" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 font-display font-bold uppercase text-deep-navy" style={{ fontSize: "clamp(18px, 4vw, 24px)", lineHeight: "1.15" }}>
      {children}
    </h3>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-[var(--color-amber-dim)] pl-6 font-display font-bold uppercase text-deep-navy" style={{ fontSize: "clamp(18px, 4vw, 24px)", lineHeight: "1.3" }}>
      {children}
    </blockquote>
  ),
  ul: ({ children }) => <ul className="my-4 flex flex-col gap-2 pl-1">{children}</ul>,
  ol: ({ children }) => <ol className="my-4 flex list-decimal flex-col gap-2 pl-6 font-sans text-muted">{children}</ol>,
  li: ({ children }) => (
    <li className="flex items-start gap-3 font-sans text-muted" style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.7" }}>
      <span aria-hidden className="mt-[10px] block h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => <strong className="font-semibold text-deep-navy">{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  a: ({ children, href }) => {
    const url = href ?? "#";
    const external = /^https?:\/\//.test(url);
    return (
      <a
        href={url}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-deep-navy underline decoration-amber decoration-2 underline-offset-2 transition-colors hover:text-[var(--color-amber-dim)]"
      >
        {children}
      </a>
    );
  },
  img: ({ src, alt }) => {
    if (typeof src !== "string" || src === "") return null;
    return (
      <figure className="my-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-deep">
          <Image src={src} alt={alt ?? ""} fill sizes="(min-width:768px) 760px, 100vw" className="object-contain" />
        </div>
        {alt && (
          <figcaption className="mt-2 font-mono uppercase text-subtle" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
};

export function NewsBody({ markdown }: { markdown: string }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]} components={components}>
      {markdown}
    </Markdown>
  );
}
