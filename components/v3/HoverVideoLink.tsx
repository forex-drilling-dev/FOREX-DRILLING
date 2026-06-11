"use client";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  /** YouTube video id, e.g. "mOPGB88tMgU". */
  videoId: string;
  /** Accessible title for the embedded player. */
  videoTitle: string;
  children: ReactNode;
};

/**
 * Inline phrase with an amber underline that reveals a floating YouTube
 * preview on hover / focus (desktop) or on tap (touch). The iframe is only
 * mounted while the preview is open, so the page never loads YouTube
 * assets until the visitor asks for them.
 *
 * Uses youtube-nocookie.com — keep public/.htaccess frame-src in sync.
 */
export function HoverVideoLink({ videoId, videoTitle, children }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  // Small grace delay so the pointer can travel from the phrase to the
  // preview card without the card vanishing mid-way.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => cancelClose, []);

  return (
    <span
      ref={wrapRef}
      className="relative inline"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${videoTitle} — show video preview`}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        className="inline cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-deep-navy underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-amber-dim)]"
        style={{ font: "inherit", fontWeight: 500 }}
      >
        {children}
      </button>

      {open && (
        <span
          role="dialog"
          aria-label={videoTitle}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute bottom-full left-1/2 z-40 mb-3 block w-[min(560px,90vw)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-white p-1.5"
          style={{ boxShadow: "var(--shadow-bubble)" }}
        >
          <span className="block aspect-video w-full overflow-hidden rounded-lg bg-deep-navy">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
              title={videoTitle}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </span>
        </span>
      )}
    </span>
  );
}
