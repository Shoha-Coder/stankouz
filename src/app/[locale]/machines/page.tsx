"use client";

import { useState } from "react";
import { Product } from "@/entities/product/model/types";
import { ProductCard } from "@/entities/product/ui/product-card";
import { CatalogFilter } from "@/widgets/catalog-filter/catalog-filter";
import styles from "./products.module.scss";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { products } from "@/widgets/products/model/products";
import { Pagination } from "@/shared/ui/pagination";

const items = [
  { label: "Bosh sahifa", href: "" },
  { label: "Mahsulotlar", href: "machines" },
];

const PER_PAGE = 9;

export default function CatalogPage() {
  const [category, setCategory] = useState<number>();
  const [subcategory, setSubcategory] = useState<number>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   getProducts({
  //     category_id: category,
  //     subcategory_id: subcategory,
  //     search,
  //     page,
  //   })
  //     .then((res) => {
  //       setProductsList(res.data || []);
  //       setTotal(res.meta?.total ?? 0);
  //       setLastPage(res.meta?.last_page ?? 1);
  //     })
  //     .catch(() => {
  //       setProductsList(products as Product[]);
  //       setTotal(products.length);
  //       setLastPage(Math.ceil(products.length / PER_PAGE));
  //     });
  // }, [category, subcategory, search, page]);

  const allProducts = (products ?? []) as Product[];
  const filteredProducts = search.trim()
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    : allProducts;

  const totalFiltered = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PER_PAGE;
  const displayProducts = filteredProducts.slice(startIndex, startIndex + PER_PAGE);

  return (
    <div style={{ background: "#F6F6F6" }}>
      <Breadcrumb items={items} />
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
              <span>Kategoriya 1</span>
              <span>{totalFiltered} ta mahsulot topildi</span>
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
              <svg className={styles.searchIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <g clipPath="url(#clip0_481_527)">
                  <path d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 21L15 15" stroke="#6C6C6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_481_527">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          <div className={styles.grid}>
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={safePage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}