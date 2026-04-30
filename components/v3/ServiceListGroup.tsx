import type { ReactNode } from "react";
import { DrillBitPin } from "./DrillBitPin";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  items: string[];
  description?: ReactNode;
  className?: string;
};

/**
 * Service category list — uses small DrillBitPin icons as bullets,
 * which is the signature motif (vis filetée) authentic to drilling work.
 *
 * The pin icons are sized small (24px wide) so they read as bullets,
 * never overlapping the text — they sit clearly in their own column
 * with the text aligned to a separate column.
 */
export function ServiceListGroup({ title, items, description, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <h3
        className="font-display font-extrabold uppercase text-deep-navy"
        style={{ fontSize: "20px", letterSpacing: "0.04em" }}
      >
        {title}
      </h3>
      {description && (
        <div
          className="font-display font-normal max-w-[60ch]"
          style={{ fontSize: "14px", lineHeight: "1.65", color: "var(--color-muted)" }}
        >
          {description}
        </div>
      )}
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="flex shrink-0 pt-0.5" aria-hidden>
              <DrillBitPin size={20} />
            </span>
            <span
              className="font-display font-medium text-deep-navy"
              style={{ fontSize: "14px", lineHeight: "1.6" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
