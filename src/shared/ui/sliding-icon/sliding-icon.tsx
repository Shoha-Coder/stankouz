import { ReactNode } from "react";
import styles from "./sliding-icon.module.scss";

interface SlidingIconProps {
  children: ReactNode;
  className?: string;
}

/**
 * Double-arrow / sliding icon replace effect.
 * On hover: current icon exits right, second icon enters from left.
 * Requires parent to have hover state (e.g. button:hover).
 */
export function SlidingIcon({ children, className }: SlidingIconProps) {
  return (
    <span className={`${styles.wrap} ${className ?? ""}`}>
      <span className={styles.iconOut}>{children}</span>
      <span className={styles.iconIn}>{children}</span>
    </span>
  );
}
