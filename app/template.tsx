import type { ReactNode } from "react";

/**
 * Remounts on every route navigation (Next.js template semantics) so the
 * incoming page fades in — a quiet 350ms opacity-only entrance, no
 * geometry animation. Replaces the View Transitions approach, whose
 * default element morph read as a "scroll back to top" slide when
 * navigating from a scrolled position. Reduced-motion users get an
 * instant swap via the global media query in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
