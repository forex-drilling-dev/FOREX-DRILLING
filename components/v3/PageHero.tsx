import type { ReactNode } from "react";
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
 * Shared inner-page hero — full-bleed poster matching the homepage's
 * visual rhythm. Navy blob hugs the viewport left edge, circle photo
 * hugs the viewport right edge, mire technical + grey watermark anchor
 * the right side. Below lg, switches to a stacked mobile layout.
 *
 * Use this for every inner page (about/services/fleet/hse/quality/projects)
 * so every hero shares the same spatial language as the homepage.
 */
export function PageHero({ badge, line1, line2, body, photo }: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* ─── Mobile / tablet — stacked ─────────────────────────── */}
      <div className="relative flex flex-col gap-12 px-6 pt-[calc(var(--spacing-nav)+48px)] pb-16 md:px-14 lg:hidden">
        <YellowBadge className="self-start">{badge}</YellowBadge>
        <NavyBlob
          className="-mt-7 ml-3 h-auto w-full max-w-[580px]"
          style={{ padding: "60px 28px 50px 32px" }}
        >
          <p
            className="font-display font-extrabold uppercase leading-[1.1] text-on-navy"
            style={{
              fontSize: "26px",
              letterSpacing: "0.5px",
              marginBottom: line2 ? 0 : "20px",
            }}
          >
            {line1}
          </p>
          {line2 && (
            <p
              className="font-display font-extrabold uppercase leading-[1.1] text-amber"
              style={{ fontSize: "26px", letterSpacing: "0.5px", marginBottom: "20px" }}
            >
              {line2}
            </p>
          )}
          <p
            className="font-sans font-normal text-on-navy-muted"
            style={{ fontSize: "14px", lineHeight: "1.7" }}
          >
            {body}
          </p>
        </NavyBlob>
        <div className="flex justify-center">
          <CircleImageRing
            src={photo.src}
            alt={photo.alt}
            size={260}
            ringOffset={18}
            priority
          />
        </div>
      </div>

      {/* ─── Desktop — full-bleed poster (lg+) ─────────────────── */}
      <div className="relative hidden h-[680px] pt-[var(--spacing-nav)] lg:block">
        {/* Background watermarks at viewport right edge */}
        <BgGreyShape className="top-[120px] right-[-50px]" />

        {/* Yellow badge floating above blob top-left */}
        <div
          className="absolute top-[110px] z-[3]"
          style={{ left: "clamp(40px, 4vw, 100px)" }}
        >
          <YellowBadge>{badge}</YellowBadge>
        </div>

        {/* Navy blob anchored to viewport LEFT */}
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
            className="font-display font-extrabold uppercase leading-[1.05] text-on-navy"
            style={{
              fontSize: "clamp(32px, 2.6vw, 44px)",
              letterSpacing: "0.5px",
              marginBottom: line2 ? 0 : "28px",
            }}
          >
            {line1}
          </p>
          {line2 && (
            <p
              className="font-display font-extrabold uppercase leading-[1.05] text-amber"
              style={{
                fontSize: "clamp(32px, 2.6vw, 44px)",
                letterSpacing: "0.5px",
                marginBottom: "28px",
              }}
            >
              {line2}
            </p>
          )}
          <p
            className="font-sans font-normal text-on-navy-muted"
            style={{ fontSize: "15px", lineHeight: "1.7", maxWidth: "440px" }}
          >
            {body}
          </p>
        </NavyBlob>

        {/* Circle photo anchored to viewport RIGHT */}
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
