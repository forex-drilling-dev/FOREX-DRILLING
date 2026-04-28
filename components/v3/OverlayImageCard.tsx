import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
 * Pattern source: agency reference, bottom-right "VOLUM ARUM QUOS EX" image card.
 *
 * The panel covers ~45% of the card width and contains a yellow heading + body text.
 * The outline behind creates a subtle "stacked" feel without being a multi-card stack.
 */
export function OverlayImageCard({ src, alt, title, body, pins, className }: Props) {
  return (
    <div className={cn("relative", className)}>
      {/* Offset navy outline behind */}
      <div
        aria-hidden
        className="absolute -left-5 -top-5 h-[calc(100%+40px)] w-[calc(100%+40px)] rounded-2xl border border-surface/30"
      />

      {/* Pins anchored above the card top-left */}
      {pins && (
        <div className="absolute -top-12 left-12 z-20 flex gap-3">
          {pins}
        </div>
      )}

      {/* Image card */}
      <div className="relative aspect-[2.3/1] w-full overflow-hidden rounded-xl shadow-image">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover"
        />

        {/* Navy overlay panel — right side */}
        <div className="absolute inset-y-0 right-0 flex w-2/5 flex-col justify-center bg-deep-navy/95 px-7 py-7">
          <h3 className="mb-3 font-display text-sm font-extrabold uppercase leading-snug tracking-wide text-amber">
            {title}
          </h3>
          <div className="font-display text-[11px] font-normal leading-relaxed text-on-navy-muted">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
