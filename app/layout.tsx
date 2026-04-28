import type { Metadata } from "next";
import { fontDisplay, fontMono, fontSans } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SkipLink } from "@/components/layout/SkipLink";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Forex Drilling — Specialized Drilling Services",
    template: "%s — Forex Drilling",
  },
  description:
    "Safe, reliable, high-quality drilling services across the Asia-Pacific region. Based in Singapore with operations in Papua New Guinea.",
  metadataBase: new URL("https://forexdrilling.com"),
  openGraph: {
    type: "website",
    title: "Forex Drilling",
    description: "Specialized drilling services across the Asia-Pacific region.",
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontMono.variable} ${fontSans.variable}`}
    >
      <body className="bg-black text-fore antialiased">
        <SkipLink />
        <CustomCursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
