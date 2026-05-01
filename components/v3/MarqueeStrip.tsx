type Props = {
  items: readonly string[];
};

/**
 * Trust-bar marquee — full-width navy strip with services scrolling sideways.
 * Pure CSS animation, no JS — best performance for continuous loops.
 *
 * Items are rendered twice in a row for seamless looping.
 */
export function MarqueeStrip({ items }: Props) {
  return (
    <section
      aria-label="Capabilities"
      className="overflow-hidden border-y border-border bg-deep-navy py-5"
    >
      <div
        className="flex w-max gap-12"
        style={{ animation: "var(--animate-marquee)" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-4 font-sans font-medium uppercase text-on-navy-muted"
            style={{ fontSize: "13px", letterSpacing: "0.18em" }}
          >
            {item}
            <span aria-hidden className="text-amber">/</span>
          </span>
        ))}
      </div>
    </section>
  );
}
