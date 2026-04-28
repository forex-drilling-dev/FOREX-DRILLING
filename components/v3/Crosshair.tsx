import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
};

/**
 * Cartographic crosshair (+) — two short dashed lines crossing.
 * Pattern source: agency reference, top-right registration mark.
 *
 * Use SPARINGLY — never in a regular grid (becomes generic Figma wallpaper).
 * Best as a single accent in a corner with negative space around it.
 */
export function Crosshair({ className, size = 30 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      className={cn("text-subtle", className)}
      aria-hidden
    >
      <line
        x1="15" y1="2" x2="15" y2="28"
        stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"
      />
      <line
        x1="2" y1="15" x2="28" y2="15"
        stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"
      />
    </svg>
  );
}
