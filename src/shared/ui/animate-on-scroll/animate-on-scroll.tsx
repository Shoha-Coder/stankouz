'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import styles from './animate-on-scroll.module.scss';

export interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Use stagger for direct children (default: false) */
  stagger?: boolean;
  /** Root margin for Intersection Observer, e.g. '0px 0px -50px 0px' */
  rootMargin?: string;
  /** Threshold 0-1 for when to trigger (default: 0.1) */
  threshold?: number;
  /** Animation delay in seconds when revealed (for staggered items) */
  animationDelay?: number;
}

export function AnimateOnScroll({
  children,
  className = '',
  stagger = false,
  rootMargin = '0px 0px -40px 0px',
  threshold = 0.1,
  animationDelay,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const classes = [
    className,
    stagger ? styles.scrollRevealStagger : styles.scrollReveal,
    isVisible ? styles.isVisible : '',
  ]
    .filter(Boolean)
    .join(' ');

  const style = isVisible && animationDelay != null
    ? { transitionDelay: `${animationDelay}s` }
    : undefined;

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
