"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      data-nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-nav transition-shadow duration-base ease-precise",
        "bg-white/95 backdrop-blur-md",
        scrolled && "shadow-card",
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <Link
          href="/"
          aria-label="Forex Drilling — home"
          className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
        >
          {/* Brand X icon — top/right/bottom yellow, left dark navy
              (pointing right, forming the inner "bite" of the X) */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path d="M0 0 L100 0 L50 50 Z"     fill="var(--color-amber)" />
            <path d="M100 0 L100 100 L50 50 Z" fill="var(--color-amber)" />
            <path d="M0 100 L100 100 L50 50 Z" fill="var(--color-amber)" />
            <path d="M0 0 L0 100 L50 50 Z"     fill="var(--color-deep-navy)" />
          </svg>
          <span
            className="font-display font-bold uppercase leading-[0.95] text-deep-navy"
            style={{ fontSize: "16px", letterSpacing: "0.04em" }}
          >
            Forex<br />Drilling
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => {
            const href = item.href as string;
            const active =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-display text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-fast",
                  active ? "text-amber" : "text-deep-navy hover:text-amber",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-deep-navy">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </Container>

      {open && (
        <div className="md:hidden">
          <Container className="flex flex-col gap-4 border-t border-border bg-white py-6 shadow-card">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-sm font-bold uppercase tracking-[0.12em] text-deep-navy hover:text-amber"
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
