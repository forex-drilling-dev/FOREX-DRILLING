import { cn } from "@/lib/utils";

type Props = {
  /** Two-digit section index (e.g. "01") rendered in amber Goldman */
  number: string;
  /** Section label rendered next to the number (e.g. "Mission") */
  label: string;
  /** Visual variant — "light" for white sections, "dark" for navy sections */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Editorial section divider — thick rule + numbered label.
 *
 * Replaces the previous `SectionLabel` "01 // MISSION" pattern with a
 * stronger field-manual feel: a top hairline, a hefty Goldman number,
 * a thin separator, and the label in mono caps. This anchors every
 * section header on mobile (where vertical rhythm matters most) and
 * scales gracefully on desktop.
 */
export function SectionDivider({
  number,
  label,
  variant = "light",
  className,
}: Props) {
  const isDark = variant === "dark";
  return (
    <div className={cn("flex items-baseline gap-4", className)}>
      <span
        className={cn(
          "font-display font-black leading-none",
          isDark ? "text-amber" : "text-amber",
        )}
        style={{ fontSize: "clamp(28px, 7vw, 36px)", letterSpacing: "-0.02em" }}
      >
        {number}
      </span>
      <span
        aria-hidden
        className={cn(
          "h-px flex-1",
          isDark ? "bg-on-navy-muted/30" : "bg-deep-navy/15",
        )}
      />
      <span
        className={cn(
          "font-mono uppercase",
          isDark ? "text-on-navy-muted" : "text-deep-navy/65",
        )}
        style={{ fontSize: "11px", letterSpacing: "0.22em" }}
      >
        {label}
      </span>
    </div>
  );
}
