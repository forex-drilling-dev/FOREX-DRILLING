"use client";

import { useEffect } from "react";

/**
 * Adds a scroll-snap class to <html> while the homepage is mounted, so
 * scrolling between the hero and the tagline strip locks onto each
 * section like a notch ("cran"). Removed on unmount, so the snap behavior
 * is scoped to "/" and never bleeds into inner pages.
 *
 * Honors prefers-reduced-motion: the class is not applied if the user has
 * requested reduced motion, so they get plain native scrolling.
 */
export function HomeScrollSnap() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const html = document.documentElement;
    const previous = html.style.scrollSnapType;
    html.classList.add("home-scroll-snap");
    html.style.scrollSnapType = "y proximity";
    return () => {
      html.classList.remove("home-scroll-snap");
      html.style.scrollSnapType = previous;
    };
  }, []);
  return null;
}
