import { cn } from "@/lib/utils";

type Props = {
  /** Number prefix shown in mono uppercase, e.g. "01" */
  number: string;
  /** Section label, e.g. "About Us" */
  label: string;
  className?: string;
};

/**
 * Section eyebrow — "01 // ABOUT US" pattern.
 * Mono-styled tag used at the top of each major section.
 */
export function SectionLabel({ number, label, className }: Props) {
  return (
    <p
      className={cn(
        "font-display font-bold uppercase",
        className,
      )}
      style={{
        fontSize: "13px",
        letterSpacing: "0.18em",
        color: "var(--color-amber)",
      }}
    >
      {number} <span className="text-deep-navy/40">//</span> {label}
    </p>
  );
}
