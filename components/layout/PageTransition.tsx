import type { ReactNode } from "react";
import { ViewTransition } from "react";

/**
 * Wraps page content so route navigations animate through the browser's
 * View Transitions API. The actual motion design lives in globals.css
 * (::view-transition-* rules: soft cross-fade + 8px rise, nav pinned).
 * Browsers without support simply navigate without animating.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}
