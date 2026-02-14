"use client";

import { ProductDetail } from "@/entities/product/model/types";
import { ProductGallery } from "@/entities/product/ui/product-gallery";
import infoStyles from "@/entities/product/ui/product-info.module.scss";
import styles from "./product-detail.module.scss";

const DEFAULT_IMAGE = "/images/product1.png";

interface Props {
  product: ProductDetail;
}

export function ProductDetailWidget({ product }: Props) {
  const images = product.images?.length ? product.images : [DEFAULT_IMAGE];

  return (
    <div className={styles.contentCard}>
      <div className={styles.layout}>
        <h1 className={infoStyles.title} data-layout="title">
          {product.title}
        </h1>
        <div data-layout="gallery">
          <ProductGallery images={images} alt={product.title} />
        </div>
        {product.description && (
          <p
            className={infoStyles.description}
            data-layout="description"
          >
            {product.description}
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
