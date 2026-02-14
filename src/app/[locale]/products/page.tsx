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
        <div className={styles.content}>
          <div className={styles.grid}>
            {displayProducts.map((p) => (
              <ProductCard key={p.id} product={p} isProductPage={true} />
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