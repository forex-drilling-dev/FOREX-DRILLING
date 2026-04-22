"use client";
import { motion } from "framer-motion";
import { stagger, fadeUp, baseTransition } from "@/lib/motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number };

export function Stagger({ children, className, delay = 0.08 }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger(delay)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} transition={baseTransition}>
      {children}
    </motion.div>
  );
}
