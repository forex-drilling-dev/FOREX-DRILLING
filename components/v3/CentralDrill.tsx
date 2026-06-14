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
 * Central "drill spine" — a large vertical auger running down the middle of
 * the About body. Its helical flutes translate downward as the page scrolls,
 * reading as a bit drilling deeper; scrolling up reverses it.
 *
 * - Decorative: aria-hidden, pointer-events-none, sits behind content (z-0).
 * - Desktop only (lg+); on mobile the body stacks and the spine is hidden.
 * - Only `transform` animates (the flute layer translates) — GPU, no layout
 *   shift. Static under prefers-reduced-motion.
 *
 * Must be rendered as the first child of a `position: relative` wrapper that
 * spans the body sections, with the content given a higher z-index.
 */
export function CentralDrill() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Flute period is 34px; travel a whole number of periods so the diagonal
  // banding stays seamless across the full scroll range.
  const travel = useTransform(scrollYProgress, [0, 1], [0, 34 * 22]);
  const fluteY = useSpring(travel, { stiffness: 80, damping: 26, mass: 0.4 });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden -translate-x-1/2 lg:block"
      style={{ width: "clamp(64px, 8vw, 120px)" }}
    >
      {/* Cylindrical shaft, tapering to a drill point at the very bottom. */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, var(--color-deep-navy), var(--color-surface) 50%, var(--color-deep-navy))",
          clipPath: "polygon(0 0, 100% 0, 100% 97.5%, 50% 100%, 0 97.5%)",
          borderRadius: "999px 999px 0 0",
        }}
      >
        {/* Helical flutes — diagonal ocre bands that drill downward on scroll. */}
        <motion.div
          className="absolute -inset-y-48 inset-x-0"
          style={reduce ? undefined : { y: fluteY }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, var(--color-amber) 0 12px, transparent 12px 34px)",
              opacity: 0.85,
            }}
          />
        </motion.div>
        {/* Soft cylinder highlight down the centre for a turned-metal feel. */}
        <span className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-on-navy/20" />
      </div>
    </div>
  );
}
