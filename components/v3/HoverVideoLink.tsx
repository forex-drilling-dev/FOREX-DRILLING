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
 * Accessibility: opening via keyboard or click moves focus to the popup's
 * close button (mouse-hover opens do NOT steal focus), Escape and the
 * close button dismiss it, and focus is restored to the trigger on close.
 *
 * Uses youtube-nocookie.com — keep public/.htaccess frame-src in sync.
 */
export function HoverVideoLink({ videoId, videoTitle, children }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  // Whether the current open was deliberate (click/keyboard) and should
  // therefore move focus into the popup. Hover opens leave focus alone.
  const focusInRef = useRef(false);
  // Set while we programmatically restore focus to the trigger on close, so
  // the trigger's onFocus handler doesn't immediately re-open the popup.
  const suppressFocusOpen = useRef(false);

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
  const close = (restoreFocus: boolean) => {
    cancelClose();
    setOpen(false);
    if (restoreFocus) {
      // Guard against the trigger's onFocus re-opening the popup.
      suppressFocusOpen.current = true;
      triggerRef.current?.focus();
      window.setTimeout(() => {
        suppressFocusOpen.current = false;
      }, 0);
    }
  };

  useEffect(() => {
    if (!open) return;
    // Deliberate open → move focus to the close button so keyboard and
    // screen-reader users land inside the dialog.
    if (focusInRef.current) closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
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
        focusInRef.current = false;
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`${videoTitle} — show video preview`}
        onClick={() => {
          focusInRef.current = true;
          setOpen((v) => !v);
        }}
        onFocus={() => {
          if (suppressFocusOpen.current) return;
          focusInRef.current = true;
          setOpen(true);
        }}
        className="inline cursor-pointer border-0 bg-transparent p-0 text-left font-medium text-deep-navy underline decoration-amber decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-amber-dim)]"
        style={{ font: "inherit", fontWeight: 500 }}
      >
        {children}
      </button>

      {open && (
        <span
          role="dialog"
          aria-modal="true"
          aria-label={videoTitle}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute bottom-full left-1/2 z-40 mb-3 block w-[min(560px,90vw)] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-white p-1.5"
          style={{ boxShadow: "var(--shadow-bubble)" }}
        >
          <span className="mb-1.5 flex items-center justify-between gap-2 px-1.5 pt-1">
            <span
              className="font-mono uppercase text-[var(--color-amber-dim)]"
              style={{ fontSize: "10px", letterSpacing: "0.18em" }}
            >
              {videoTitle}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={() => close(true)}
              aria-label="Close video preview"
              className="-m-1 inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-deep-navy transition-colors hover:bg-deep"
            >
              <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M3 3 L13 13 M13 3 L3 13" />
              </svg>
            </button>
          </span>
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
