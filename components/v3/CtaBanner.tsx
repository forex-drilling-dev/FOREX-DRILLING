import type { ReactNode } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { cn } from "@/lib/utils";

type Props = {
  headline: string;
  body?: ReactNode;
  cta: string;
  href: string;
  /** Yellow bg with navy text (default) or navy bg with yellow accent */
  variant?: "amber" | "navy";
  className?: string;
};

/**
 * Full-width terminal CTA banner — closes a page with a clear next step.
 * Yellow variant uses the agency's strong amber slab; navy variant for
 * sections needing less visual punch.
 */
export function CtaBanner({
  headline,
  body,
  cta,
  href,
  variant = "amber",
  className,
}: Props) {
  const isAmber = variant === "amber";
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        isAmber ? "bg-amber" : "bg-deep-navy",
        className,
      )}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:gap-16 md:px-14 md:py-24">
        <div className="flex max-w-[640px] flex-col gap-5">
          <h2
            className={cn(
              "font-display font-black uppercase leading-[1.05]",
              isAmber ? "text-deep-navy" : "text-on-navy",
            )}
            style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "0.5px" }}
          >
            {headline}
          </h2>
          {body && (
            <p
              className={cn(
                "font-display",
                isAmber ? "text-deep-navy/80" : "text-on-navy-muted",
              )}
              style={{ fontSize: "16px", lineHeight: "1.65" }}
            >
              {body}
            </p>
          )}
        </div>
        <PrimaryButton
          href={href}
          variant={isAmber ? "navy" : "amber"}
        >
          {cta}
        </PrimaryButton>
      </div>
    </section>
  );
}
