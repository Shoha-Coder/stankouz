"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ProductDetail } from "@/entities/product/model/types";
import { ProductGallery } from "@/entities/product/ui/product-gallery";
import infoStyles from "@/entities/product/ui/product-info.module.scss";
import styles from "./product-detail.module.scss";

const DEFAULT_IMAGE = "/images/product1.png";
const TRUNCATE_LENGTH = 550;

interface Props {
  product: ProductDetail;
}

export function ProductDetailWidget({ product }: Props) {
  const t = useTranslations("home");
  const [expanded, setExpanded] = useState(false);
  const images = product.images?.length ? product.images : [DEFAULT_IMAGE];
  const desc = product.description?.trim() ?? "";
  const isLong = desc.length > TRUNCATE_LENGTH;

  return (
    <div className={styles.contentCard}>
      <div className={styles.layout}>
        <h1 className={infoStyles.title} data-layout="title">
          {product.title}
        </h1>
        <div data-layout="gallery">
          <ProductGallery images={images} alt={product.title} />
        </div>
        {desc && (
          <p
            className={infoStyles.description}
            data-layout="description"
          >
            {!expanded && isLong ? (
              <>
                {desc.slice(0, TRUNCATE_LENGTH)}
                {"... "}
                <button
                  type="button"
                  className={infoStyles.expandBtn}
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
                  className={infoStyles.expandBtn}
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
          <section
            className={infoStyles.features}
            data-layout="features"
          >
            <h2 className={infoStyles.featuresTitle}>Xususiyatlari</h2>
            {product.features.map((feature, index) => (
              <div key={index} className={infoStyles.featureRow}>
                <span className={infoStyles.featureLabel}>{feature.name}</span>
                <span className={infoStyles.featureDots} aria-hidden />
                <span className={infoStyles.featureValue}>{feature.value}</span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
