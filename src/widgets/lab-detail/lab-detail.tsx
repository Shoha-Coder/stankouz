"use client";

import { LabItem } from "@/entities/lab/model/types";
import { LabDetailImage } from "@/entities/lab/ui/lab-detail-image";
import { LabDetailInfo } from "@/entities/lab/ui/lab-detail-info";
import styles from "./lab-detail.module.scss";

interface Props {
  lab: LabItem;
}

export function LabDetailWidget({ lab }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.layout}>
        <LabDetailImage src={lab.image} alt={lab.title} />
        <LabDetailInfo title={lab.title} description={lab.description} />
      </div>
    </div>
  );
}
