"use client";

import styles from "./catalog-section.module.scss";
import { useState, useMemo } from "react";
import { ProductCard } from "@/entities/product/ui/product-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import { CatalogFilters } from "@/widgets/catalog-filters/ui/catalog-filters";
import { useProducts } from "@/entities/product/model/useProducts";
import { useCategories } from "@/entities/category/model/useCategories";
import { toCatalogFiltersFormat } from "@/entities/category/model/mappers";

export function CatalogSection() {
  const [categoryId, setCategoryId] = useState<number>();
  const [subId, setSubId] = useState<number>();
  const [query, setQuery] = useState("");
  const { data: categories = [] } = useCategories();
  const filterCategories = toCatalogFiltersFormat(categories);
  const { data } = useProducts({
    category_id: categoryId,
    subcategory_id: subId,
    page: 1,
    search: query || undefined,
  });
  const filtered = data?.data ?? [];

  return (
    <section className={styles.root}>
      <CatalogFilters
        categories={filterCategories}
        activeCategoryId={categoryId}
        activeSubId={subId}
        onChange={(c, s) => {
          setCategoryId(c);
          setSubId(s);
        }}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <h2>Kategoriya 1</h2>
            <p>Jami {filtered.length} ta mahsulot topildi</p>
          </div>

          <input
            className={styles.search}
            placeholder="Qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.grid}>
          {filtered.map((p, index) => (
            <AnimatedItem key={p.id} index={index}>
              <ProductCard product={p} />
            </AnimatedItem>
          ))}
        </div>

        <div className={styles.pagination}>
          <button className={styles.pageActive}>1</button>
          <button>2</button>
          <button>…</button>
          <button>12</button>
        </div>
      </div>
    </section>
  );
}
