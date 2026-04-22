import type { Variants, Transition } from "framer-motion";

export const easePrecise = [0.22, 1, 0.36, 1] as const;
export const easeSubtle = [0.4, 0, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger = (delay = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const baseTransition: Transition = {
  duration: 0.8,
  ease: easePrecise,
};
