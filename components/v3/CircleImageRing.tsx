import Image from "next/image";
import { cn } from "@/lib/utils";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";

type Props = {
  src: string;
  alt: string;
  size?: number;
  /** Offset of the outline ring behind the photo */
  ringOffset?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Circular cropped photo with a thin navy outline ring offset behind it.
 * Pattern source: agency reference, the two engineers in the circular crop.
 *
 * The white inner border + navy outline ring create a "pinned" / editorial feel.
 */
export function CircleImageRing({
  src,
  alt,
  size = 320,
  ringOffset = 20,
  priority = false,
  className,
}: Props) {
  const ringSize = size + ringOffset * 2;
  const innerInsetPct = (ringOffset / ringSize) * 100;
  return (
    <div
      style={{
        // Target size, capped to the parent's width on small viewports so
        // the circle never spills outside its column.
        width: ringSize,
        maxWidth: "100%",
        aspectRatio: "1 / 1",
      }}
      className={cn("relative", className)}
    >
      {/* Navy outline ring, offset behind */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full border border-surface/30"
      />
      {/* White-bordered photo, centred over the ring */}
      <div
        style={{ inset: `${innerInsetPct}%` }}
        className="absolute overflow-hidden rounded-full border-8 border-white shadow-card"
      >
        <Image
          src={optimizedSrc(src)}
          alt={alt}
          fill
          priority={priority}
          // The wrapper never renders larger than `size`px (clamped by parent
          // on mobile). Using a fixed-size hint stops the browser from
          // fetching the largest 3840w variant for what is at most ~size px.
          sizes={`${size}px`}
          className="object-cover"
          {...(blurPlaceholder(src)
            ? { placeholder: "blur" as const, blurDataURL: blurPlaceholder(src) }
            : {})}
        />
      </div>
    </div>
  );
}
