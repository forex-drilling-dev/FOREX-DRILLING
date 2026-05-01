import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Yellow asymmetric label that OVERLAPS the navy blob top-left.
 *
 * Exact spec from agency CSS:
 *   font-size: 32px
 *   font-weight: 900
 *   letter-spacing: 2px
 *   color: white
 *   padding: 12px 35px
 *   border-radius: 12px 30px 30px 12px   (squared left, rounded right)
 *   box-shadow: 0 4px 6px rgba(0,0,0,0.1)
 *
 * Positioning is the caller's job (typically absolute, top:80 left:50,
 * placed ABOVE the navy blob so it overlaps the blob's top edge — the
 * shadow then anchors it visually onto the blob).
 *
 * z-index must be ABOVE the navy blob in the parent stacking context.
 */
export function YellowBadge({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-amber text-white",
        "font-display font-black uppercase",
        "px-7 py-2.5",
        className,
      )}
      style={{
        fontSize: "22px",
        letterSpacing: "0.12em",
        borderRadius: "10px 24px 24px 10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </span>
  );
}
