import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep-navy py-20 text-on-navy">
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
          <rect x="46" y="40" width="88" height="32" rx="4" stroke="currentColor" strokeWidth="6" fill="none" />
          <path d="M58 80 V440 L90 510 L122 440 V80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinejoin="round" />
          {Array.from({ length: 14 }).map((_, i) => (
            <path
              key={i}
              d={`M40 ${110 + i * 24} L140 ${118 + i * 24}`}
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <Container>
        <div className="relative grid gap-12 md:grid-cols-12">
          {/* Brand block — official white mark-only logo on navy bg. Tagline
              cropped: it lives once in the homepage hero, the footer doesn't
              need to repeat it. Pure-vector <img>, sharp at any scale. */}
          <div className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white-mark.svg"
              alt="Forex Drilling"
              width={880}
              height={200}
              decoding="async"
              className="h-10 w-auto select-none md:h-12"
            />
            <p className="mt-6 max-w-sm font-sans text-sm font-normal leading-relaxed text-on-navy-muted">
              Specialised drilling services across the Asia-Pacific region.
            </p>
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
                    // 15px on mobile for readability, 14px on md+ to keep
                    // the editorial rhythm of the desktop footer.
                    className="block py-1 font-sans text-[15px] font-medium text-on-navy-muted transition-colors duration-fast hover:text-amber md:text-sm md:py-0"
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
            <a
              href={`mailto:${site.footer.email}`}
              className="mt-5 block font-sans text-sm font-medium text-on-navy transition-colors duration-fast hover:text-amber"
            >
              {site.footer.email}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
