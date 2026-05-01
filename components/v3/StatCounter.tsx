"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  /** Numeric value to count up to */
  to: number;
  /** Optional suffix (e.g. "%", "+") */
  suffix?: string;
  /** Animation duration in ms */
  duration?: number;
  /** Number of decimal places to show */
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Stat counter — animates a number from 0 → target value when the element
 * scrolls into view. Uses requestAnimationFrame and ease-out cubic.
 *
 * Respects prefers-reduced-motion.
 */
export function StatCounter({
  to,
  suffix = "",
  duration = 1400,
  decimals = 0,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              setValue(to * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(to);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "-60px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
