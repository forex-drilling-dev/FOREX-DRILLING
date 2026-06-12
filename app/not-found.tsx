import type { Metadata } from "next";
import { PrimaryButton, Crosshair } from "@/components/v3";

export const metadata: Metadata = { title: "404 · Page Not Found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center bg-white pt-[var(--spacing-nav)]">
      {/* Cartographic wink — a survey mark with no fix on this page */}
      <div className="absolute top-[calc(var(--spacing-nav)+48px)] right-6 md:right-14">
        <Crosshair size={36} coords="LOCATION UNKNOWN · NO FIX" />
      </div>
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 md:px-14">
        <p
          className="font-display font-bold uppercase text-amber"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          404 · Not Found
        </p>
        <h1
          className="font-display font-extrabold uppercase leading-[1.05] text-deep-navy text-balance"
          style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "0.5px", maxWidth: "20ch" }}
        >
          This page <span className="text-amber">doesn&rsquo;t exist.</span>
        </h1>
        <p
          className="max-w-lg font-sans"
          style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: "1.7", color: "var(--color-muted)" }}
        >
          The page you&rsquo;re looking for may have moved, or it never existed.
          Head back to the homepage to explore Forex Drilling&rsquo;s services.
        </p>
        <div className="flex flex-wrap gap-4">
          <PrimaryButton href="/" variant="amber">Back to homepage</PrimaryButton>
          <PrimaryButton href="/contact" variant="ghost-on-light">Contact us</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
