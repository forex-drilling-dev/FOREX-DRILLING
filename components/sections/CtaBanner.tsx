import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type Props = { headline: string; body?: string; cta: string; href: string };

export function CtaBanner({ headline, body, cta, href }: Props) {
  return (
    <section className="bg-amber py-24 text-black">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-lg uppercase leading-none">{headline}</h2>
          {body && <p className="mt-6 text-body-lg">{body}</p>}
        </div>
        <Button href={href} variant="primary" className="bg-black text-fore hover:bg-fore hover:text-black">
          {cta}
        </Button>
      </Container>
    </section>
  );
}
