import {
  NavyBlob,
  YellowBadge,
  SpeechBubble,
  DrillBitPin,
  IndexNumber,
  YellowWave,
  DotsTrio,
  Crosshair,
  CircleImageRing,
  OverlayImageCard,
  BgGreyShape,
} from "@/components/v3";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

// ─── Hero spread — agency reference port ────────────────────────────────────
//
// Faithful translation of the marketing-agency reference composition into a
// responsive hero. Keeps every signature element: navy blob with floating
// yellow badge, dark navy speech bubble for a key stat, three-dots indicator,
// crosshair, large circular image with offset ring, drilled overlay card,
// big numbered index, yellow wave bleeding off the bottom-right, pale grey
// watermark shape top-right.
//
// Mobile (<lg): stacks vertically. Decorative elements (BgGreyShape, YellowWave,
// Crosshair, DotsTrio) are hidden below lg to avoid clutter on small screens.

function HeroSpread() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-black pt-[calc(var(--spacing-nav)+24px)] pb-32 lg:pb-44"
    >
      {/* Background watermark + accents — desktop only */}
      <BgGreyShape className="right-[-50px] top-[60px] hidden lg:block" />
      <Crosshair size={36} className="absolute right-[120px] top-[90px] hidden lg:block" />
      <DotsTrio size={28} className="absolute right-[200px] top-[80px] hidden xl:flex" />
      <YellowWave className="bottom-[-60px] right-[-60px] hidden lg:block" />

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-x-12">

          {/* ═══ LEFT — navy blob + circular image + bottom index ═══ */}
          <div className="relative lg:col-span-7">

            {/* Yellow badge floating above the navy blob */}
            <YellowBadge className="relative z-20 -mb-6 lg:-mb-8 lg:ml-2">
              FOREX
            </YellowBadge>

            {/* Navy blob containing H1 + lede */}
            <NavyBlob className="relative z-10 max-w-[640px]">
              <h1
                id="hero-title"
                className="font-display text-3xl font-extrabold uppercase leading-[1.1] tracking-wide md:text-4xl"
              >
                Specialized drilling.
                <br />
                <span className="text-amber">Asia-Pacific operations.</span>
              </h1>
              <p className="mt-6 max-w-[400px] font-display text-sm font-normal leading-relaxed text-on-navy-muted">
                Forex Drilling delivers safe, reliable, high-quality drilling services across mining,
                exploration, and civil projects. Headquartered in Singapore — operating in
                Papua New Guinea and the wider Asia-Pacific region.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/services" variant="amber">Our Services</Button>
                <Button
                  href="/about"
                  variant="ghost"
                  className="border border-white/30 text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>
            </NavyBlob>

            {/* Circular operator photo + index number, side by side */}
            <div className="mt-12 flex flex-wrap items-end gap-x-10 gap-y-8 lg:mt-16">
              <CircleImageRing
                src="/images/rig-vertical-operator.jpg"
                alt="Forex Drilling crew on site"
                size={280}
                ringOffset={18}
                priority
              />
              <IndexNumber label="EST." index="17" code="002" className="mb-4" />
            </div>
          </div>

          {/* ═══ RIGHT — speech bubble + central note + overlay card ═══ */}
          <div className="relative lg:col-span-5 lg:pt-12">

            {/* Speech bubble — single key stat */}
            <div className="relative ml-auto w-fit lg:mr-12">
              <SpeechBubble label="METHODS" value="12" size={170} />
            </div>

            {/* Central note paragraph */}
            <div className="mt-12 max-w-sm lg:ml-6">
              <p className="font-display text-base font-extrabold leading-snug text-deep-navy">
                Drilling, instrumentation, downhole &amp; data
              </p>
              <p className="mt-2 font-display text-sm leading-relaxed text-surface/80">
                A full spectrum of specialist capabilities in one mobilisation.
              </p>
            </div>

            {/* Overlay image card with drill-bit pins */}
            <div className="mt-16">
              <OverlayImageCard
                src="/images/hero-night-site.jpg"
                alt="Multi-rig night drilling operation"
                title="MULTI-RIG SITE OPERATIONS — NIGHT & DAY"
                body={
                  <>
                    From greenfield exploration to active mine pits. Modern, versatile rigs
                    deployed with experienced crews. Structured maintenance, disciplined
                    field practice, and reliable data capture across every shift.
                  </>
                }
                pins={
                  <>
                    <DrillBitPin size={48} />
                    <DrillBitPin size={48} />
                  </>
                }
              />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSpread />
    </>
  );
}
