"use client";

import styles from "./products.module.scss";
import { AnimatedItem } from "@/shared/ui/animated-item";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { useTranslations } from "next-intl";
import { useProducts } from "@/entities/product/model/useProducts";

export function Products({ isLab }: { isLab?: boolean }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = useTranslations("home");
  const { data, isPending } = useProducts({ page: 1 });
  const products = data?.data ?? [];

  if (isPending || products.length === 0) return null;

  const productPath = "machines"; // products (machines) detail
  const morePath = isLab ? "labs" : "machines";

  return (
    <section className={`${styles.products} ${isLab ? styles.lab : ""}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("products")}</h2>
        {!isLab && <p className={styles.subtitle}>{t("products-title")}</p>}
      </div>

      <div className={styles.grid}>
        {products.slice(0, 8).map((item, index) => (
          <AnimatedItem key={item.id} index={index}>
            <Link href={`/${locale}/${productPath}/${item.slug}`} className={styles.card}>
              <div className={styles.imageWrapper}>
                {item.categoryLabel && (
                  <span className={styles.badge}>{item.categoryLabel}</span>
                )}
                <ImageWithLoader
                  src={item.image}
                  alt={item.title}
                  width={433}
                  height={256}
                  fillWrapper
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              {item.description && (
                <p className={styles.cardText}>{item.description}</p>
              )}
              <Link
                href={`/${locale}/${productPath}/${item.slug}`}
                className={styles.details}
                onClick={(e) => e.stopPropagation()}
              >
                {t("details")}
              </Link>
            </Link>
          </AnimatedItem>
        ))}
      </div>

      <div className={styles.action}>
        <Link href={`/${locale}/${morePath}`} className={styles.outlineBtn}>
          {isLab ? t("more-button") : t("see-catalog")}
          <div
            className={styles.iconCircle}
            style={{ transform: isLab ? "rotate(90deg)" : "none" }}
          >
            <ArrowRight />
          </div>
        </Link>
      </div>
    </section>
  );
}
