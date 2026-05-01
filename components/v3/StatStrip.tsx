type Stat = {
  /** Big value — number or short string */
  value: string;
  /** Small label below the value */
  label: string;
};

type Props = {
  items: readonly Stat[];
};

/**
 * Editorial trust strip — replaces the scrolling marquee with a static
 * data sheet of key company facts. Each cell is divided by a thin
 * vertical line, mirroring the technical / cartographic aesthetic of
 * the rest of the site (mire / coordinates / data sheet).
 *
 * Reads as a real piece of information rather than decorative scroll.
 */
export function StatStrip({ items }: Props) {
  return (
    <section
      aria-label="Key facts"
      className="relative bg-deep-navy"
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 px-6 sm:grid-cols-4 md:px-14">
        {items.map((s, i) => (
          <div
            key={s.label}
            className={`relative flex flex-col gap-1 py-7 ${
              i > 0 ? "sm:border-l border-white/10" : ""
            } ${i >= 2 ? "border-t border-white/10 pt-7 sm:border-t-0 sm:pt-7" : ""}`}
            style={{ paddingInline: "clamp(20px, 3vw, 40px)" }}
          >
            <p
              className="font-display font-bold uppercase leading-none text-amber"
              style={{ fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "0.02em" }}
            >
              {s.value}
            </p>
            <p
              className="font-sans font-medium uppercase text-on-navy-muted"
              style={{ fontSize: "12px", letterSpacing: "0.18em", marginTop: "10px" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
