import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Speed = "slow" | "base" | "fast";

type Props = { children: ReactNode; className?: string; speed?: Speed };

const speeds: Record<Speed, string> = {
  slow: "[animation-duration:60s]",
  base: "[animation-duration:40s]",
  fast: "[animation-duration:24s]",
};

export function Marquee({ children, className, speed = "base" }: Props) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className={cn("flex w-max animate-marquee", speeds[speed])}>
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
