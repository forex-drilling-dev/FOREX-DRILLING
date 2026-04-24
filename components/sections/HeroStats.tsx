import { StatCard } from "./StatCard";

export function HeroStats() {
  return (
    <aside className="grid gap-8 border-l border-border bg-deep/80 p-8 backdrop-blur-sm">
      <StatCard staticValue="Singapore" label="Headquarters" />
      <StatCard staticValue="Papua New Guinea" label="Operations" description="Active mining & exploration" />
      <StatCard value={12} suffix="+" label="Drilling Capabilities" description="From diamond to RC to sonic" />
      <StatCard staticValue="Asia-Pacific" label="Region" />
    </aside>
  );
}
