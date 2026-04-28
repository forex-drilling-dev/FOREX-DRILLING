import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Large navy panel with asymmetric organic corners.
 * Top-right: small radius (20px). Bottom-right: huge curved radius (50% / 70%).
 * Pattern source: agency reference, top-left "EDITA ETUR SUNTION" panel.
 *
 * Use as section anchor — typically left-aligned, padded for headline + body.
 */
export function NavyBlob({ children, className }: Props) {
  return (
    <div
      className={cn(
        "blob-navy bg-surface text-on-navy shadow-navy",
        "px-10 py-12 md:px-14 md:py-16",
        className,
      )}
    >
      {children}
    </div>
  );
}
