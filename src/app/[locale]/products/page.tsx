"use client";

import { useState } from "react";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import styles from "./products.module.scss";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { Pagination } from "@/shared/ui/pagination";
import { useProducts } from "@/entities/product/model/useProducts";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/shared/ui/skeleton";

export default function ProductsPage() {
    const tBreadcrumb = useTranslations("breadcrumbs");
    const BREADCRUMB_ITEMS = [
        { label: tBreadcrumb("home"), href: "" },
        { label: tBreadcrumb("machines"), href: "machines" },
    ];
    const [page, setPage] = useState(1);

    const { data, isPending } = useProducts({ page, category_id: 18 });

    const products = data?.data;
    const totalPages = data?.meta?.last_page ?? 1;

    const showSkeleton = isPending;

    return (
        <div style={{ background: "#F6F6F6" }}>
            <Breadcrumb items={BREADCRUMB_ITEMS} />
            <div className={styles.page}>
                <div className={styles.content}>
                    {showSkeleton ? (
                        <div className={styles.grid}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton key={i} className={styles.skeletonCard} />
                            ))}
                        </div>
                    ) : !products?.length ? (
                        <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
                            Mahsulot topilmadi
                        </p>
                    ) : (
                        <>
                            <div className={styles.grid}>
                                {products!.map((p, index) => (
                                    <AnimatedItem key={p.id} index={index}>
                                        <ProductCard product={p} isProductPage />
                                    </AnimatedItem>
                                ))}
                            </div>

                            <div className={styles.paginationWrapper}>
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
