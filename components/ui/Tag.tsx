import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = { className?: string; children: ReactNode };

export function Tag({ className, children }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-subtle",
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-amber" aria-hidden />
      {children}
    </span>
  );
}
