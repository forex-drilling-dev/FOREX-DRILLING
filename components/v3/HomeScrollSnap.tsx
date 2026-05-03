"use client";

import { useEffect } from "react";

/**
 * Section-snap scrolling on the homepage. Any wheel / keyboard / touch
 * intent that moves the page forward from the hero animates a smooth
 * scroll to the tagline section ("Built on Drilling. Driven by Delivery.")
 * and vice versa, like a notch ("cran"). After the tagline, normal scroll
 * resumes so the user can reach the CTA and footer.
 *
 * Honors prefers-reduced-motion: when set, the listener is not installed
 * and native scrolling stays as-is.
 *
 * Scoped to "/" via this client component — the listener is added on
 * mount and removed when the user navigates away.
 */

const ANIM_DURATION = 700; // ms — feel of the "click into place"

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateScrollTo(targetY: number, duration: number, onDone: () => void) {
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) {
    onDone();
    return () => {};
  }
  const startTime = performance.now();
  let cancelled = false;
  function frame(now: number) {
    if (cancelled) return;
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + delta * easeInOutCubic(t));
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      onDone();
    }
  }
  requestAnimationFrame(frame);
  return () => {
    cancelled = true;
  };
}

export function HomeScrollSnap() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isAnimating = false;
    let cancelAnim: (() => void) | null = null;

    function getSnapTargets(): number[] {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(".home-snap"),
      ).filter((el) => el.offsetParent !== null);
      return sections.map((s) => s.getBoundingClientRect().top + window.scrollY);
    }

    function snapTo(y: number) {
      if (isAnimating) cancelAnim?.();
      isAnimating = true;
      cancelAnim = animateScrollTo(y, ANIM_DURATION, () => {
        // Allow a short cool-down so trackpad inertia doesn't immediately
        // re-trigger another snap.
        setTimeout(() => {
          isAnimating = false;
        }, 120);
      });
    }

    function handleWheel(e: WheelEvent) {
      if (isAnimating) {
        e.preventDefault();
        return;
      }
      const targets = getSnapTargets();
      if (targets.length < 2) return;

      const currentY = window.scrollY;
      const direction = e.deltaY > 0 ? 1 : -1;

      // Find the snap target the page is currently aligned with (within 4px).
      const alignedIndex = targets.findIndex((t) => Math.abs(t - currentY) < 4);
      if (alignedIndex === -1) return;

      const nextIndex = alignedIndex + direction;
      // Scrolling DOWN past the last snap target → let the page scroll
      // naturally so the CTA + footer are reachable.
      if (direction === 1 && nextIndex >= targets.length) return;
      // Scrolling UP from the first snap target → already at top, no-op.
      if (direction === -1 && nextIndex < 0) return;

      e.preventDefault();
      const target = targets[nextIndex];
      if (target === undefined) return;
      snapTo(target);
    }

    function handleKey(e: KeyboardEvent) {
      if (isAnimating) return;
      const isDown = e.key === "PageDown" || e.key === "ArrowDown" || e.key === " ";
      const isUp = e.key === "PageUp" || e.key === "ArrowUp";
      if (!isDown && !isUp) return;

      const targets = getSnapTargets();
      if (targets.length < 2) return;

      const currentY = window.scrollY;
      const alignedIndex = targets.findIndex((t) => Math.abs(t - currentY) < 4);
      if (alignedIndex === -1) return;

      const nextIndex = alignedIndex + (isDown ? 1 : -1);
      if (isDown && nextIndex >= targets.length) return;
      if (isUp && nextIndex < 0) return;

      e.preventDefault();
      const target = targets[nextIndex];
      if (target === undefined) return;
      snapTo(target);
    }

    let touchStartY: number | null = null;
    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0]?.clientY ?? null;
    }
    function handleTouchEnd(e: TouchEvent) {
      if (touchStartY === null || isAnimating) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      touchStartY = null;
      if (Math.abs(delta) < 30) return; // ignore taps / micro-swipes

      const targets = getSnapTargets();
      if (targets.length < 2) return;
      const currentY = window.scrollY;
      const alignedIndex = targets.findIndex((t) => Math.abs(t - currentY) < 4);
      if (alignedIndex === -1) return;

      const direction = delta > 0 ? 1 : -1;
      const nextIndex = alignedIndex + direction;
      if (direction === 1 && nextIndex >= targets.length) return;
      if (direction === -1 && nextIndex < 0) return;
      const target = targets[nextIndex];
      if (target === undefined) return;
      snapTo(target);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnim?.();
    };
  }, []);

  return null;
}
