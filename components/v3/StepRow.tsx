import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title: string;
  body: ReactNode;
};

type Props = {
  steps: Step[];
  className?: string;
};

/**
 * Horizontal stepper — for Project Delivery Approach.
 * 4 steps in a row on desktop, vertical on mobile.
 *
 * Each step: big yellow number, dark navy title, muted body.
 * Steps connected by a thin dashed navy line on desktop.
 */
export function StepRow({ steps, className }: Props) {
  return (
    <ol className={cn("relative grid gap-10 md:grid-cols-4", className)}>
      {steps.map((step, i) => (
        <li key={step.number} className="relative flex flex-col gap-4">
          {/* Connector line — only between steps, not after last */}
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute hidden md:block"
              style={{
                top: "20px",
                left: "calc(100% - 12px)",
                width: "calc(100% - 32px)",
                borderTop: "2px dashed var(--color-amber)",
                opacity: 0.4,
              }}
            />
          )}
          <p
            className="font-display font-black text-amber"
            style={{ fontSize: "44px", lineHeight: "1" }}
          >
            {step.number}
          </p>
          <h3
            className="font-display font-extrabold uppercase text-deep-navy"
            style={{ fontSize: "16px", letterSpacing: "0.06em" }}
          >
            {step.title}
          </h3>
          <p
            className="font-sans"
            style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
          >
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
