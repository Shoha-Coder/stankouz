"use client";

import { useParams } from "next/navigation";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { ProductDetailWidget } from "@/widgets/product-detail/product-detail";
import { ProductDetailTabs } from "@/entities/product/ui/product-detail-tabs";
import { RelatedProducts } from "@/widgets/related-products/related-products";
import styles from "./page.module.scss";
import { Partners } from "@/widgets/partners/partners";
import { useProduct } from "@/entities/product/model/useProduct";
import { createFallbackProductDetail } from "@/entities/product/model/mock-product-detail";
import { useTranslations } from "next-intl";

export default function MachineDetailPage() {
    const tBreadcrumb = useTranslations("breadcrumbs");
    const BREADCRUMB_ITEMS = [
        { label: tBreadcrumb("home"), href: "" },
        { label: tBreadcrumb("products"), href: "products" },
    ];
    const params = useParams();
    const locale = params?.locale as string | undefined;
    const slug = params?.slug as string | undefined;
    const { data, isPending, isError } = useProduct(slug, locale);

    const product = data
        ? { ...data, images: data.images?.length ? data.images : ["/images/product1.png"] }
        : isError && slug
          ? createFallbackProductDetail(slug)
          : null;

    const error = !slug ? "Mahsulot topilmadi" : null;
    const loading = isPending && !product;

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
            <div className={styles.tabsSection}>
                <ProductDetailTabs product={product} />
            </div>
            <RelatedProducts excludeId={product.id} />
            <Partners />
        </div>
    );
}
