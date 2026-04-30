import { cn } from "@/lib/utils";

type Item = { code: string; label: string };

type Props = {
  items: Item[];
  className?: string;
};

/**
 * Editorial grid of protocol badges — each is a code + label cell.
 * Used for HSE protocols (SOP / JSA / PTW / Take 5 / TBX / PPE).
 *
 * Layout: 3-up tablet, 6-up desktop. Each badge has a thin navy border
 * and the code in heavy display weight, label in muted.
 */
export function ProtocolGrid({ items, className }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-px bg-border",
        "sm:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {items.map((p) => (
        <div
          key={p.code}
          className="flex flex-col gap-2 bg-white p-6 transition-colors duration-200 hover:bg-deep"
        >
          <p
            className="font-display font-black text-amber"
            style={{ fontSize: "26px", lineHeight: "1", letterSpacing: "0.02em" }}
          >
            {p.code}
          </p>
          <p
            className="font-display font-medium uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              lineHeight: "1.4",
              color: "var(--color-muted)",
            }}
          >
            {p.label}
          </p>
        </div>
      ))}
    </div>
  );
}
