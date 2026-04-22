import type { Metadata } from "next";
import { fontDisplay, fontMono, fontSans, fontAccent } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Forex Drilling — Specialized Drilling Services",
    template: "%s — Forex Drilling",
  },
  description:
    "Safe, reliable, high-quality drilling services across the Asia-Pacific region. Based in Singapore with operations in Papua New Guinea.",
  metadataBase: new URL("https://forexdrilling.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontMono.variable} ${fontSans.variable} ${fontAccent.variable}`}
    >
      <body className="bg-black text-fore antialiased">{children}</body>
    </html>
  );
}
