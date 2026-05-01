import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";

type Props = {
  src: string;
  alt: string;
  /** Card title shown in the navy overlay panel — yellow text */
  title: string;
  /** Card body shown below the title in the panel — light grey text */
  body: ReactNode;
  /** Optional pinned elements (typically <DrillBitPin />) anchored top-left of the card */
  pins?: ReactNode;
  className?: string;
};

/**
 * Rectangular image card with a translucent navy overlay panel anchored to the
 * right side, plus an offset navy outline behind the card.
 *
 * On hover: image zooms subtly, the offset outline shifts slightly to enhance
 * the "stacked" depth effect, the navy panel's amber title nudges right.
 */
export function OverlayImageCard({ src, alt, title, body, pins, className }: Props) {
  return (
    <div className={cn("group relative", className)}>
      {/* Offset navy outline behind — animates on hover */}
      <div
        aria-hidden
        className="absolute -left-5 -top-5 h-[calc(100%+40px)] w-[calc(100%+40px)] rounded-2xl border border-surface/30 transition-transform duration-500 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2"
      />

      {/* Pins anchored above the card top-left — small lift on hover */}
      {pins && (
        <div className="absolute -top-12 left-12 z-20 flex gap-3 transition-transform duration-300 ease-out group-hover:-translate-y-1">
          {pins}
        </div>
      )}

      {/* Card — stacked on mobile (image then panel), overlay on md+ */}
      <div className="relative w-full overflow-hidden rounded-xl shadow-image md:aspect-[2.3/1]">
        {/* Image — fills the card on md+, takes its own aspect on mobile */}
        <div className="relative aspect-[16/9] w-full md:absolute md:inset-0 md:aspect-auto">
          <Image
            src={optimizedSrc(src)}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            {...(blurPlaceholder(src)
              ? { placeholder: "blur" as const, blurDataURL: blurPlaceholder(src) }
              : {})}
          />
        </div>

        {/* Navy panel — sits below the image on mobile, overlays the right
            on md+ for the editorial cut-in effect. */}
        <div className="flex flex-col justify-center bg-deep-navy/95 px-7 py-6 md:absolute md:inset-y-0 md:right-0 md:w-2/5 md:py-7">
          <h3
            className="mb-3 font-display font-bold uppercase leading-snug tracking-wide text-amber transition-transform duration-300 ease-out group-hover:translate-x-1"
            style={{ fontSize: "14px", letterSpacing: "0.04em" }}
          >
            {title}
          </h3>
          <div
            className="font-sans font-normal leading-relaxed text-on-navy-muted"
            style={{ fontSize: "13px" }}
          >
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
