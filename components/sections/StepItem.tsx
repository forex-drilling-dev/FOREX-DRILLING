type Props = { number: string; title: string; body: string };

export function StepItem({ number, title, body }: Props) {
  return (
    <article className="flex flex-col gap-4 border-t border-amber/30 pt-6">
      <span className="font-mono text-mono-xs uppercase tracking-widest text-amber">Step {number}</span>
      <h3 className="font-display text-display-sm uppercase text-fore">{title}</h3>
      <p className="text-body text-subtle">{body}</p>
    </article>
  );
}
