"use client";

import { ReactNode } from "react";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";

type PageTransitionProps = {
  children: ReactNode;
};

/**
 * Subtle page-level entrance animation.
 * Triggers when scrolled into view. Gentle fade-in with slight upward motion.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimateOnScroll rootMargin="-30px" threshold={0.01}>
      {children}
    </AnimateOnScroll>
  );
}
