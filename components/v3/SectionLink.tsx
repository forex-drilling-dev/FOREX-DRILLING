import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  /** Where the link goes (Next.js route) */
  href: string;
  /** Single word or short phrase shown to the visitor */
  label: string;
  /** Optional className override on the wrapper */
  className?: string;
  /** Optional small "Next" prefix label above the link */
  prefix?: string;
}

/**
 * Small amber-underlined word + arrow that nudges the visitor to the
 * next page. Used at the bottom of every section / page to keep the
 * navigation flowing without dropping a heavy CTA banner everywhere.
 *
 * Brand styling: navy uppercase display font, amber 2px underline with
 * a 6px offset, hover deepens both text and underline to amber and the
 * arrow nudges right. Focus-visible amber outline for a11y.
 */
export function SectionLink({ href, label, className, prefix }: Props) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      {prefix && (
        <span
          className="font-display font-bold uppercase text-muted"
          style={{ fontSize: "10px", letterSpacing: "0.22em" }}
        >
          {prefix}
        </span>
      )}
      <Link
        href={href}
        className={cn(
          "group inline-flex items-center gap-2 font-display font-bold uppercase text-deep-navy",
          "underline decoration-amber decoration-2 underline-offset-[6px]",
          "transition-colors duration-200 hover:text-amber hover:decoration-amber",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber",
        )}
        style={{ fontSize: "13px", letterSpacing: "0.18em" }}
      >
        <span>{label}</span>
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          aria-hidden
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path
            d="M1 5h12m-4-4 4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
