import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Yellow wave shape anchored in a corner, debording out of frame.
 * Pattern source: agency reference, bottom-right yellow shape that bleeds off-canvas.
 *
 * Use as an absolute-positioned decoration. Default placement assumes bottom-right;
 * override via className for other corners. Always rotate / mirror to fit the corner.
 */
export function YellowWave({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bg-amber wave-yellow-br",
        "h-[280px] w-[460px]",
        className,
      )}
    />
  );
}
