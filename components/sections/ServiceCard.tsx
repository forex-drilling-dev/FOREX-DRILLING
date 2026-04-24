import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  title: string;
  summary: string;
  href: string;
  className?: string;
};

export function ServiceCard({ index, title, summary, href, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col gap-6 border-l border-border bg-deep p-8 transition-all duration-base ease-precise hover:-translate-y-1 hover:border-amber",
        className,
      )}
    >
      <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">{index}</span>
      <h3 className="font-display text-display-sm uppercase text-fore">{title}</h3>
      <p className="text-body text-subtle">{summary}</p>
      <span className="mt-auto inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-widest text-fore">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
