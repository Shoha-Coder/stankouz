"use client";

import { useState } from "react";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import styles from "./products.module.scss";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { Pagination } from "@/shared/ui/pagination";
import { useProducts } from "@/entities/product/model/useProducts";

const BREADCRUMB_ITEMS = [
    { label: "Bosh sahifa", href: "" },
    { label: "Mahsulotlar", href: "products" },
];

export default function ProductsPage() {
    const [page, setPage] = useState(1);

    const { data, isPending } = useProducts({ page });

    const products = data?.data ?? [];
    const totalPages = data?.meta?.last_page ?? 1;

    return (
        <div style={{ background: "#F6F6F6" }}>
            <Breadcrumb items={BREADCRUMB_ITEMS} />
            <div className={styles.page}>
                <div className={styles.content}>
                    {isPending ? (
                        <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
                            Yuklanmoqda...
                        </p>
                    ) : (
                        <>
                            <div className={styles.grid}>
                                {products.map((p, index) => (
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
