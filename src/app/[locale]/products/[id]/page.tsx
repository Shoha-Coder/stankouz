"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { getProductById } from "@/entities/product/api/product.service";
import { ProductDetail } from "@/entities/product/model/types";
import { createFallbackProductDetail } from "@/entities/product/model/mock-product-detail";
import { ProductDetailTabs } from "@/entities/product/ui/product-detail-tabs";
import { ProductDetailWidget } from "@/widgets/product-detail/product-detail";
import { RelatedProducts } from "@/widgets/related-products/related-products";
import styles from "./page.module.scss";
import { Partners } from "@/widgets/partners/partners";

const BREADCRUMB_ITEMS = [
  { label: "Bosh sahifa", href: "" },
  { label: "Mahsulotlar", href: "machines" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Mahsulot topilmadi");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    getProductById(id)
      .then((data) => {
        const images = data.images?.length ? data.images : ["/images/product1.png"];
        setProduct({ ...data, images });
      })
      .catch(() => {
        setProduct(createFallbackProductDetail(id));
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

  if (error && !product) {
    return (
      <div className={styles.root}>
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className={styles.root}>
      <Breadcrumb items={[...BREADCRUMB_ITEMS]} />
      <ProductDetailWidget product={product} />
      {/* <div className={styles.tabsSection}>
        <ProductDetailTabs product={product} />
      </div> */}
      <RelatedProducts excludeId={product.id} />
      <Partners />
    </div>
  );
}
