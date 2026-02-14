"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedItemProps = {
  children: ReactNode;
  /** Index for staggered reveal (delay = index * 0.04s) */
  index?: number;
  /** Override delay in seconds */
  delay?: number;
  className?: string;
};

const STAGGER_DELAY = 0.04;

/**
 * Subtle entrance animation for list/grid items (cards, etc.).
 * Triggers when scrolled into view. Use index for staggered reveal.
 */
export function AnimatedItem({
  children,
  index = 0,
  delay,
  className,
}: AnimatedItemProps) {
  const resolvedDelay = delay ?? index * STAGGER_DELAY;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.35,
        delay: resolvedDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
