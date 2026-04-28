import Image from "next/image";
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
  BgGreyShape,
} from "@/components/v3";

// ─────────────────────────────────────────────────────────────────────────────
// Hero — editorial poster composition.
//
// This is NOT a responsive grid layout. It is a fixed-aspect 1200×850 stage
// (matching the agency reference's canvas) with every element absolutely
// positioned at exact pixels. The composition relies on overlap, off-canvas
// bleed, and asymmetric weight distribution.
//
// Below the lg breakpoint we abandon the poster entirely and switch to a
// vertical stacked flow that keeps the spirit (same shapes, same content,
// same colour roles) without trying to scale the absolute positioning.
//
// The two layouts are rendered separately and toggled with hidden/lg:hidden.
// ─────────────────────────────────────────────────────────────────────────────

function HeroPoster() {
  return (
    <section
      aria-labelledby="hero-title-desktop"
      className="relative mx-auto hidden h-[850px] max-w-[1200px] lg:block"
    >
      {/* ── Background watermarks ─────────────────────────────────────── */}
      {/* Pale grey hollow rounded rect — bleeds off right edge */}
      <BgGreyShape className="top-[50px] right-[-50px]" />

      {/* Thin circle outline tucked behind the navy blob top-edge */}
      <div
        aria-hidden
        className="absolute top-[-50px] left-[350px] h-[200px] w-[200px] rounded-full border border-border"
      />

      {/* ── Navy blob — anchored top-left, 580×420 ───────────────────── */}
      {/* This is the GRAVITY CENTER. Everything orbits around it. */}
      <NavyBlob className="absolute top-[100px] left-0 h-[420px] w-[580px] z-[2]">
        <p
          id="hero-title-desktop"
          className="font-display font-extrabold uppercase leading-[1.2] text-on-navy"
          style={{ fontSize: "26px", letterSpacing: "0.5px" }}
        >
          Specialist drilling.
        </p>
        <p
          className="font-display font-extrabold uppercase leading-[1.2] text-amber"
          style={{ fontSize: "26px", letterSpacing: "0.5px", marginBottom: "25px" }}
        >
          Asia-Pacific delivery.
        </p>
        <p
          className="font-display font-normal text-on-navy-muted"
          style={{ fontSize: "13px", lineHeight: "1.6", maxWidth: "350px" }}
        >
          Forex Drilling delivers safe, reliable, high-quality drilling services
          across mining, exploration, and civil projects. Headquartered in Singapore,
          operating in Papua New Guinea and the wider Asia-Pacific region — where
          accuracy, safety, and resilience under pressure are non-negotiable.
        </p>
      </NavyBlob>

      {/* ── Yellow badge — overlaps top-left of navy blob ───────────── */}
      <YellowBadge className="absolute top-[80px] left-[50px] z-[3]">
        FOREX
      </YellowBadge>

      {/* ── Speech bubble — overlaps blob's right edge ───────────────── */}
      {/* Tail bottom-left points back into the blob */}
      <div className="absolute top-[170px] left-[480px] z-[4]">
        <SpeechBubble label="METHODS" value="12" />
      </div>

      {/* ── Three dots + crosshair — upper right indicator group ────── */}
      <DotsTrio className="absolute top-[70px] right-[300px]" size={32} />
      <div className="absolute top-[70px] right-[200px]">
        <Crosshair size={36} />
      </div>

      {/* ── Center note — short callout ──────────────────────────────── */}
      <div className="absolute top-[320px] left-[660px] max-w-[260px] z-[2]">
        <p
          className="font-display font-extrabold leading-[1.3]"
          style={{ fontSize: "16px", color: "var(--color-deep-navy)" }}
        >
          Drilling, instrumentation, downhole &amp; data
        </p>
        <p
          className="font-display"
          style={{
            fontSize: "15px",
            marginTop: "5px",
            color: "var(--color-surface)",
            opacity: 0.8,
          }}
        >
          A full spectrum of specialist capabilities in one mobilisation.
        </p>
      </div>

      {/* ── Yellow wave — bottom-right, bleeds off-canvas ────────────── */}
      <YellowWave className="bottom-[-50px] right-[-50px] z-[1]" />

      {/* ── Rectangular image card — bottom-right ───────────────────── */}
      <div className="absolute bottom-[120px] right-[100px] h-[250px] w-[580px] z-[5]">
        {/* Offset navy outline behind */}
        <div
          aria-hidden
          className="absolute -top-5 -left-5 h-[290px] w-[640px] rounded-[20px] border border-surface/30 z-[1]"
        />

        {/* Drill bit pins — pinned to top of card, anchored to its left-third */}
        <div className="absolute -top-[65px] left-[230px] z-[6] flex gap-5">
          <DrillBitPin />
          <DrillBitPin />
        </div>

        {/* Image + overlay */}
        <div
          className="relative h-full w-full overflow-hidden rounded-xl z-[2]"
          style={{ boxShadow: "var(--shadow-image)" }}
        >
          <Image
            src="/images/hero-night-site.jpg"
            alt="Multi-rig night drilling operation in Papua New Guinea"
            fill
            sizes="600px"
            className="object-cover"
            priority
          />
          {/* Navy overlay panel — right side, ~250px wide */}
          <div
            className="absolute inset-y-0 right-0 flex w-[250px] flex-col justify-center px-[25px] py-[25px]"
            style={{ background: "rgba(16, 33, 66, 0.95)" }}
          >
            <p
              className="font-display font-extrabold uppercase leading-[1.4] text-amber"
              style={{ fontSize: "14px", marginBottom: "15px" }}
            >
              Multi-rig site operations — night &amp; day
            </p>
            <p
              className="font-display font-normal text-on-navy-muted"
              style={{ fontSize: "10px", lineHeight: "1.5" }}
            >
              From greenfield exploration to active mine pits. Modern, versatile
              rigs deployed with experienced crews. Structured maintenance,
              disciplined field practice, and reliable data capture across every
              shift — that&rsquo;s our standard.
            </p>
          </div>
        </div>
      </div>

      {/* ── Circle image with offset ring — bottom-left ─────────────── */}
      <div className="absolute bottom-[120px] left-[100px] z-[5]">
        <CircleImageRing
          src="/images/rig-vertical-operator.jpg"
          alt="Forex Drilling crew on site"
          size={300}
          ringOffset={20}
          priority
        />
      </div>

      {/* ── Index number — bottom-left, beside circle ────────────────── */}
      <IndexNumber
        label="EST."
        index="17"
        code="002"
        className="absolute bottom-[50px] left-[70px] z-[5]"
      />
    </section>
  );
}

// ─── Mobile / tablet stack ───────────────────────────────────────────────────
function HeroStack() {
  return (
    <section
      aria-labelledby="hero-title-mobile"
      className="relative mx-auto flex max-w-[640px] flex-col gap-12 px-5 pt-[calc(var(--spacing-nav)+24px)] pb-20 lg:hidden"
    >
      <YellowBadge className="self-start">FOREX</YellowBadge>

      <NavyBlob
        className="-mt-7 ml-3 h-auto w-full max-w-[580px]"
        style={{ padding: "60px 28px 40px 32px" }}
      >
        <p
          id="hero-title-mobile"
          className="font-display font-extrabold uppercase leading-[1.2] text-on-navy"
          style={{ fontSize: "24px", letterSpacing: "0.5px" }}
        >
          Specialist drilling.
        </p>
        <p
          className="font-display font-extrabold uppercase leading-[1.2] text-amber"
          style={{ fontSize: "24px", letterSpacing: "0.5px", marginBottom: "20px" }}
        >
          Asia-Pacific delivery.
        </p>
        <p
          className="font-display font-normal text-on-navy-muted"
          style={{ fontSize: "13px", lineHeight: "1.6" }}
        >
          Forex Drilling delivers safe, reliable, high-quality drilling services
          across mining, exploration, and civil projects. Headquartered in
          Singapore, operating in Papua New Guinea and the wider Asia-Pacific.
        </p>
      </NavyBlob>

      <div className="flex items-center justify-center gap-8">
        <SpeechBubble label="METHODS" value="12" />
        <DotsTrio size={20} />
      </div>

      <div className="flex flex-col items-start gap-2 px-2">
        <p
          className="font-display font-extrabold leading-[1.3]"
          style={{ fontSize: "16px", color: "var(--color-deep-navy)" }}
        >
          Drilling, instrumentation, downhole &amp; data
        </p>
        <p
          className="font-display"
          style={{ fontSize: "14px", color: "var(--color-surface)", opacity: 0.8 }}
        >
          A full spectrum of specialist capabilities in one mobilisation.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <CircleImageRing
          src="/images/rig-vertical-operator.jpg"
          alt="Forex Drilling crew on site"
          size={240}
          ringOffset={16}
          priority
        />
        <IndexNumber label="EST." index="17" code="002" />
      </div>

      {/* Image card — full-width on mobile */}
      <div className="relative mt-4">
        <div className="absolute -top-12 left-12 z-[6] flex gap-4">
          <DrillBitPin size={48} />
          <DrillBitPin size={48} />
        </div>
        <div
          className="relative aspect-[2.3/1] w-full overflow-hidden rounded-xl"
          style={{ boxShadow: "var(--shadow-image)" }}
        >
          <Image
            src="/images/hero-night-site.jpg"
            alt="Multi-rig night drilling operation in Papua New Guinea"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-y-0 right-0 flex w-2/5 flex-col justify-center px-5 py-5"
            style={{ background: "rgba(16, 33, 66, 0.95)" }}
          >
            <p
              className="font-display font-extrabold uppercase leading-[1.4] text-amber"
              style={{ fontSize: "13px", marginBottom: "12px" }}
            >
              Multi-rig site operations
            </p>
            <p
              className="font-display font-normal text-on-navy-muted"
              style={{ fontSize: "10px", lineHeight: "1.5" }}
            >
              Modern, versatile rigs with experienced crews — across mining,
              exploration, and civil projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroPoster />
      <HeroStack />
    </>
  );
}
