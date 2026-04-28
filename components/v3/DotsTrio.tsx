import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  size?: number;
};

/**
 * Three coloured dots — yellow, navy mid, dark navy.
 * Pattern source: agency reference, top-right indicator next to the crosshair.
 *
 * Reads as "section marker" or "step indicator" — never as functional pagination.
 */
export function DotsTrio({ className, size = 28 }: Props) {
  const style = { width: size, height: size };
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden>
      <span className="rounded-full bg-amber"     style={style} />
      <span className="rounded-full bg-surface"   style={style} />
      <span className="rounded-full bg-deep-navy" style={style} />
    </div>
  );
}
