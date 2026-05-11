import type { ReactNode } from "react";
import Image from "next/image";
import { blurPlaceholder, optimizedSrc } from "@/lib/images";
import { NavyBlob } from "./NavyBlob";
import { YellowBadge } from "./YellowBadge";
import { CircleImageRing } from "./CircleImageRing";
import { BgGreyShape } from "./BgGreyShape";

type Props = {
  /** Yellow asymmetric badge label, e.g. "ABOUT" */
  badge: string;
  /** First line of the H1 — navy text inside the blob */
  line1: string;
  /** Second line of the H1 — yellow text inside the blob.
   *  Pass an empty string for single-line titles (service detail pages). */
  line2: string;
  /** Body paragraph rendered after the title (small, muted on navy) */
  body: ReactNode;
  /** Circle photo anchored at viewport right */
  photo: { src: string; alt: string };
};

/**
 * Shared inner-page hero.
 *
 * Two completely different compositions per breakpoint — not a scaled
 * desktop:
 *
 * - **Mobile / tablet (<lg)**: native vertical card. Banner photo (16:10)
 *   at the top with the yellow badge floating over its bottom-left, a
 *   tight navy panel directly underneath holding the heading + body.
 *   No giant 260px circle, no oversized blob — dense, scannable,
 *   ~480px tall total.
 * - **Desktop (lg+)**: full-bleed editorial poster, unchanged.
 */
export function PageHero({ badge, line1, line2, body, photo }: Props) {
  const headingText = line2 ? `${line1} ${line2}` : line1;
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Single canonical <h1>. The visual variants both use aria-hidden
          so the static DOM exposes exactly one heading per page. */}
      <h1 className="sr-only">{headingText}</h1>

      {/* ─── Mobile / tablet — native vertical card ───────────────── */}
      <div className="relative flex flex-col bg-white pt-[var(--spacing-nav)] lg:hidden">
        {/* Banner photo — full width, 16:10. Replaces the 260px circle,
            which was too dense visually for small screens. */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={optimizedSrc(photo.src)}
            alt={photo.alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={blurPlaceholder(photo.src)}
          />
          {/* Soft navy fade at the bottom so the badge sits cleanly on it. */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep-navy/60 to-transparent"
          />
          {/* Yellow badge anchored to the bottom-left of the banner. */}
          <div className="absolute bottom-3 left-4">
            <YellowBadge size="sm">{badge}</YellowBadge>
          </div>
        </div>

        {/* Navy panel — tight, scoped to content. No left margin, full
            bleed. Padding sized for thumb reach, not editorial breathing. */}
        <div className="relative bg-deep-navy px-5 py-7 sm:px-6 sm:py-8">
          <p
            aria-hidden="true"
            className="font-display font-extrabold uppercase leading-[1.05] text-on-navy"
            style={{
              fontSize: "clamp(22px, 6.4vw, 28px)",
              letterSpacing: "0.3px",
            }}
          >
            {line1}
            {line2 && (
              <>
                <br />
                <span className="text-amber">{line2}</span>
              </>
            )}
          </p>
          <p
            className="mt-3 font-sans font-normal text-on-navy-muted"
            style={{ fontSize: "14px", lineHeight: "1.6" }}
          >
            {body}
          </p>
        </div>
      </div>

      {/* ─── Desktop — full-bleed editorial poster (lg+) ─────────── */}
      <div className="relative hidden h-[680px] pt-[var(--spacing-nav)] lg:block">
        <BgGreyShape className="top-[120px] right-[-50px]" />

        <div
          className="absolute top-[110px] z-[3]"
          style={{ left: "clamp(40px, 4vw, 100px)" }}
        >
          <YellowBadge>{badge}</YellowBadge>
        </div>

        <NavyBlob
          className="absolute top-[140px] left-0 z-[2]"
          style={{
            width: "clamp(560px, 46vw, 720px)",
            paddingLeft: "clamp(40px, 4vw, 80px)",
            paddingRight: "clamp(40px, 4vw, 60px)",
            paddingTop: "100px",
            paddingBottom: "40px",
          }}
        >
          <p
            aria-hidden="true"
            className="font-display font-extrabold uppercase leading-[1.05] text-on-navy"
            style={{
              fontSize: "clamp(32px, 2.6vw, 44px)",
              letterSpacing: "0.5px",
              marginBottom: line2 ? 0 : "28px",
            }}
          >
            {line1}
            {line2 && (
              <>
                <br />
                <span className="text-amber">{line2}</span>
              </>
            )}
          </p>
          <p
            className="mt-7 font-sans font-normal text-on-navy-muted"
            style={{ fontSize: "15px", lineHeight: "1.7", maxWidth: "440px" }}
          >
            {body}
          </p>
        </NavyBlob>

        <div
          className="absolute top-[180px] z-[5]"
          style={{ right: "clamp(60px, 7vw, 200px)" }}
        >
          <CircleImageRing
            src={photo.src}
            alt={photo.alt}
            size={320}
            ringOffset={22}
            priority
          />
        </div>
      </div>
    </section>
  );
}
