"use client";

import { useEffect } from "react";

/**
 * Section-snap scrolling on the homepage. The wheel / keyboard / touch
 * input that crosses a `.home-snap` boundary animates a smooth scroll to
 * the next section ("cran"). After the last snap section the listener
 * stays out of the way so the CTA + footer scroll naturally.
 *
 * Honors prefers-reduced-motion: when set, the listener is not installed.
 *
 * Trackpad inertia handling: while a snap is animating AND for an
 * extended cooldown after it lands, every wheel event is preventDefaulted
 * regardless of direction. This prevents flick-scrolling momentum from
 * leaking past the snapped section and revealing the next one (the
 * yellow CTA banner sliver users were seeing).
 */

const ANIM_DURATION = 700;
// Wheel events from a single trackpad gesture keep arriving for up to
// ~600ms after the fingers lift. Block the entire window so we never
// surface a partial scroll into the next section.
const INERTIA_GUARD = 650;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function HomeScrollSnap() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Touch devices (phones, tablets) already have native momentum scroll and
    // their own scroll-snap behaviour. Intercepting wheel/touch on them feels
    // sluggish and fights the user — disable the custom snap there. Desktop
    // visitors with a real pointing device keep the editorial section snap.
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    let lockedUntil = 0; // performance.now() timestamp; wheel/touch ignored until then
    let animFrame = 0;

    function getTargets(): number[] {
      const sections = document.querySelectorAll<HTMLElement>(".home-snap");
      const targets: number[] = [];
      for (const s of sections) {
        if (s.offsetParent === null) continue;
        targets.push(Math.round(s.getBoundingClientRect().top + window.scrollY));
      }
      return targets;
    }

    function snapTo(targetY: number) {
      cancelAnimationFrame(animFrame);
      const startY = window.scrollY;
      const delta = targetY - startY;
      const startTime = performance.now();
      lockedUntil = startTime + ANIM_DURATION + INERTIA_GUARD;

      if (Math.abs(delta) < 1) return;

      const step = (now: number) => {
        const t = Math.min(1, (now - startTime) / ANIM_DURATION);
        window.scrollTo(0, startY + delta * easeInOutCubic(t));
        if (t < 1) animFrame = requestAnimationFrame(step);
      };
      animFrame = requestAnimationFrame(step);
    }

    /** Pick the next snap target for a directional scroll, or null if none applies. */
    function nextSnapY(direction: 1 | -1): number | null {
      const targets = getTargets();
      if (targets.length < 2) return null;
      const currentY = window.scrollY;
      const aligned = targets.findIndex((t) => Math.abs(t - currentY) < 4);
      if (aligned === -1) return null;
      const next = aligned + direction;
      if (next < 0 || next >= targets.length) return null;
      return targets[next] ?? null;
    }

    function handleWheel(e: WheelEvent) {
      if (performance.now() < lockedUntil) {
        e.preventDefault();
        return;
      }
      if (e.deltaY === 0) return;
      const target = nextSnapY(e.deltaY > 0 ? 1 : -1);
      if (target === null) return;
      e.preventDefault();
      snapTo(target);
    }

    function handleKey(e: KeyboardEvent) {
      if (performance.now() < lockedUntil) return;
      const isDown = e.key === "PageDown" || e.key === "ArrowDown" || e.key === " ";
      const isUp = e.key === "PageUp" || e.key === "ArrowUp";
      if (!isDown && !isUp) return;
      const target = nextSnapY(isDown ? 1 : -1);
      if (target === null) return;
      e.preventDefault();
      snapTo(target);
    }

    let touchStartY: number | null = null;
    function handleTouchStart(e: TouchEvent) {
      if (performance.now() < lockedUntil) return;
      touchStartY = e.touches[0]?.clientY ?? null;
    }
    function handleTouchEnd(e: TouchEvent) {
      if (touchStartY === null || performance.now() < lockedUntil) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      touchStartY = null;
      if (Math.abs(delta) < 30) return; // ignore taps / micro-swipes
      const target = nextSnapY(delta > 0 ? 1 : -1);
      if (target === null) return;
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
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return null;
}
