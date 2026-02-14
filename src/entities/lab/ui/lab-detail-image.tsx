"use client";

import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import styles from "./lab-detail-image.module.scss";

interface Props {
  src: string;
  alt: string;
}

export function LabDetailImage({ src, alt }: Props) {
  return (
    <div className={styles.wrap}>
      <ImageWithLoader
        src={src}
        alt={alt}
        width={598}
        height={370}
        className={styles.image}
        priority
        unoptimized
        fillWrapper
      />
    </div>
  );
}
