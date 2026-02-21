"use client";

import { LogosCarousel } from "@/shared/ui/logos-carousel";
import { useTranslations } from "next-intl";
import { usePartners } from "@/entities/partner/model/usePartners";
import { toCarouselItems } from "@/entities/partner/model/mappers";
import { Skeleton } from "@/shared/ui/skeleton";
import styles from "./partners.module.scss";

interface PartnersProps {
  isLab?: boolean;
}

export function Partners({ isLab }: PartnersProps) {
  const t = useTranslations("home");
  const { data: partners, isPending, isError } = usePartners();
  const items = partners?.length ? toCarouselItems(partners) : [];

  const showSkeleton = isPending || isError || !items.length;

  if (showSkeleton) {
    return (
      <section className={styles.root}>
        <header className={styles.header}>
          <h2>{t("partners")}</h2>
          <p>{t("partners-title")}</p>
        </header>
        <div className={styles.skeletonRow}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className={styles.skeletonLogo} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <LogosCarousel
      title={t("partners")}
      subtitle={t("partners-title")}
      items={items}
    />
  );
}
