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
          // -mx-2 px-2 -my-3 py-3 expands the touch area to 44px+ tall on
          // mobile without changing the visible logo position.
          className="-mx-2 -my-3 flex min-h-11 items-center px-2 py-3 transition-opacity duration-200 hover:opacity-80"
        >
          {/* Official brand logo, mark-only variant — icon + FOREX DRILLING
              wordmark, tagline cropped out (it would just repeat the
              homepage hero copy). Plain <img> for pure-vector rendering. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt="Forex Drilling"
            width={880}
            height={200}
            decoding="async"
            className="h-7 w-auto select-none sm:h-8 md:h-9"
          />
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
          // 44×44 tap target (WCAG 2.5.5). -m-3 cancels the visual padding so
          // the button looks the same to the eye but is touchable everywhere.
          className="-m-3 inline-flex min-h-11 min-w-11 items-center justify-center p-3 md:hidden"
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
          <Container className="flex flex-col border-t border-border bg-white py-2 shadow-card">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // min-h-11 + py-3 gives a 44px+ tap target per WCAG 2.5.5
                // while keeping the visual rhythm of the menu compact.
                className="-mx-2 flex min-h-11 items-center px-2 py-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-deep-navy hover:text-amber"
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
