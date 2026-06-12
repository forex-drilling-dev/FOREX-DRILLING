import type { Metadata } from "next";
import { fontDisplay, fontBody, fontMono } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { PageTransition } from "@/components/layout/PageTransition";
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
    "Specialty drilling services for mining, exploration, civil, groundwater, and geothermal programs across the Asia-Pacific. Headquartered in Singapore, operating in Papua New Guinea.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Forex Drilling",
    title:
      "Forex Drilling — Specialty Drilling Contractor | Singapore & Asia-Pacific",
    description:
      "Specialty drilling services for mining, exploration, civil, groundwater, and geothermal programs across the Asia-Pacific.",
    locale: "en_SG",
    url: "/",
  },
  // Google Search Console — domain ownership verification.
  // Renders as <meta name="google-site-verification" content="..." />.
  verification: {
    google: "ahtiFmTesApp0tL7Xu7j7YbcKysvJoQeRhJciQN8PI8",
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
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <OrganizationSchema />
      </body>
    </html>
  );
}
