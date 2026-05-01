import { Goldman, Parkinsans, IBM_Plex_Mono } from "next/font/google";

/**
 * BRAND TYPOGRAPHY — official charte graphique
 *
 * Display / logo: Goldman (regular 400, bold 700) — used for logo wordmark,
 *   H1, H2 stats and uppercase labels. Highly geometric, condensed,
 *   industrial — the agency's signature.
 *
 * Body: Parkinsans (300/400/500/600/700) — used for body copy, paragraphs,
 *   pull quotes. Humanist with subtle geometric character.
 *
 * Mono: IBM Plex Mono — kept for technical labels (HSE codes, badges).
 */
export const fontDisplay = Goldman({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display-family",
  display: "swap",
});

export const fontBody = Parkinsans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body-family",
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});
