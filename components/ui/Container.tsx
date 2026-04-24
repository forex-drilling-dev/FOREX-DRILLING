import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType<{ className?: string; children?: ReactNode }>;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: Props) {
  return (
    <Tag className={cn("container-gutter mx-auto w-full max-w-(--container-max)", className)}>
      {children}
    </Tag>
  );
}
