import { cn } from "@/lib/utils";

type Props = {
  /** Small label above, e.g. "EAQUE" */
  label: string;
  /** Large numeric index, e.g. "17" */
  index: string | number;
  /** Subscript code below, e.g. "002" */
  code?: string;
  className?: string;
};

/**
 * Editorial index marker — small label, huge number, optional code subscript,
 * with a short dashed line to the right of the index.
 *
 * Pattern source: agency reference, bottom-left "EAQUE / 17 / 002" stack.
 *
 * Used as section anchor — replaces section numbering in a more distinctive way.
 */
export function IndexNumber({ label, index, code, className }: Props) {
  return (
    <div className={cn("flex flex-col text-surface", className)}>
      <span className="font-display text-base font-extrabold uppercase tracking-[0.12em]">
        {label}
      </span>
      <div className="relative mt-1 flex items-end gap-3">
        <span className="font-display font-black leading-none text-[var(--text-index-xl)]">
          {index}
        </span>
        <span aria-hidden className="mb-3 h-[2px] w-12 border-t-2 border-dashed border-subtle" />
      </div>
      {code && (
        <span className="mt-1 font-display text-base font-extrabold tracking-[0.06em]">
          {code}
        </span>
      )}
    </div>
  );
}
