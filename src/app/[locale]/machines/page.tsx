"use client";

import { useState } from "react";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { CatalogFilter } from "@/widgets/catalog-filter/catalog-filter";
import styles from "./products.module.scss";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { Pagination } from "@/shared/ui/pagination";
import { useProducts } from "@/entities/product/model/useProducts";
import { useTranslations } from "next-intl";
import { Skeleton } from "@/shared/ui/skeleton";

export default function MachinesPage() {
    const tBreadcrumb = useTranslations("breadcrumbs");
    const BREADCRUMB_ITEMS = [
        { label: tBreadcrumb("home"), href: "" },
        { label: tBreadcrumb("products"), href: "products" },
    ];
    const [category, setCategory] = useState<number>();
    const [subcategory, setSubcategory] = useState<number>();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data, isPending } = useProducts({
        category_id: category,
        subcategory_id: subcategory,
        search: search || undefined,
        page,
    });

    const products = data?.data
    const meta = data?.meta;
    const totalPages = meta?.last_page ?? 1;
    const total = meta?.total ?? 0;

    return (
        <div style={{ background: "#F6F6F6" }}>
            <Breadcrumb items={BREADCRUMB_ITEMS} />
            <div className={styles.layout}>
                <CatalogFilter
                    onChange={(selections) => {
                        const first = selections[0];
                        setCategory(first?.categoryId);
                        setSubcategory(first?.subcategoryId);
                        setPage(1);
                    }}
                />

                <div className={styles.content}>
                    <div className={styles.header}>
                        <p className={styles.categoryContainer}>
                            <span>{total} ta mahsulot topildi</span>
                        </p>
                        <div className={styles.searchContainer}>
                            <input
                                placeholder="Qidirish..."
                                className={styles.search}
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />
                            <svg
                                className={styles.searchIcon}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                            >
                                <path
                                    d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
                                    stroke="#6C6C6C"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21 21L15 15"
                                    stroke="#6C6C6C"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>

                    {isPending ? (
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
                                {products!.slice(0, 6).map((p, index) => (
                                    <AnimatedItem key={p.id} index={index}>
                                        <ProductCard product={p} />
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
