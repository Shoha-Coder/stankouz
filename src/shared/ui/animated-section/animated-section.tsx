"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedSectionProps = {
  children: ReactNode;
  /** Optional delay in seconds for staggered reveals */
  delay?: number;
  /** Optional className for the wrapper */
  className?: string;
};

/**
 * Subtle section entrance animation.
 * Triggers when scrolled into view. Use for key content sections.
 */
export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
