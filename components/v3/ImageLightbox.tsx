"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  /** Already-optimized src (pass through optimizedSrc upstream). */
  src: string;
  alt: string;
  /** Sizes attribute for the inline thumbnail. */
  sizes: string;
  blurDataURL?: string;
  /** Tailwind aspect class for the thumbnail frame, e.g. "aspect-[4/3]". */
  thumbAspect?: string;
  /** CSS object-position for the cover-cropped thumbnail (default "center"). */
  thumbPosition?: string;
};

/**
 * Clickable image that opens a full-size lightbox — same visual language as
 * the services detail modal (navy blurred backdrop, white rounded frame,
 * scroll lock, Escape / backdrop / X to close).
 */
export function ImageLightbox({ src, alt, sizes, blurDataURL, thumbAspect = "aspect-[4/3]", thumbPosition = "center" }: Props) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Single focusable element (close button) — keep Tab on it.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — view full size`}
        aria-haspopup="dialog"
        className={`group relative ${thumbAspect} w-full cursor-zoom-in overflow-hidden rounded-xl bg-deep shadow-card transition-shadow duration-300 hover:shadow-deep`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: thumbPosition }}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
        {/* Zoom affordance — quiet amber chip, bottom-right */}
        <span
          aria-hidden
          className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber text-deep-navy opacity-90 transition-opacity group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M16.5 16.5 L21 21 M11 8 v6 M8 11 h6" />
          </svg>
        </span>
      </button>

      {/* Portal to <body> — an ancestor (Reveal) carries a CSS transform,
          which would otherwise turn position:fixed into card-relative. */}
      {open && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          style={{ background: "rgba(17, 40, 78, 0.65)", backdropFilter: "blur(3px)" }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            className="relative max-h-[90vh] w-full max-w-[1100px] overflow-hidden rounded-2xl bg-white p-2 md:p-3"
            style={{ boxShadow: "var(--shadow-bubble)" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full bg-white/90 text-deep-navy transition-colors hover:bg-deep"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M3 3 L13 13 M13 3 L3 13" />
              </svg>
            </button>
            <div className="relative max-h-[calc(90vh-24px)] w-full overflow-hidden rounded-xl bg-deep" style={{ aspectRatio: "3 / 2" }}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1100px) 1100px, 100vw"
                className="object-contain"
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
