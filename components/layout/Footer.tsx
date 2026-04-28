import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-black py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-display-md leading-none text-fore">
              FOREX
              <br />
              DRILLING
            </p>
            <p className="mt-6 max-w-sm text-body text-subtle">
              Specialized drilling services across the Asia-Pacific region.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Navigate</p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-body text-muted hover:text-amber">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Contact</p>
            <p className="mt-4 text-body text-muted">{site.footer.address}</p>
            <a
              href={`mailto:${site.footer.email}`}
              className="mt-2 block text-body text-muted hover:text-amber"
            >
              {site.footer.email}
            </a>
          </div>
        </div>
        <Divider className="my-12" />
        <div className="flex flex-col justify-between gap-4 font-mono text-mono-xs uppercase tracking-widest text-muted md:flex-row">
          <span>© {new Date().getFullYear()} Forex Drilling Pte Ltd</span>
          <span>Built in Singapore · Operating across Asia-Pacific</span>
        </div>
      </Container>
    </footer>
  );
}
