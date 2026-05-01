import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "amber" | "navy" | "ghost-on-navy" | "ghost-on-light";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/**
 * Editorial button — strong rectangle, weight 700 uppercase, generous padding,
 * lift + arrow nudge on hover.
 *
 * Variants:
 *   amber          → primary CTA, yellow bg + white text
 *   navy           → secondary, navy bg + white text
 *   ghost-on-navy  → outline, used inside navy panels
 *   ghost-on-light → outline, used on white sections
 */
export function PrimaryButton({ href, children, variant = "amber", className }: Props) {
  const variants: Record<Variant, string> = {
    amber:
      "bg-amber text-white hover:bg-[var(--color-amber-dim)]",
    navy:
      "bg-deep-navy text-on-navy hover:bg-surface",
    "ghost-on-navy":
      "border border-white/30 text-white hover:bg-white hover:text-deep-navy hover:border-white",
    "ghost-on-light":
      "border border-deep-navy/30 text-deep-navy hover:bg-deep-navy hover:text-on-navy hover:border-deep-navy",
  };

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-display font-bold uppercase",
        "px-7 py-3.5 transition-all duration-300 ease-out",
        "hover:gap-3 hover:-translate-y-[2px]",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber",
        variants[variant],
        className,
      )}
      style={{
        fontSize: "12px",
        letterSpacing: "0.12em",
      }}
    >
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        aria-hidden
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </Link>
  );
}
