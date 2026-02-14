"use client";

import { LabHeroImage } from "@/entities/lab/ui/lab-hero-image";
import { LabDescription } from "@/entities/lab/ui/lab-description";
// import { LabProductsSection } from "@/widgets/lab-products-section/lab-products-section";
import { LAB_CONTENT } from "@/entities/lab/model/lab-content";
import styles from "./lab-content.module.scss";

export function LabContent() {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <LabHeroImage
          src={LAB_CONTENT.heroImage}
          alt={LAB_CONTENT.heroImageAlt}
        />
        <div className={styles.description}>
          <LabDescription text={LAB_CONTENT.description} />
        </div>
      </div>
      {/* <LabProductsSection title={LAB_CONTENT.productsSectionTitle} /> */}
    </div>
  );
}
