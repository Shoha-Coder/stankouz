"use client";

import { ProductDetail } from "@/entities/product/model/types";
import { ProductGallery } from "@/entities/product/ui/product-gallery";
import { ProductInfo } from "@/entities/product/ui/product-info";
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
        <ProductGallery images={images} alt={product.title} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
