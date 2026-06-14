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
 * Central auger ("tarière") running down the middle of the About body — a
 * continuous navy core rod with helical ocre flights that protrude on both
 * sides. The flights travel downward as the page scrolls, reading as the
 * auger turning and boring deeper; scrolling up reverses it.
 *
 * - Decorative: aria-hidden, pointer-events-none, sits behind content (z-0).
 * - Desktop only (lg+); the body stacks and hides it on mobile.
 * - Only `transform` animates (the flight layer translates) — GPU, no layout
 *   shift. Static under prefers-reduced-motion.
 *
 * Must be the first child of a `position: relative` wrapper spanning the body
 * sections, with content given a higher z-index.
 */
export function CentralDrill() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Flight pitch is 46px; travel a whole number of pitches so the helix stays
  // seamless across the full scroll range.
  const travel = useTransform(scrollYProgress, [0, 1], [0, 46 * 22]);
  const flightY = useSpring(travel, { stiffness: 80, damping: 26, mass: 0.4 });

  // Pointed drill tip at the very bottom.
  const tip = "polygon(0 0, 100% 0, 100% 97.5%, 50% 100%, 0 97.5%)";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden -translate-x-1/2 overflow-hidden lg:block"
      style={{ width: "clamp(96px, 11vw, 160px)", clipPath: tip }}
    >
      {/* Continuous core rod (navy, turned-metal shading), centred. */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-t-full"
        style={{
          width: "34%",
          background:
            "linear-gradient(90deg, var(--color-deep-navy), var(--color-surface) 50%, var(--color-deep-navy))",
        }}
      >
        <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-on-navy/20" />
      </div>

      {/* Helical flights — diagonal ocre blades that protrude past the rod and
          travel downward on scroll. */}
      <motion.div
        className="absolute inset-x-0 -inset-y-48"
        style={reduce ? undefined : { y: flightY }}
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(158deg, var(--color-amber) 0 17px, var(--color-amber-dim) 17px 22px, transparent 22px 46px)",
          }}
        />
      </motion.div>
    </div>
  );
}
