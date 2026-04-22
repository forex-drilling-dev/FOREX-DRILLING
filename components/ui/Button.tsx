"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "amber";

type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

const base =
  "inline-flex items-center gap-3 px-6 py-3 font-mono text-mono-sm uppercase tracking-wider transition-colors duration-fast ease-precise focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary: "bg-fore text-black hover:bg-amber hover:text-black",
  ghost: "border border-border text-fore hover:border-amber hover:text-amber",
  amber: "bg-amber text-black hover:bg-fore",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: Props) {
  const cls = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" aria-hidden />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
