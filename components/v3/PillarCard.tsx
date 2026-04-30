import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  number: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Editorial pillar card — for Versatility / Resilience / Reliability triads.
 *
 * Anatomy:
 *   - Big yellow number/index top
 *   - Title in dark navy
 *   - Body paragraph in muted grey
 *   - Thin navy left border (4px) anchoring the card
 *   - White bg with soft card shadow
 */
export function PillarCard({ number, title, children, className }: Props) {
  return (
    <div
      className={cn(
        "relative bg-white p-7 transition-all duration-300",
        "border-l-4 border-amber hover:border-deep-navy",
        "shadow-card",
        className,
      )}
    >
      <p
        className="font-display font-black text-amber"
        style={{ fontSize: "40px", lineHeight: "1", marginBottom: "16px" }}
      >
        {number}
      </p>
      <h3
        className="font-display font-extrabold uppercase text-deep-navy"
        style={{ fontSize: "18px", letterSpacing: "0.04em", marginBottom: "12px" }}
      >
        {title}
      </h3>
      <p
        className="font-display font-normal"
        style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
      >
        {children}
      </p>
    </div>
  );
}
