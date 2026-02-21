"use client";

import styles from "./skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={`${styles.skeleton} ${className ?? ""}`} style={style} />;
}
