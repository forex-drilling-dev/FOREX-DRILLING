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
  return (
    <div
      style={{ width: ringSize, height: ringSize }}
      className={cn("relative shrink-0", className)}
    >
      {/* Navy outline ring, offset behind */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full border border-surface/30"
      />
      {/* White-bordered photo, centred over the ring */}
      <div
        style={{ width: size, height: size, top: ringOffset, left: ringOffset }}
        className="absolute overflow-hidden rounded-full border-8 border-white shadow-card"
      >
        <Image
          src={optimizedSrc(src)}
          alt={alt}
          fill
          priority={priority}
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
