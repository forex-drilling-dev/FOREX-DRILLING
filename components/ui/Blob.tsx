import { cn } from "@/lib/utils";

type BlobVariant = "navy" | "ocre" | "circle";

type Props = {
  variant?: BlobVariant;
  size?: string;
  className?: string;
  float?: boolean;
};

/**
 * Organic blob shape — CSS border-radius morphing animation only
 * (no Framer, no canvas — best perf for continuous loops)
 *
 * Usage:
 *   <Blob variant="ocre" size="400px" className="absolute -top-20 -right-20 opacity-20" />
 *   <Blob variant="circle" size="480px" />  ← perfect circle, no morph
 */
export function Blob({ variant = "navy", size = "320px", className, float = false }: Props) {
  const colorMap: Record<BlobVariant, string> = {
    navy:   "bg-surface",
    ocre:   "bg-amber",
    circle: "bg-surface",
  };

  const isCircle = variant === "circle";

  return (
    <div
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        "pointer-events-none select-none",
        colorMap[variant],
        isCircle ? "rounded-full" : "blob-morph",
        float && "blob-float",
        className,
      )}
    />
  );
}
