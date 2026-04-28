import { cn } from "@/lib/utils";

type Props = {
  /** Mono label above the big number, e.g. "EATEMPED" */
  label: string;
  /** Big bold value */
  value: string | number;
  className?: string;
  size?: number;
};

/**
 * Navy circular speech bubble with a triangular tail bottom-left.
 * Pattern source: agency reference — the dark navy "EATEMPED 15" callout.
 *
 * Used for highlighting a single key stat or callout value.
 */
export function SpeechBubble({ label, value, className, size = 160 }: Props) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-full",
        "bg-deep-navy text-on-navy shadow-bubble",
        className,
      )}
    >
      <span className="font-display text-xs font-semibold uppercase tracking-[0.18em]">
        {label}
      </span>
      <span className="mt-1 font-display text-5xl font-black leading-none">
        {value}
      </span>
      {/* Tail — triangular pointer, bottom-left */}
      <span
        aria-hidden
        className="absolute bottom-[-14px] left-[18px] block h-0 w-0"
        style={{
          borderTop: "32px solid var(--color-deep-navy)",
          borderRight: "22px solid transparent",
        }}
      />
    </div>
  );
}
