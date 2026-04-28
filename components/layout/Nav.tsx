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
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-nav transition-colors duration-base ease-precise",
        scrolled ? "bg-surface/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" className="font-mono text-mono-sm uppercase tracking-widest text-fore">
          FOREX <span className="text-amber">//</span> DRILLING
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
                  "font-mono text-mono-xs uppercase tracking-widest transition-colors duration-fast",
                  active ? "text-amber" : "text-subtle hover:text-fore",
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
          <span className="font-mono text-mono-xs uppercase text-fore">
            {open ? "Close" : "Menu"}
          </span>
        </button>
      </Container>

      {open && (
        <div className="md:hidden">
          <Container className="flex flex-col gap-4 border-t border-border bg-surface py-6">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-mono-sm uppercase text-fore"
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
