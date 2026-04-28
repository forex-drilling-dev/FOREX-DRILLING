import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Large navy panel — the GRAVITY CENTER of the agency hero composition.
 *
 * Exact spec from agency CSS (1200×850 canvas):
 *   width: 580px
 *   height: 420px
 *   border-top-right-radius: 20px
 *   border-bottom-right-radius: 250px 350px   ← the signature swoop
 *   border-top-left + border-bottom-left: 0   (square, hugs left edge)
 *   padding: 90px 40px 40px 60px              (top is generous to leave room
 *                                              for the yellow badge overlay)
 *   box-shadow: 5px 15px 30px rgba(25, 52, 94, 0.15)
 *
 * The asymmetric corners create a directional flow: visually, the blob
 * "swoops" toward the bottom-right, pointing at the rectangular image card.
 * It's NOT a rounded rectangle — it's a thumbprint shape.
 *
 * Width / height / position / radii are intentionally NOT className-overridable
 * because the composition depends on these exact values.
 */
export function NavyBlob({ children, className, style }: Props) {
  return (
    <div
      className={cn(
        "bg-surface text-on-navy",
        "px-[60px] pt-[90px] pb-[40px] pr-[40px]",
        className,
      )}
      style={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: "20px",
        borderBottomRightRadius: "250px 350px",
        borderBottomLeftRadius: 0,
        boxShadow: "5px 15px 30px rgba(25, 52, 94, 0.15)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
