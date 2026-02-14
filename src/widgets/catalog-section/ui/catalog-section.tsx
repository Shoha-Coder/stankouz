"use client";

import styles from "./catalog-section.module.scss";
import { useState, useMemo } from "react";
import { products, categories } from "@/shared/mock/catalog";
import { ProductCard } from "@/entities/product/ui/product-card";
import { CatalogFilters } from "@/widgets/catalog-filters/ui/catalog-filters";
import { useProducts } from "@/entities/product/model/useProducts";

export function CatalogSection() {
  const [categoryId, setCategoryId] = useState<number>();
  const [subId, setSubId] = useState<number>();
  const [query, setQuery] = useState("");
  const { data, isLoading } = useProducts({
    category: categoryId,
    page: 1,
    search: query,
  });
  const filtered = useMemo(() => {
    return data?.data.filter((p) => {
      if (categoryId && p.category_id !== categoryId) return false;
      if (subId && p.category_id !== subId) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    }) || [];
  }, [categoryId, subId, query, data]);

  return (
    <section className={styles.root}>
      <CatalogFilters
        categories={categories}
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
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
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
