import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-32 bg-deep-navy py-20 text-on-navy">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-wide md:text-4xl">
              FOREX
              <br />
              <span className="text-amber">DRILLING</span>
            </p>
            <p className="mt-6 max-w-sm font-display text-sm font-normal leading-relaxed text-on-navy-muted">
              Specialized drilling services across the Asia-Pacific region.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-amber">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-display text-sm font-medium text-on-navy-muted transition-colors duration-fast hover:text-amber"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-amber">
              Contact
            </p>
            <p className="mt-5 font-display text-sm font-normal text-on-navy-muted">
              {site.footer.address}
            </p>
            <a
              href={`mailto:${site.footer.email}`}
              className="mt-2 block font-display text-sm font-medium text-on-navy transition-colors duration-fast hover:text-amber"
            >
              {site.footer.email}
            </a>
          </div>
        </div>

        <div className="my-12 h-px w-full bg-white/15" />

        <div className="flex flex-col justify-between gap-4 font-display text-xs font-medium uppercase tracking-[0.12em] text-on-navy-muted md:flex-row">
          <span>© {new Date().getFullYear()} Forex Drilling Pte Ltd</span>
          <span>Built in Singapore · Operating across Asia-Pacific</span>
        </div>
      </Container>
    </footer>
  );
}
