"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { getLabById } from "@/entities/lab/api/lab.service";
import { LabItem } from "@/entities/lab/model/types";
import { createFallbackLabItem } from "@/entities/lab/model/mock-lab-item";
import { LabDetailWidget } from "@/widgets/lab-detail/lab-detail";
import { Products } from "@/widgets/products/products";
import { Partners } from "@/widgets/partners/partners";
import styles from "./page.module.scss";
import { RelatedProducts } from "@/widgets/related-products/related-products";

const BREADCRUMB_ITEMS = [
  { label: "Bosh sahifa", href: "" },
  { label: "Laboratoriya", href: "labs" },
];

export default function LabDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [lab, setLab] = useState<LabItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Laboratoriya topilmadi");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getLabById(id)
      .then(setLab)
      .catch(() => {
        setLab(createFallbackLabItem(id));
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className={styles.root}>
        <Breadcrumb items={[...BREADCRUMB_ITEMS, { label: "..." }]} />
        <div className={styles.loading}>Yuklanmoqda...</div>
      </div>
    );
  }

  if (error && !lab) {
    return (
      <div className={styles.root}>
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!lab) return null;

  return (
    <div className={styles.root}>
      <Breadcrumb items={[...BREADCRUMB_ITEMS]} />
      <LabDetailWidget lab={lab} />
      {/* <Products isLab={true} />
      <Partners isLab={true} /> */}
       <RelatedProducts excludeId={lab.id} isLab={true} />
    </div>
  );
}
