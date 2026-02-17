"use client";

import { ReactNode } from "react";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";

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
    <AnimateOnScroll
      className={className}
      rootMargin="-30px"
      threshold={0.01}
      animationDelay={resolvedDelay}
    >
      {children}
    </AnimateOnScroll>
  );
}
