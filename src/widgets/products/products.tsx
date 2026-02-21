"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./products.module.scss";
import { AnimatedItem } from "@/shared/ui/animated-item";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { useTranslations } from "next-intl";
import { useProducts } from "@/entities/product/model/useProducts";
import { Skeleton } from "@/shared/ui/skeleton";

const INITIAL_LIMIT = 6;

export function Products({ isLab, isHome, isProducts }: { isLab?: boolean, isHome?: boolean, isProducts?: boolean }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = useTranslations("home");
  const { data, isPending } = useProducts({ page: 1 });
  const products = (isHome || isProducts) ? data?.data?.filter(p => !p.categories.some(c => c.id === 17)).filter(p => !p.categories.some(c => c.id === 18)) : isLab ? data?.data?.filter(p => p.categories.some(c => c.id === 17)) : data?.data;
  const [expanded, setExpanded] = useState(false);

  const showSkeleton = isPending || !products?.length;
  const hasMore = (products?.length ?? 0) > INITIAL_LIMIT;
  const displayed = products
    ? expanded
      ? products
      : products.slice(0, INITIAL_LIMIT)
    : [];

  const gridRef = useRef<HTMLDivElement>(null);
  const [wrapHeight, setWrapHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!gridRef.current || !displayed.length) return;
    const ro = new ResizeObserver(() => {
      if (gridRef.current) {
        setWrapHeight(gridRef.current.scrollHeight);
      }
    });
    ro.observe(gridRef.current);
    setWrapHeight(gridRef.current.scrollHeight);
    return () => ro.disconnect();
  }, [displayed.length, expanded]);

  if (showSkeleton) {
    return (
      <section className={`${styles.products} ${isLab ? styles.lab : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("products")}</h2>
          {!isLab && <p className={styles.subtitle}>{t("products-title")}</p>}
        </div>
        <div className={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.card}>
              <Skeleton className={styles.skeletonImage} />
              <Skeleton className={styles.skeletonTitle} />
              <Skeleton className={styles.skeletonText} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const productPath = "machines"; // products (machines) detail
  const morePath = isLab ? "labs" : "machines";

  return (
    <section className={`${styles.products} ${isLab ? styles.lab : ""}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("products")}</h2>
        {!isLab && <p className={styles.subtitle}>{t("products-title")}</p>}
      </div>

      <div
        className={styles.gridWrap}
        style={
          hasMore && wrapHeight != null
            ? { maxHeight: wrapHeight }
            : undefined
        }
      >
        <div ref={gridRef} className={styles.grid}>
          {displayed.map((item, index) => (
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
      </div>

      <div className={styles.action}>
        {hasMore ? (
          <button
            type="button"
            className={styles.outlineBtn}
            onClick={() => setExpanded((e) => !e)}
          >
            <span>{expanded ? t("less-button") : t("more-button")}</span>
            <span
              className={`${styles.iconCircle} ${expanded ? styles.iconCircleOpen : ""}`}
            >
              <ArrowRight />
            </span>
          </button>
        ) : (
          <Link href={`/${locale}/${morePath}`} className={styles.outlineBtn}>
            <span>{isLab ? t("more-button") : t("see-catalog")}</span>
            <span className={`${styles.iconCircle} ${styles.iconCircleLink}`}>
              <ArrowRight />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
