"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProductDetail } from "../model/types";
import styles from "./product-info.module.scss";

const TRUNCATE_LENGTH = 200;

interface Props {
  product: ProductDetail;
}

export function ProductInfo({ product }: Props) {
  const t = useTranslations("home");
  const [expanded, setExpanded] = useState(false);
  const desc = product.description?.trim() ?? "";
  const isLong = desc.length > TRUNCATE_LENGTH;

  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.title}</h1>

      {desc && (
        <p className={styles.description}>
          {!expanded && isLong ? (
            <>
              {desc.slice(0, TRUNCATE_LENGTH)}
              {"... "}
              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => setExpanded(true)}
              >
                {t("more-button")}
              </button>
            </>
          ) : isLong ? (
            <>
              {desc}
              {" "}
              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => setExpanded(false)}
              >
                {t("less-button")}
              </button>
            </>
          ) : (
            desc
          )}
        </p>
      )}

      {product.features?.length > 0 && (
        <section className={styles.features}>
          <h2 className={styles.featuresTitle}>Xususiyatlari</h2>
          {product.features.map((feature, index) => (
            <div key={index} className={styles.featureRow}>
              <span className={styles.featureLabel}>{feature.name}</span>
              <span className={styles.featureDots} aria-hidden />
              <span className={styles.featureValue}>{feature.value}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
