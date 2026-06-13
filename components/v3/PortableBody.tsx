import Image from "next/image";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import { urlForImage } from "@/lib/sanity";
import type { NewsImage } from "@/lib/news";

/**
 * Renders Sanity Portable Text as React elements styled with the V3 tokens.
 * No dangerouslySetInnerHTML — every node maps to a typed component.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
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
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 flex flex-col gap-2 pl-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 flex list-decimal flex-col gap-2 pl-6 font-sans text-muted">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 font-sans text-muted" style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.7" }}>
        <span aria-hidden className="mt-[10px] block h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li style={{ fontSize: "clamp(15px, 4.2vw, 17px)", lineHeight: "1.7" }}>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-deep-navy">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="font-medium text-deep-navy underline decoration-amber decoration-2 underline-offset-2 transition-colors hover:text-[var(--color-amber-dim)]"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const img = value as NewsImage;
      const url = urlForImage(img)?.width(1400).url();
      if (!url) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-deep">
            <Image src={url} alt={img.alt ?? ""} fill sizes="(min-width:768px) 760px, 100vw" className="object-contain" />
          </div>
          {img.alt && (
            <figcaption className="mt-2 font-mono uppercase text-subtle" style={{ fontSize: "10px", letterSpacing: "0.12em" }}>
              {img.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
