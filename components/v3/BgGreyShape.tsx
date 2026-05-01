import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Decorative threaded drill rod (la vis filetée) used as a background
 * watermark — anchored in a corner, bleeds off-canvas, very low opacity.
 *
 * The motif is the same threaded rod illustration from DrillBitPin but
 * rendered LARGE and FAINT, integrated into the page geometry rather than
 * as a foreground UI element. This keeps the industrial vocabulary
 * consistent and replaces the previous abstract grey rectangle which had
 * no semantic connection to the drilling industry.
 *
 * Default placement is rotated 25deg so the rod feels like it's leaning
 * naturally into the composition rather than being a perfectly vertical
 * decoration.
 */
export function BgGreyShape({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
      style={{
        width: "180px",
        height: "560px",
        opacity: 0.07,
        transform: "rotate(20deg)",
        transformOrigin: "center",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 180 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Top collar */}
        <rect
          x="46"
          y="40"
          width="88"
          height="32"
          rx="4"
          stroke="var(--color-deep-navy)"
          strokeWidth="6"
          fill="none"
        />
        {/* Main rod outline tapering to a point at bottom */}
        <path
          d="M58 80 V440 L90 510 L122 440 V80"
          stroke="var(--color-deep-navy)"
          strokeWidth="6"
          fill="none"
          strokeLinejoin="round"
        />
        {/* Threading hash marks — repeat down the rod */}
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M40 ${110 + i * 24} L140 ${118 + i * 24}`}
            stroke="var(--color-deep-navy)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}
