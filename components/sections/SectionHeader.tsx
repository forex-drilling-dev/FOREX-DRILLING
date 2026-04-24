import { cn } from "@/lib/utils";

type Props = {
  index?: string;
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ index, label, title, description, align = "left", className }: Props) {
  return (
    <header className={cn("flex flex-col gap-6", align === "center" && "items-center text-center", className)}>
      {(index || label) && (
        <p className="flex items-center gap-3 font-mono text-mono-xs uppercase tracking-widest text-amber">
          {index && <span>{index}</span>}
          {index && label && <span className="h-px w-8 bg-amber" aria-hidden />}
          {label && <span className="text-subtle">{label}</span>}
        </p>
      )}
      <h2 className="max-w-4xl font-display text-display-lg uppercase text-balance">{title}</h2>
      {description && <p className="max-w-2xl text-body-lg text-subtle">{description}</p>}
    </header>
  );
}
