"use client";

import { LabHeroImage } from "@/entities/lab/ui/lab-hero-image";
import { LabDescription } from "@/entities/lab/ui/lab-description";
import { HtmlContent } from "@/shared/ui/html-content";
import { useCategoryBySlug } from "@/entities/category/model/useCategoryBySlug";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { Skeleton } from "@/shared/ui/skeleton";
import styles from "./lab-content.module.scss";

const LAB_CATEGORY_SLUG = "laboratoriia";

function isHtml(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

export function LabContent() {
  const { data: category, isPending } = useCategoryBySlug(LAB_CATEGORY_SLUG);

  const heroImage = category?.images
    ? getFallbackImage(category.images)
    : "/images/stanok1.png";
  const heroAlt = category?.name?.trim() ?? "Laboratoriya";
  const description = category?.desc?.trim() ?? "";

  if (isPending) {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <Skeleton className={styles.skeletonHero} />
          <Skeleton className={styles.skeletonDesc} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <LabHeroImage src={heroImage} alt={heroAlt} />
        {description && (
          <div className={styles.description}>
            {isHtml(description) ? (
              <HtmlContent content={description} />
            ) : (
              <LabDescription text={description} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
