import { Marquee } from "@/components/motion/Marquee";

type Props = { items: string[] };

export function MarqueeBanner({ items }: Props) {
  return (
    <div className="border-y border-border bg-deep py-6">
      <Marquee speed="slow">
        <ul className="flex items-center gap-10 pr-10 font-mono text-mono-sm uppercase tracking-widest text-amber">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-10">
              {item}
              <span className="text-border" aria-hidden>·</span>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  );
}
