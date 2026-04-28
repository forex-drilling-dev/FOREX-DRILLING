import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  size?: number;
  priority?: boolean;
  className?: string;
};

/**
 * Circular-cropped image using clip-path + object-cover
 * Maintains aspect ratio, no layout shift.
 *
 * Usage:
 *   <CircleImage src="/images/rig-vertical-operator.jpg" alt="Operator" size={480} priority />
 */
export function CircleImage({ src, alt, size = 400, priority = false, className }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative shrink-0 overflow-hidden rounded-full", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={`${size}px`}
        className="object-cover"
      />
    </div>
  );
}
