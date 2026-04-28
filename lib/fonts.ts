import { Barlow_Condensed, IBM_Plex_Mono, Inter } from "next/font/google";

/** Display — Barlow Condensed 700/800, uppercase headlines */
export const fontDisplay = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display-family",
  display: "swap",
});

/** Mono — IBM Plex Mono, labels / tags / data badges */
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});

/** Sans / body — Inter 300/400/500 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans-family",
  display: "swap",
});

/**
 * Font swap protocol (when client files arrive):
 * 1. Drop .woff2 files into /public/fonts/
 * 2. Replace the Barlow_Condensed import with:
 *      import localFont from "next/font/local"
 *      export const fontDisplay = localFont({
 *        src: [{ path: "../public/fonts/forex-display-bold.woff2", weight: "700" }],
 *        variable: "--font-display-family",
 *      })
 * 3. --font-display CSS variable propagates everywhere automatically.
 */
