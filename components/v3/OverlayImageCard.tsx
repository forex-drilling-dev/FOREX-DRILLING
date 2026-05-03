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
  /** "cover" (default) crops to fill the card; "contain" shows the full image with letterboxing */
  imageFit?: "cover" | "contain";
  /** Card aspect ratio on md+ screens — default 2.3/1 landscape; portrait images may want 4/3 or 1/1 */
  aspect?: "wide" | "balanced" | "square";
  className?: string;
};

/**
 * Rectangular image card with a translucent navy overlay panel anchored to the
 * right side, plus an offset navy outline behind the card.
 *
 * On hover: image zooms subtly, the offset outline shifts slightly to enhance
 * the "stacked" depth effect, the navy panel's amber title nudges right.
 */
export function OverlayImageCard({
  src,
  alt,
  title,
  body,
  pins,
  imageFit = "cover",
  aspect = "wide",
  className,
}: Props) {
  const aspectClass =
    aspect === "square"
      ? "md:aspect-square"
      : aspect === "balanced"
        ? "md:aspect-[4/3]"
        : "md:aspect-[2.3/1]";
  const mobileAspectClass =
    aspect === "square" || aspect === "balanced"
      ? "aspect-[4/5]"
      : "aspect-[16/9]";
  const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";
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

      {/* Card — stacked on mobile (image then panel), side-by-side on md+.
          When imageFit="contain" the image is constrained to the left 3/5
          (no overlap with the panel) so portrait subjects render in full. */}
      <div className={cn("relative w-full overflow-hidden rounded-xl shadow-image", aspectClass)}>
        {/* Image area — full card on md+ with cover, left 3/5 with contain */}
        <div
          className={cn(
            "relative w-full md:absolute md:top-0 md:bottom-0 md:left-0 md:w-auto md:aspect-auto",
            mobileAspectClass,
            imageFit === "contain"
              ? "bg-deep-navy md:right-[40%]"
              : "md:right-0",
          )}
        >
          <Image
            src={optimizedSrc(src)}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className={cn(fitClass, "transition-transform duration-700 ease-out group-hover:scale-105")}
            {...(blurPlaceholder(src)
              ? { placeholder: "blur" as const, blurDataURL: blurPlaceholder(src) }
              : {})}
          />
        </div>

        {/* Navy panel — sits below the image on mobile, on the right
            on md+ (overlay if cover, adjacent if contain). */}
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
