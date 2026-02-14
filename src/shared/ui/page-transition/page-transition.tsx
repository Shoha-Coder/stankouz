"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
};

/**
 * Subtle page-level entrance animation.
 * Triggers when scrolled into view. Gentle fade-in with slight upward motion.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
