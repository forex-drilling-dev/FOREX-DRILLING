import { CountUp } from "@/components/motion/CountUp";
import { cn } from "@/lib/utils";

type Props = {
  value?: number;
  staticValue?: string;
  suffix?: string;
  label: string;
  description?: string;
  className?: string;
};

export function StatCard({ value, staticValue, suffix, label, description, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-3 border-l border-border pl-6", className)}>
      <p className="font-display text-display-md leading-none text-fore">
        {value !== undefined ? <CountUp value={value} suffix={suffix} /> : staticValue}
      </p>
      <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">{label}</p>
      {description && <p className="text-body text-subtle">{description}</p>}
    </div>
  );
}
