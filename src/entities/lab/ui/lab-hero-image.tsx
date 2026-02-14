"use client";

import Image from "next/image";
import styles from "./lab-hero-image.module.scss";

interface Props {
  src: string;
  alt: string;
}

export function LabHeroImage({ src, alt }: Props) {
  return (
    <div className={styles.wrap}>
      <Image
        src={src}
        alt={alt}
        width={1029}
        height={370}
        className={styles.image}
        priority
        unoptimized
      />
    </div>
  );
}
