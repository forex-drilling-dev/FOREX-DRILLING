"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Central auger ("tarière") down the middle of the About body — a shaded
 * metallic core rod with helical ocre flights that protrude on both sides.
 * The flights travel downward as the page scrolls, reading as the auger
 * turning and boring deeper; scrolling up reverses it.
 *
 * The auger is an illustrated, seamlessly-tiling SVG (gradients give the
 * metal a 3-D twist) repeated vertically and translated on scroll. Brand
 * colours are baked into the asset, like any illustration.
 *
 * - Decorative: aria-hidden, pointer-events-none, behind content (z-0).
 * - Desktop only (lg+); the body stacks and hides it on mobile.
 * - Only `transform` animates — GPU, no layout shift. Static under
 *   prefers-reduced-motion.
 */

// One seamless pitch of the auger: a tilted, gradient-shaded flighting disc.
// Repeated and overlapped, the discs read as a continuous metal screw whose
// outer edge is scalloped — a recognisable auger, not a striped ribbon.
const PITCH = 18;
const TILE = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='${PITCH}' viewBox='0 0 200 ${PITCH}'>
  <defs>
    <linearGradient id='rod' x1='0' y1='0' x2='1' y2='0'>
      <stop offset='0' stop-color='#0c1f42'/>
      <stop offset='0.5' stop-color='#21407a'/>
      <stop offset='1' stop-color='#0c1f42'/>
    </linearGradient>
    <linearGradient id='flight' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#fbd877'/>
      <stop offset='0.4' stop-color='#e3aa00'/>
      <stop offset='1' stop-color='#7d5805'/>
    </linearGradient>
  </defs>
  <rect x='86' width='28' height='${PITCH}' fill='url(#rod)'/>
  <g transform='rotate(-7 100 9)'>
    <ellipse cx='100' cy='13' rx='92' ry='10' fill='#000' opacity='0.15'/>
    <ellipse cx='100' cy='9' rx='92' ry='11' fill='url(#flight)'/>
  </g>
</svg>`;
const AUGER_URL = `url("data:image/svg+xml,${encodeURIComponent(TILE)}")`;

export function CentralDrill() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Travel a whole number of pitches so the helix stays seamless.
  const travel = useTransform(scrollYProgress, [0, 1], [0, PITCH * 22]);
  const flightY = useSpring(travel, { stiffness: 80, damping: 26, mass: 0.4 });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden -translate-x-1/2 overflow-hidden lg:block"
      style={{
        width: "clamp(76px, 8vw, 124px)",
        clipPath: "polygon(0 0, 100% 0, 100% 98.5%, 50% 100%, 0 98.5%)",
      }}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-48"
        style={{
          backgroundImage: AUGER_URL,
          backgroundRepeat: "repeat-y",
          backgroundSize: `100% ${PITCH}px`,
          backgroundPosition: "center top",
          ...(reduce ? {} : { y: flightY }),
        }}
      />
    </div>
  );
}
