import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
  /** Optional coordinate label rendered next to the crosshair */
  coords?: string;
};

/**
 * Cartographic registration mark — small crosshair (+) with optional
 * coordinate label. The coordinate label is opt-in: pass `coords` only
 * once real, verified coordinates are provided by the client.
 */
export function Crosshair({ className, size = 30, coords }: Props) {
  return (
    <div className={cn("flex items-start gap-3", className)} aria-hidden>
      <svg
        width={size}
        height={size}
        viewBox="0 0 30 30"
        fill="none"
        className="shrink-0 text-deep-navy/40"
      >
        <line
          x1="15" y1="2" x2="15" y2="28"
          stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"
        />
        <line
          x1="2" y1="15" x2="28" y2="15"
          stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3"
        />
        <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
      {coords && (
        <span
          className="font-mono uppercase text-deep-navy/50"
          style={{ fontSize: "10px", letterSpacing: "0.12em", marginTop: "2px" }}
        >
          {coords}
        </span>
      )}
    </div>
  );
}
