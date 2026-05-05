import { cn } from "@/lib/utils";

type Props = {
  /** First line — appears in dark navy */
  line1: string;
  /** Optional second line — appears in ocre/yellow */
  line2?: string;
  className?: string;
  /** Heading level (default h2) */
  as?: "h1" | "h2" | "h3";
};

/**
 * Two-line display heading — line 1 navy, line 2 ocre.
 * Color does the hierarchy, not size.
 *
 * Pattern source: agency reference H2 inside the navy blob — both lines
 * the same size and weight, only colour shift between them.
 */
export function SectionHeading({ line1, line2, className, as: Tag = "h2" }: Props) {
  return (
    <Tag
      className={cn(
        "font-display font-extrabold uppercase leading-[0.95] tracking-[-0.005em] text-balance text-deep-navy",
        className,
      )}
      style={{
        // Editorial scale: dominant on mobile (≈ 36px at 375vw) yet bounded
        // on desktop so it doesn't blow out the column rhythm.
        fontSize: "clamp(34px, 9.5vw, 46px)",
        letterSpacing: "-0.005em",
      }}
    >
      {line1}
      {line2 && (
        <>
          <br />
          {/* amber-dim — passes WCAG AA on white/light-grey section bgs */}
          <span style={{ color: "var(--color-amber-dim)" }}>{line2}</span>
        </>
      )}
    </Tag>
  );
}
