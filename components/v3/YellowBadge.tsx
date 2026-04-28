import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Asymmetric yellow label — squared on the left, generously rounded on the right.
 * Pattern source: agency reference, top-left "NESCIDIO" tag floating over the navy blob.
 *
 * Sits as a floating accent — typically absolute-positioned over a blob/section.
 */
export function YellowBadge({ children, className }: Props) {
  return (
    <span
      className={cn(
        "badge-asymmetric inline-flex items-center bg-amber text-white",
        "px-8 py-3 font-display text-2xl font-black uppercase tracking-[0.12em]",
        "shadow-card",
        className,
      )}
    >
      {children}
    </span>
  );
}
