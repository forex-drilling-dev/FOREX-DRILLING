"use client";
import { motion } from "framer-motion";
import { fadeUp, baseTransition } from "@/lib/motion";
import type { ReactNode } from "react";

type As = "div" | "section" | "article" | "li" | "h1" | "h2" | "h3" | "p";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: As;
};

export function FadeIn({ children, delay = 0, className, as = "div" }: Props) {
  const MotionTag = motion[as] as React.ComponentType<React.ComponentProps<typeof motion.div>>;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ ...baseTransition, delay }}
    >
      {children}
    </MotionTag>
  );
}
