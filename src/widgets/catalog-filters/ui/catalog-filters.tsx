"use client";

import styles from "./catalog-filters.module.scss";
import { Category } from "@/entities/category/model/types";

type Props = {
  categories: any;
  activeCategoryId?: number;
  activeSubId?: number;
  onChange: (categoryId: number, subId?: number) => void;
};

export function CatalogFilters({
  categories,
  activeCategoryId,
  activeSubId,
  onChange,
}: Props) {
  return (
    <aside className={styles.root}>
      <h3 className={styles.title}>Kategoriyalar</h3>

      {categories.map((cat: any) => (
        <div key={cat.id} className={styles.category}>
          <button
            className={`${styles.categoryBtn} ${
              cat.id === activeCategoryId ? styles.active : ""
            }`}
            onClick={() => onChange(cat.id)}
          >
            {cat.title}
          </button>

          {cat.id === activeCategoryId && cat.subcategories && (
            <ul className={styles.subList}>
              {cat.subcategories.map((sub: any) => (
                <li key={sub.id}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={sub.id === activeSubId}
                      onChange={() => onChange(cat.id, sub.id)}
                    />
                    <span>{sub.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  );
}
