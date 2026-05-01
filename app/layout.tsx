import type { Metadata } from "next";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import "./globals.css";

const SITE_URL = "https://forexdrilling.com";

export const metadata: Metadata = {
  title: {
    default:
      "Forex Drilling — Specialty Drilling Contractor | Singapore & Asia-Pacific",
    template: "%s — Forex Drilling",
  },
  description:
    "Specialty drilling services for mining, exploration, civil, and groundwater programs across the Asia-Pacific. Headquartered in Singapore, operating in Papua New Guinea.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Forex Drilling",
    title:
      "Forex Drilling — Specialty Drilling Contractor | Singapore & Asia-Pacific",
    description:
      "Specialty drilling services for mining, exploration, civil, and groundwater programs across the Asia-Pacific.",
    locale: "en_SG",
    url: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body className="bg-black text-fore antialiased">
        <SkipLink />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <OrganizationSchema />
      </body>
    </html>
  );
}
