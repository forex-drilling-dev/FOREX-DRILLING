import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Large hollow rounded-rectangle shape in pale grey, anchored to a corner
 * and bleeding off the canvas. Read as a watermark / texture.
 *
 * Pattern source: agency reference, top-right grey outline that frames the composition.
 */
export function BgGreyShape({ className }: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute h-[600px] w-[300px] rounded-[100px]",
        "border-[20px] border-[#F3F4F6]",
        className,
      )}
    />
  );
}
