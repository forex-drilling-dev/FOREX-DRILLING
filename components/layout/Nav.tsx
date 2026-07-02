"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { AnimatedLogoMark } from "@/components/motion/AnimatedLogoMark";
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

  // Close the mobile menu on navigation — state adjusted during render
  // (not in an effect) per react-hooks/set-state-in-effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

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
              homepage hero copy). Plays the logo build animation once per
              session, then settles on the static /logo-mark.svg. */}
          <AnimatedLogoMark className="h-8 w-auto select-none sm:h-9 md:h-11" />
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
                aria-current={active ? "page" : undefined}
                className={cn(
                  "draw-underline pb-1 font-display text-sm font-bold uppercase tracking-[0.12em] transition-colors duration-fast",
                  active
                    ? "draw-underline-active text-amber"
                    : "text-deep-navy hover:text-amber",
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
          className="-m-3 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 p-3 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Visual cue — universal hamburger / cross icon so the affordance
              reads instantly. The text label stays for clarity at all
              levels of brand familiarity and for screen reader fallback. */}
          <span aria-hidden className="flex h-4 w-4 flex-col justify-center text-deep-navy">
            {open ? (
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3 3 L13 13 M13 3 L3 13" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M2 4 H14 M2 8 H14 M2 12 H14" />
              </svg>
            )}
          </span>
          <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-deep-navy">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </Container>

      {open && (
        <div className="md:hidden">
          <Container className="flex flex-col border-t border-border bg-white py-2 shadow-card">
            {site.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                // min-h-11 + py-3 gives a 44px+ tap target per WCAG 2.5.5
                // while keeping the visual rhythm of the menu compact.
                className="-mx-2 flex min-h-11 items-center px-2 py-3 font-display text-sm font-bold uppercase tracking-[0.12em] text-deep-navy hover:text-amber"
                // Staggered slide-in — 50ms per item, killed by the global
                // prefers-reduced-motion rule in globals.css.
                style={{ animation: "menu-item-in 300ms ease-out both", animationDelay: `${i * 50}ms` }}
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
