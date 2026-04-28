import { Montserrat, IBM_Plex_Mono } from "next/font/google";

/**
 * V3 — single typographic family.
 * Montserrat covers display headings (700/800/900), section titles (600/700),
 * and body copy (400/500). One font, full hierarchy via weight + size.
 *
 * Variable name preserved as `--font-display-family` so existing class refs
 * (`font-display`, `font-sans`) keep working.
 */
export const fontDisplay = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display-family",
  display: "swap",
});

/** Mono — IBM Plex Mono, kept for tags / data badges */
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});

/** Aliased to fontDisplay so any `fontSans.variable` references still resolve */
export const fontSans = fontDisplay;
