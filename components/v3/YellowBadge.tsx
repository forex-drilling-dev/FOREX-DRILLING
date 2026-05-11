import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Visual size — "sm" for compact mobile placement, "md" (default) for desktop hero. */
  size?: "sm" | "md";
};

/**
 * Yellow asymmetric label that overlaps the navy blob top-left.
 *
 * Agency desktop spec: ~22px label, large hero badge.
 * Mobile "sm" variant: ~13px in a compact pill so it sits cleanly inside
 * the new mobile banner card without dominating the layout.
 */
export function YellowBadge({ children, className, size = "md" }: Props) {
  const isSm = size === "sm";
  return (
    <span
      className={cn(
        "inline-flex items-center bg-amber text-white",
        "font-display font-black uppercase",
        isSm ? "px-3 py-1" : "px-7 py-2.5",
        className,
      )}
      style={{
        fontSize: isSm ? "12px" : "22px",
        letterSpacing: "0.12em",
        borderRadius: isSm ? "6px 14px 14px 6px" : "10px 24px 24px 10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </span>
  );
}
