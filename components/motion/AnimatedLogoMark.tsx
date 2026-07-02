"use client";
import { useEffect, useRef, useState } from "react";

interface AnimatedLogoMarkProps {
  className?: string;
}

const PLAYED_KEY = "fxl-logo-played";

// Brand-asset colors — must stay identical to /public/logo-mark.svg so the
// final animation frame and the static logo are pixel-identical at swap time.
const NAVY = "#11284e";
const GOLD = "#e3aa00";

// Emblem center (the 167.83-unit square starts at 50.16).
const EC = 134.07;
// Kick origin for the triangle burst.
const CX = 120.92;
const CY = 121.9;
// viewBox center — matches logo-mark.svg's "35 35 880 200" box.
const VBX = 475;
const VBY = 135;
const DURATION = 3;

type TriangleId = "droite" | "haut" | "gauche" | "bas";

interface TriangleSpec {
  id: TriangleId;
  kick: number;
  cx: number;
  cy: number;
}

const TRIANGLES: TriangleSpec[] = [
  { id: "droite", kick: 1.18, cx: 203.54, cy: 122 },
  { id: "haut", kick: 1.1, cx: 132.59, cy: 61.82 },
  { id: "gauche", kick: 1.34, cx: 61.58, cy: 110.48 },
  { id: "bas", kick: 1.26, cx: 92.67, cy: 203.69 },
];
// The left triangle is the one that stays navy in the official logo.
const NAVY_TRIANGLE: TriangleId = "gauche";

type Ease = (x: number) => number;

const outBack: Ease = (x) => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};
const inOutCubic: Ease = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const inOutQuint: Ease = (x) =>
  x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
const outQuart: Ease = (x) => 1 - Math.pow(1 - x, 4);
const outQuad: Ease = (x) => 1 - (1 - x) * (1 - x);

function tween(
  from: number,
  to: number,
  t0: number,
  t1: number,
  ease: Ease,
  t: number,
): number {
  const u = Math.min(Math.max((t - t0) / (t1 - t0), 0), 1);
  return from + (to - from) * ease(u);
}

export function AnimatedLogoMark({ className }: AnimatedLogoMarkProps) {
  const [playing, setPlaying] = useState(false);

  const camRef = useRef<SVGGElement>(null);
  const squareRef = useRef<SVGGElement>(null);
  const trisRef = useRef<SVGGElement>(null);
  const barARef = useRef<SVGRectElement>(null);
  const barBRef = useRef<SVGRectElement>(null);
  const forexClipRef = useRef<SVGRectElement>(null);
  const drillingClipRef = useRef<SVGRectElement>(null);
  const forexRef = useRef<SVGGElement>(null);
  const drillingRef = useRef<SVGGElement>(null);
  const triangleRefs = useRef<Record<TriangleId, SVGPolygonElement | null>>({
    droite: null,
    haut: null,
    gauche: null,
    bas: null,
  });

  useEffect(() => {
    if (sessionStorage.getItem(PLAYED_KEY)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Deferred one frame — keeps the setState out of the effect body
    // (react-hooks/set-state-in-effect) without a visible delay.
    const raf = requestAnimationFrame(() => setPlaying(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const cam = camRef.current;
    const square = squareRef.current;
    const tris = trisRef.current;
    const barA = barARef.current;
    const barB = barBRef.current;
    const forexClip = forexClipRef.current;
    const drillingClip = drillingClipRef.current;
    const forex = forexRef.current;
    const drilling = drillingRef.current;
    if (
      !cam ||
      !square ||
      !tris ||
      !barA ||
      !barB ||
      !forexClip ||
      !drillingClip ||
      !forex ||
      !drilling
    ) {
      return;
    }

    const frame = (t: number) => {
      // Camera: hold a 1.9× zoom on the emblem, then pull back to the full
      // logo. At t ≥ 2.3 the transform is identity, matching the static SVG.
      const k = tween(1.9, 1, 1.6, 2.3, inOutQuint, t);
      const qx = tween(VBX, EC, 1.6, 2.3, inOutQuint, t);
      const qy = tween(VBY, EC, 1.6, 2.3, inOutQuint, t);
      let sh = 0;
      for (const impact of [0.72, 1.02]) {
        if (t > impact && t < impact + 0.25) {
          const p = (t - impact) / 0.25;
          sh += Math.sin(p * Math.PI * 4) * (1 - p) * 3.5;
        }
      }
      cam.setAttribute(
        "transform",
        `translate(${qx - k * EC + sh},${qy - k * EC + sh * 0.6}) scale(${k})`,
      );
      const cut = t >= 1.06;
      square.style.display = cut ? "none" : "";
      tris.style.display = cut ? "" : "none";
      if (!cut) {
        const pop = tween(0, 1, 0.05, 0.42, outBack, t);
        square.setAttribute(
          "transform",
          `translate(${EC},${EC}) scale(${pop}) translate(${-EC},${-EC})`,
        );
        barA.setAttribute("width", String(tween(0, 330, 0.5, 0.72, inOutCubic, t)));
        barB.setAttribute("width", String(tween(0, 310, 0.8, 1.02, inOutCubic, t)));
      } else {
        for (const spec of TRIANGLES) {
          const el = triangleRefs.current[spec.id];
          if (!el) continue;
          const dx = spec.cx - CX;
          const dy = spec.cy - CY;
          const len = Math.hypot(dx, dy);
          const u = Math.min(Math.max((t - spec.kick) / 0.35, 0), 1);
          const mag = Math.sin(outQuad(u) * Math.PI) * 7;
          el.setAttribute(
            "transform",
            `translate(${(dx / len) * mag},${(dy / len) * mag})`,
          );
          el.setAttribute(
            "fill",
            spec.id === NAVY_TRIANGLE ? NAVY : t >= spec.kick ? GOLD : NAVY,
          );
        }
      }
      forexClip.setAttribute("width", String(tween(0, 500, 1.9, 2.35, outQuart, t)));
      forex.setAttribute(
        "transform",
        `translate(${tween(-22, 0, 1.9, 2.35, outQuart, t)},0)`,
      );
      drillingClip.setAttribute(
        "width",
        String(tween(0, 680, 2.15, 2.6, outQuart, t)),
      );
      drilling.setAttribute(
        "transform",
        `translate(${tween(-22, 0, 2.15, 2.6, outQuart, t)},0)`,
      );
    };

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const t = Math.min((now - start) / 1000, DURATION);
      frame(t);
      if (t < DURATION) {
        raf = requestAnimationFrame(loop);
      } else {
        sessionStorage.setItem(PLAYED_KEY, "1");
        setPlaying(false);
      }
    };
    frame(0);
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  if (!playing) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logo-mark.svg"
        alt="Forex Drilling"
        width={880}
        height={200}
        decoding="async"
        className={className}
      />
    );
  }

  // All animated attributes below are pre-set to their t=0 values so the SVG
  // paints blank (zoomed camera, collapsed square, empty clips) even before
  // the first requestAnimationFrame tick.
  return (
    <svg
      viewBox="35 35 880 200"
      width={880}
      height={200}
      role="img"
      aria-label="Forex Drilling"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <mask id="fxl-cut" maskUnits="userSpaceOnUse" x="0" y="0" width="970" height="332">
          <rect x="0" y="0" width="970" height="332" fill="#fff" />
          <rect
            ref={barARef}
            x="-40"
            y="-17.74"
            width="0"
            height="35.48"
            fill="#000"
            transform="translate(50.16,51.14) rotate(45)"
          />
          <rect
            ref={barBRef}
            x="-40"
            y="-17.74"
            width="0"
            height="35.48"
            fill="#000"
            transform="translate(50.16,192.69) rotate(-45)"
          />
        </mask>
        <clipPath id="fxl-cf">
          <rect ref={forexClipRef} x="266" y="44" width="0" height="86" />
        </clipPath>
        <clipPath id="fxl-cd">
          <rect ref={drillingClipRef} x="266" y="140" width="0" height="86" />
        </clipPath>
      </defs>
      <g
        ref={camRef}
        transform={`translate(${VBX - 1.9 * EC},${VBY - 1.9 * EC}) scale(1.9)`}
      >
        <g
          ref={squareRef}
          transform={`translate(${EC},${EC}) scale(0) translate(${-EC},${-EC})`}
        >
          <rect
            x="50.16"
            y="50.16"
            width="167.83"
            height="167.83"
            fill={NAVY}
            mask="url(#fxl-cut)"
          />
        </g>
        <g ref={trisRef} style={{ display: "none" }}>
          <polygon
            ref={(el) => {
              triangleRefs.current.droite = el;
            }}
            points="217.99 193.88 217.99 50.16 217.74 50.16 146.01 121.9 217.99 193.88"
            fill={NAVY}
          />
          <polygon
            ref={(el) => {
              triangleRefs.current.haut = el;
            }}
            points="167.58 50.16 74.27 50.16 120.92 96.82 167.58 50.16"
            fill={NAVY}
          />
          <polygon
            ref={(el) => {
              triangleRefs.current.gauche = el;
            }}
            points="50.16 76.22 50.16 167.58 95.84 121.9 50.16 76.22"
            fill={NAVY}
          />
          <polygon
            ref={(el) => {
              triangleRefs.current.bas = el;
            }}
            points="50.16 217.74 50.16 217.99 191.93 217.99 120.92 146.98 50.16 217.74"
            fill={NAVY}
          />
        </g>
        <g
          ref={forexRef}
          clipPath="url(#fxl-cf)"
          fill={NAVY}
          transform="translate(-22,0)"
        >
          <path d="M268.18,121.98v-61.94l-1.22-9.75h78.52v16.58h-53.53v11.09h40.36v16.95h-40.36v27.07h-23.78Z" />
          <path d="M381.2,121.98c-8.62,0-14.9-1.93-18.84-5.79-3.94-3.86-5.91-10.02-5.91-18.47v-23.29c0-8.29,1.95-14.39,5.85-18.29,3.9-3.9,10.2-5.85,18.9-5.85h35.6c8.53,0,14.77,1.95,18.72,5.85,3.94,3.9,5.91,10,5.91,18.29v23.29c0,8.45-1.99,14.61-5.97,18.47-3.98,3.86-10.2,5.79-18.65,5.79h-35.6ZM389.62,105.4h18.9c6.34,0,9.51-2.88,9.51-8.66v-21.34c0-5.69-3.17-8.53-9.51-8.53h-18.9c-3.25,0-5.69.65-7.32,1.95-1.63,1.3-2.44,3.5-2.44,6.58v21.34c0,3.01.81,5.2,2.44,6.58,1.62,1.38,4.06,2.07,7.32,2.07Z" />
          <path d="M538.85,123.2c-3.25,0-6.87-.51-10.85-1.52-3.98-1.02-7.93-3.52-11.83-7.5l-5.12-5.12c-2.44-2.44-4.78-4.43-7.01-5.97-2.24-1.54-4.78-2.7-7.62-3.47-2.85-.77-6.42-1.16-10.73-1.16h-.98v23.53h-23.78v-61.94l-1.22-9.88h56.45c5.2,0,9.41.63,12.62,1.89,3.21,1.26,5.69,2.93,7.44,5,1.75,2.07,2.95,4.41,3.6,7.01.65,2.6.98,5.24.98,7.93v2.32c0,4.88-1.24,9.25-3.72,13.11-2.48,3.86-6.4,6.61-11.77,8.23,2.03,1.22,3.96,2.46,5.79,3.72,1.83,1.26,3.92,2.58,6.28,3.96,2.68,1.55,5.18,2.66,7.5,3.35,2.32.69,4.25,1.12,5.79,1.28,1.54.16,2.44.24,2.68.24l-3.66,13.78c-.98.24-2.46.51-4.45.79-1.99.28-4.13.43-6.4.43ZM498.86,82.23c2.03,0,4-.04,5.91-.12,1.91-.08,3.64-.2,5.18-.37,2.76-.32,4.65-1.2,5.67-2.62,1.02-1.42,1.52-3.15,1.52-5.18v-1.34c0-1.79-.51-3.17-1.52-4.15-1.02-.98-2.87-1.46-5.55-1.46h-25.36v14.75c2.03.08,4.27.18,6.71.3,2.44.12,4.92.18,7.44.18Z" />
          <path d="M564.34,121.98V50.29h78.28v16.58h-54.5v10.12h40.36v16.95h-40.36v11.34h52.55l7.32,15.36c0,.33-1.1.63-3.29.91-2.19.29-5.97.43-11.34.43h-69.01Z" />
          <path d="M650.42,121.98l4.63-7.32,25.85-28.53-30.48-35.85h30.6l15,22.07h1.34l15-22.07h30.6l-4.76,7.19-25.73,28.65,30.48,35.85h-30.6l-15-22.19h-1.34l-15,22.19h-30.6Z" />
        </g>
        <g
          ref={drillingRef}
          clipPath="url(#fxl-cd)"
          fill={NAVY}
          transform="translate(-22,0)"
        >
          <path d="M268.18,217.96v-61.94l-1.22-9.75h56.58c9.83,0,17.21,1.95,22.13,5.85,4.92,3.9,7.38,10,7.38,18.29v23.29c0,8.45-2.44,14.61-7.32,18.47-4.88,3.86-12.27,5.79-22.19,5.79h-55.36ZM291.96,201.13h27.92c6.26,0,9.43-2.88,9.51-8.66v-21.09c0-2.36-.69-4.37-2.07-6.04-1.38-1.67-3.86-2.5-7.44-2.5h-27.92v38.29Z" />
          <path d="M449.24,219.18c-3.25,0-6.87-.51-10.85-1.52-3.98-1.02-7.92-3.52-11.83-7.5l-5.12-5.12c-2.44-2.44-4.78-4.43-7.01-5.97-2.24-1.54-4.78-2.7-7.62-3.47-2.85-.77-6.42-1.16-10.73-1.16h-.98v23.53h-23.78v-61.94l-1.22-9.88h56.45c5.2,0,9.41.63,12.62,1.89,3.21,1.26,5.69,2.93,7.44,5,1.75,2.07,2.95,4.41,3.6,7.01.65,2.6.97,5.24.97,7.93v2.32c0,4.88-1.24,9.25-3.72,13.11-2.48,3.86-6.4,6.61-11.77,8.23,2.03,1.22,3.96,2.46,5.79,3.72,1.83,1.26,3.92,2.58,6.28,3.96,2.68,1.55,5.18,2.66,7.5,3.35,2.32.69,4.25,1.12,5.79,1.28,1.54.16,2.44.24,2.68.24l-3.66,13.78c-.98.24-2.46.51-4.45.79-1.99.28-4.13.43-6.4.43ZM409.25,178.21c2.03,0,4-.04,5.91-.12,1.91-.08,3.64-.2,5.18-.37,2.76-.32,4.65-1.2,5.67-2.62,1.02-1.42,1.52-3.15,1.52-5.18v-1.34c0-1.79-.51-3.17-1.52-4.15-1.02-.98-2.87-1.46-5.55-1.46h-25.36v14.75c2.03.08,4.27.18,6.71.3,2.44.12,4.92.18,7.44.18Z" />
          <path d="M474.72,217.96v-71.69h23.41v71.69h-23.41Z" />
          <path d="M517.64,217.96l1.22-9.75v-61.94h23.41v54.99h43.16l7.32,15.36c0,.33-1.1.63-3.29.91-2.19.29-5.97.43-11.34.43h-60.48Z" />
          <path d="M602.5,217.96l1.22-9.75v-61.94h23.41v54.99h43.16l7.32,15.36c0,.33-1.1.63-3.29.91-2.19.29-5.97.43-11.34.43h-60.48Z" />
          <path d="M687.36,217.96v-71.69h23.41v71.69h-23.41Z" />
          <path d="M731.5,217.96v-61.94l-1.22-9.75h22.43l34.38,34.87,4.76,5.36h1.34v-40.24h23.41v71.69h-20.36l-35.36-35.24-4.75-5.73h-1.22v40.97h-23.41Z" />
          <path d="M859.65,217.96c-8.7,0-15-1.91-18.9-5.73-3.9-3.82-5.85-10-5.85-18.53v-22.31c0-8.78,2.15-15.18,6.46-19.2,4.31-4.02,10.4-6.04,18.29-6.04h40.72c5.61,0,9.89.31,12.86.91,2.97.61,4.45,1.24,4.45,1.89l-3.78,15.24c-2.03-.24-6-.51-11.89-.79-5.89-.28-13.31-.43-22.25-.43h-11.34c-3.82,0-6.4.71-7.74,2.13-1.34,1.42-2.01,3.6-2.01,6.52v20.85c0,2.76.59,4.9,1.77,6.4,1.18,1.5,3.84,2.26,7.99,2.26h9.88c3.74,0,7.11-.02,10.12-.06,3-.04,5.65-.1,7.92-.18v-9.27l-4.88.12-15.97,1.22v-16.83h44.14v36.7l1.22,2.56c0,.65-1.71,1.24-5.12,1.77-3.41.53-9.19.79-17.31.79h-38.77Z" />
        </g>
      </g>
    </svg>
  );
}
