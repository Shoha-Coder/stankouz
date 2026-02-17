"use client";

import { ReactNode } from "react";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";

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
    <AnimateOnScroll
      className={className}
      rootMargin="-30px"
      threshold={0.01}
      animationDelay={delay}
    >
      {children}
    </AnimateOnScroll>
  );
}
