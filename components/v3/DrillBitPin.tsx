import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
};

/**
 * Yellow shield-shaped pin with a threaded drill rod illustration inside.
 * Pattern source: agency reference SVG — the screws/drill bits attached to
 * the top of the rectangular image card.
 *
 * Shape: rounded top corners, pointed-V bottom (like a tag or paint chip).
 * Inner content: drill collar + threaded rod with horizontal hash marks
 * (the "filetage" / threading) drawn in dark navy stroke.
 *
 * Drop-shadow makes it appear pinned/floating above the card behind it.
 */
export function DrillBitPin({ className, size = 56 }: Props) {
  // Maintain aspect ratio of the reference SVG: 35w × 85h ≈ 0.41
  const width  = size;
  const height = Math.round(size * (85 / 35));

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("drop-shadow-[0_8px_12px_rgba(0,0,0,0.15)]", className)}
      aria-hidden
    >
      {/* Yellow shield body */}
      <path
        d="M0 10 C0 4.47715 4.47715 0 10 0 H25 C30.5228 0 35 4.47715 35 10 V65 L17.5 85 L0 65 V10 Z"
        fill="var(--color-amber)"
      />
      {/* Drill rod with threading — dark navy line art */}
      <g
        stroke="var(--color-deep-navy)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Top collar */}
        <rect x="10" y="15" width="15" height="6" rx="1" />
        {/* Vertical rod outline tapering to a point */}
        <path d="M12 21 V60 L17.5 72 L23 60 V21" />
        {/* Threading hash marks */}
        <path d="M9 29 L26 33" />
        <path d="M9 39 L26 43" />
        <path d="M9 49 L26 53" />
        <path d="M9 59 L26 63" />
      </g>
    </svg>
  );
}
