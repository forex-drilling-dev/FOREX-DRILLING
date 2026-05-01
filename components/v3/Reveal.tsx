"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Stagger delay in ms */
  delay?: number;
  /** Direction of the reveal */
  from?: "up" | "left" | "right";
  className?: string;
  /** Trigger margin — start animation when element is this far from the viewport */
  rootMargin?: string;
};

/**
 * Lightweight scroll reveal — CSS transition + IntersectionObserver.
 * No GSAP, no Framer Motion. Respects prefers-reduced-motion.
 *
 * Default: fade up 16px over 700ms with cubic ease-out.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
  rootMargin = "-80px",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honor prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  const offsetMap: Record<NonNullable<Props["from"]>, string> = {
    up: "translateY(20px)",
    left: "translateX(-20px)",
    right: "translateX(20px)",
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : offsetMap[from],
        transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
