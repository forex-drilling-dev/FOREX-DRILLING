type Props = { label: string; code: string };

export function ProtocolBadge({ label, code }: Props) {
  return (
    <div className="flex flex-col gap-3 border border-border bg-surface p-6 transition-colors duration-fast hover:border-amber">
      <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">{code}</span>
      <span className="font-display text-display-sm leading-none uppercase text-fore">{label}</span>
    </div>
  );
}
