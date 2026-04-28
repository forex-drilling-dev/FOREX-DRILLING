import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "404 — Page Not Found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center pt-nav">
      <Container className="flex flex-col gap-10">
        <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">
          404 — Not Found
        </p>
        <h1 className="font-display text-display-xl uppercase leading-[0.88] text-fore text-balance">
          This page<br />
          <span className="text-ocre-400">doesn&rsquo;t exist.</span>
        </h1>
        <p className="max-w-lg text-body-lg text-muted">
          The page you&rsquo;re looking for may have moved or never existed.
          Head back to the homepage to explore Forex Drilling&rsquo;s services.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/" variant="amber">Back to Homepage</Button>
          <Button href="/contact" variant="ghost">Contact Us</Button>
        </div>
      </Container>
    </section>
  );
}
