import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Forex Drilling", template: "%s — Forex Drilling" },
  description: "Specialized drilling services across the Asia-Pacific region.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-fore antialiased">{children}</body>
    </html>
  );
}
