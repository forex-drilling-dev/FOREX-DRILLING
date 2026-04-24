type Props = { title: string; body: string };

export function PillarCard({ title, body }: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-amber/40 pt-6">
      <h4 className="font-display text-display-sm uppercase text-fore">{title}</h4>
      <p className="text-body text-subtle">{body}</p>
    </div>
  );
}
