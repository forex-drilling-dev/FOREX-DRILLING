import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-deep-navy py-20 text-on-navy">
      {/* Watermark — large threaded rod (vis) bleeding off bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-120px] right-[-80px] hidden lg:block"
        style={{
          width: "260px",
          height: "780px",
          opacity: 0.06,
          transform: "rotate(15deg)",
          transformOrigin: "center",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 180 560" fill="none" preserveAspectRatio="none">
          <rect x="46" y="40" width="88" height="32" rx="4" stroke="#FFFFFF" strokeWidth="6" fill="none" />
          <path d="M58 80 V440 L90 510 L122 440 V80" stroke="#FFFFFF" strokeWidth="6" fill="none" strokeLinejoin="round" />
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M40 ${110 + i * 24} L140 ${118 + i * 24}`}
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <Container>
        <div className="relative grid gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <svg width="56" height="56" viewBox="0 0 100 100" fill="none" aria-hidden className="shrink-0">
                <path d="M0 0 L100 0 L50 50 Z" fill="var(--color-amber)" />
                <path d="M0 100 L100 100 L50 50 Z" fill="var(--color-amber)" />
                <path d="M0 0 L0 100 L50 50 Z" fill="#FFFFFF" />
                <path d="M100 0 L100 100 L50 50 Z" fill="#FFFFFF" />
              </svg>
              <p
                className="font-display font-bold uppercase leading-[0.95]"
                style={{ fontSize: "28px", letterSpacing: "0.02em" }}
              >
                Forex<br />
                <span className="text-amber">Drilling</span>
              </p>
            </div>
            <p className="mt-6 max-w-sm font-sans text-sm font-normal leading-relaxed text-on-navy-muted">
              Specialised drilling services across the Asia-Pacific region —
              Singapore HQ, Papua New Guinea field operations.
            </p>

            {/* "EN OPS" status indicator */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 py-2 pl-3 pr-5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
              </span>
              <span
                className="font-mono uppercase text-on-navy-muted"
                style={{ fontSize: "10px", letterSpacing: "0.18em" }}
              >
                In Operations · PNG Highlands
              </span>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-amber">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm font-medium text-on-navy-muted transition-colors duration-fast hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-amber">
              Contact
            </p>
            <p className="mt-5 font-sans text-sm font-normal text-on-navy-muted">
              {site.footer.address}
            </p>
            <a
              href={`mailto:${site.footer.email}`}
              className="mt-2 block font-sans text-sm font-medium text-on-navy transition-colors duration-fast hover:text-amber"
            >
              {site.footer.email}
            </a>

            {/* Coordinates */}
            <p
              className="mt-6 font-mono uppercase text-on-navy-muted/60"
              style={{ fontSize: "10px", letterSpacing: "0.18em" }}
            >
              01°20′N · 103°50′E (SG)<br />
              06°00′S · 145°00′E (PNG)
            </p>
          </div>
        </div>

        <div className="relative my-12 h-px w-full bg-white/15" />

        <div className="relative flex flex-col justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em] text-on-navy-muted/70 md:flex-row">
          <span>© {new Date().getFullYear()} Forex Drilling Pte Ltd</span>
          <span>Built in Singapore · Field-proven across Asia-Pacific</span>
        </div>
      </Container>
    </footer>
  );
}
