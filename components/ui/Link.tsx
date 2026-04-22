import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = { href: string; className?: string; children: ReactNode };

export function ArrowLink({ href, className, children }: Props) {
  return (
    <NextLink
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-wider text-fore transition-colors duration-fast hover:text-amber",
        className,
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1"
        aria-hidden
      />
    </NextLink>
  );
}
