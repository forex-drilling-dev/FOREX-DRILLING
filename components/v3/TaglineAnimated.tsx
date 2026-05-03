"use client";

import { motion, useInView, type Transition } from "framer-motion";
import { useRef } from "react";

/**
 * Editorial "Built on Drilling. Driven by Delivery." tagline with a
 * scroll-triggered, word-by-word mask reveal.
 *
 * Each word sits inside an overflow-hidden span with the inner text
 * translated 110% down. When the section enters the viewport, the words
 * slide up to their resting position one after another. The amber
 * second-line lags behind the navy first line so the brand colour lands
 * as a deliberate beat. After all words have settled, a thin amber rule
 * draws underneath the second line as the final accent.
 *
 * The animation replays every time the section re-enters the viewport
 * so the editorial moment lands fresh on each scroll-back.
 */

const FIRST_LINE = ["Built", "on", "Drilling."];
const SECOND_LINE = ["Driven", "by", "Delivery."];

const wordVariants = {
  hidden: { y: "110%" },
  visible: { y: "0%" },
};

const wordTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

const ruleVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

const ruleTransition: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  delay: 0.85,
};

export function TaglineAnimated() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });

  return (
    <div
      ref={ref}
      className="text-center font-display font-extrabold uppercase leading-[1] text-balance text-deep-navy"
      style={{ fontSize: "clamp(40px, 8vw, 88px)", letterSpacing: "-0.01em" }}
    >
      <Line words={FIRST_LINE} inView={inView} startDelay={0} />
      <div className="relative inline-block">
        <Line
          words={SECOND_LINE}
          inView={inView}
          startDelay={FIRST_LINE.length * 0.1}
          accent
        />
        <motion.span
          aria-hidden
          className="absolute -bottom-3 left-0 right-0 block h-[3px] origin-left bg-amber"
          variants={ruleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={ruleTransition}
        />
      </div>
    </div>
  );
}

type LineProps = {
  words: string[];
  inView: boolean;
  startDelay: number;
  accent?: boolean;
};

function Line({ words, inView, startDelay, accent = false }: LineProps) {
  return (
    <span className={`block ${accent ? "text-amber" : ""}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // pb compensates for descenders (the dot in "Drilling.") so the
          // mask doesn't clip them when y=110% becomes y=0%.
          className="relative mr-[0.18em] inline-block overflow-hidden pb-[0.08em] align-baseline last:mr-0"
        >
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{
              ...wordTransition,
              delay: startDelay + i * 0.1,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
