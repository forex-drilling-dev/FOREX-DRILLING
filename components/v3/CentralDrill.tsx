"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useScroll, useReducedMotion } from "framer-motion";

// WebGL is client-only — load it with ssr:false from inside this client file
// (per the project's WebGL pattern). Keeps it out of the static-export HTML.
const AugerCanvas = dynamic(() => import("@/components/three/AugerCanvas"), {
  ssr: false,
});

/**
 * Central 3-D auger ("tarière") running down the middle of the About body.
 * A real metallic auger (Three.js) pinned to the viewport that turns as the
 * page scrolls — its flights travel like a bit boring deeper.
 *
 * - Decorative: aria-hidden, pointer-events-none, behind content (z-0).
 * - Desktop only (lg+); the body stacks and hides it on mobile.
 * - Static under prefers-reduced-motion.
 *
 * Must be the first child of a `position: relative` wrapper spanning the body
 * sections, with content given a higher z-index.
 */
export function CentralDrill() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Only create the WebGL context on desktop — never on mobile, where the
  // spine is hidden and the GPU/battery cost would be wasted.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden -translate-x-1/2 lg:block"
      style={{ width: "clamp(150px, 14vw, 230px)" }}
    >
      <div className="sticky top-0 h-screen w-full">
        {desktop && <AugerCanvas progress={scrollYProgress} reduce={reduce} />}
      </div>
    </div>
  );
}
