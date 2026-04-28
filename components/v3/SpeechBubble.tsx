import { cn } from "@/lib/utils";

type Props = {
  /** Mono-style label above the value, e.g. "EATEMPED" */
  label: string;
  /** Big bold numeric value */
  value: string | number;
  className?: string;
};

/**
 * Dark-navy circular speech bubble with a triangular tail anchored bottom-left.
 *
 * Exact spec from agency CSS:
 *   width: 150px; height: 150px
 *   background: dark-navy (#102142)
 *   tail: position absolute, bottom: -15px, left: 20px,
 *         border-width 35px 25px 0 0 (creates downward-pointing triangle)
 *   label: 14px / weight 600 / letter-spacing 1px
 *   value: 46px / weight 900 / line-height 1
 *
 * Positioning is the caller's job. In the agency hero it OVERLAPS the navy
 * blob's right edge — the tail visually attaches it back onto the blob,
 * making it read as a "callout" pulled out of the main panel rather than a
 * floating widget.
 */
export function SpeechBubble({ label, value, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-full",
        "bg-deep-navy text-on-navy",
        "h-[150px] w-[150px]",
        className,
      )}
      style={{ boxShadow: "0 10px 20px rgba(16, 33, 66, 0.3)" }}
    >
      <span
        className="font-display font-semibold uppercase"
        style={{ fontSize: "14px", letterSpacing: "1px" }}
      >
        {label}
      </span>
      <span
        className="font-display font-black leading-none"
        style={{ fontSize: "46px", marginTop: "5px" }}
      >
        {value}
      </span>
      {/* Tail — bottom-left, points back toward the navy blob */}
      <span
        aria-hidden
        className="absolute block h-0 w-0"
        style={{
          bottom: "-15px",
          left: "20px",
          borderWidth: "35px 25px 0 0",
          borderStyle: "solid",
          borderColor: "var(--color-deep-navy) transparent transparent transparent",
        }}
      />
    </div>
  );
}
