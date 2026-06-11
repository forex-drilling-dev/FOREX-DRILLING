"use client";
import { useEffect, useRef, useState } from "react";
import { getService, type Service } from "@/content/services";
import { DrillBitPin } from "./DrillBitPin";

export type ServiceItem = { label: string; slug?: string };

type Props = {
  items: ServiceItem[];
};

/**
 * Service bullet list where each item with a detail page opens an in-page
 * modal showing a short explanatory text (no navigation round-trip).
 */
export function ServiceItemsList({ items }: Props) {
  const [active, setActive] = useState<Service | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = (slug: string, trigger: HTMLElement) => {
    const service = getService(slug);
    if (!service) return;
    triggerRef.current = trigger;
    setActive(service);
  };
  const close = () => {
    setActive(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  };

  return (
    <>
      <ul className="grid gap-x-12 gap-y-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item.label} className="border-t border-border">
            {item.slug ? (
              <button
                type="button"
                onClick={(e) => open(item.slug!, e.currentTarget)}
                className="group flex min-h-11 w-full cursor-pointer items-center gap-3 pt-4 text-left transition-colors"
                aria-haspopup="dialog"
              >
                <span className="flex shrink-0" aria-hidden>
                  <DrillBitPin size={20} />
                </span>
                <span
                  className="font-sans font-medium text-deep-navy underline decoration-amber/0 decoration-2 underline-offset-4 transition-colors group-hover:decoration-amber"
                  style={{ fontSize: "15px", lineHeight: "1.55" }}
                >
                  {item.label}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden
                  className="shrink-0 text-amber opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            ) : (
              <span className="flex min-h-11 items-center gap-3 pt-4">
                <span className="flex shrink-0" aria-hidden>
                  <DrillBitPin size={20} />
                </span>
                <span
                  className="font-sans font-medium text-deep-navy"
                  style={{ fontSize: "15px", lineHeight: "1.55" }}
                >
                  {item.label}
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>

      {active && <ServiceModal service={active} onClose={close} />}
    </>
  );
}

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll lock while the modal is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Minimal focus containment — keep Tab cycling inside the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{ background: "rgba(17, 40, 78, 0.55)", backdropFilter: "blur(3px)" }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        tabIndex={-1}
        className="relative max-h-[85vh] w-full max-w-[640px] overflow-y-auto rounded-2xl bg-white p-7 outline-none md:p-10"
        style={{ boxShadow: "var(--shadow-bubble)" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-deep-navy transition-colors hover:bg-deep"
        >
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M3 3 L13 13 M13 3 L3 13" />
          </svg>
        </button>

        <p
          className="font-display font-bold uppercase"
          style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--color-amber-dim)" }}
        >
          {service.category}
        </p>
        <h3
          id="service-modal-title"
          className="mt-2 font-display font-black uppercase text-deep-navy"
          style={{ fontSize: "clamp(22px, 5vw, 30px)", letterSpacing: "-0.005em", lineHeight: "1.1" }}
        >
          {service.title}
        </h3>
        {/* Short, factual explanation only — no navigation out of the page. */}
        <p className="mt-4 font-sans font-medium text-deep-navy" style={{ fontSize: "15px", lineHeight: "1.6" }}>
          {service.summary}
        </p>
        <p className="mt-3 font-sans" style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--color-muted)" }}>
          {service.body}
        </p>
      </div>
    </div>
  );
}
