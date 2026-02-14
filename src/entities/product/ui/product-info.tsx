"use client";

import { ProductDetail } from "../model/types";
import styles from "./product-info.module.scss";

interface Props {
  product: ProductDetail;
}

export function ProductInfo({ product }: Props) {
  return (
    <div className={styles.info}>
      <h1 className={styles.title}>{product.title}</h1>

      {product.description && (
        <p className={styles.description}>{product.description}</p>
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
