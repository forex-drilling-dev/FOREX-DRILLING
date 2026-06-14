import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Two-line quote — line 2 ocre */
  line1: string;
  line2: string;
  /** Body paragraph below */
  children?: ReactNode;
  /** "light" (default) for white/grey sections; "dark" for navy bandeaux */
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Editorial pull quote — for HSE / safety statements / mission lines.
 * Big condensed display with line 2 in ocre. Surrounded by negative space.
 * `variant="dark"` flips the text to white for use on a navy bandeau.
 */
export function QuoteBlock({
  line1,
  line2,
  children,
  variant = "light",
  className,
}: Props) {
  const isDark = variant === "dark";
  return (
    <blockquote className={cn("flex flex-col gap-8", className)}>
      <p
        className={cn(
          "font-display font-black uppercase",
          isDark ? "text-on-navy" : "text-deep-navy",
        )}
        style={{
          fontSize: "clamp(30px, 5.5vw, 80px)",
          lineHeight: "0.95",
          letterSpacing: "-0.005em",
        }}
      >
        &ldquo;{line1}
        <br />
        <span className="text-amber">{line2}&rdquo;</span>
      </p>
      {children && (
        <div
          className="font-sans max-w-[55ch]"
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            color: isDark
              ? "var(--color-on-navy-muted)"
              : "var(--color-muted)",
          }}
        >
          {children}
        </div>
      )}
    </blockquote>
  );
}
