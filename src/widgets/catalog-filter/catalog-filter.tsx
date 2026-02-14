"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/entities/category/api/category.service";
import ChevronRight from "@/shared/ui/icons/chevron-right";
import styles from "./catalog-filter.module.scss";
import { Category, SubCategory } from "@/entities/category/model/types";

export type Selection = { categoryId: number; subcategoryId: number };

interface Props {
    onChange: (selections: Selection[]) => void;
}

export const CatalogFilter = ({ onChange }: Props) => {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: 1,
            name: "Kategoriya 1",
            children: [
                {
                    id: 1,
                    name: "Subkategoriya 1",
                },
            ],
        },
        {
            id: 2,
            name: "Kategoriya 2",
            children: [
                {
                    id: 2,
                    name: "Subkategoriya 2",
                },
            ],
        },
    ]);
    const [openIds, setOpenIds] = useState<Set<number>>(new Set());
    const [activeSubs, setActiveSubs] = useState<Set<string>>(new Set());

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    return (
        <aside className={styles.sidebar}>
            <h2>Kategoriyalar</h2>

            {categories.map((cat: Category) => (
                <div key={cat.id} className={styles.category}>
                    <button
                        onClick={() => {
                            setOpenIds((prev) => {
                                const next = new Set(prev);
                                if (next.has(cat.id)) next.delete(cat.id);
                                else next.add(cat.id);
                                return next;
                            });
                        }}
                        className={styles.categoryTitle}
                        aria-expanded={openIds.has(cat.id)}
                    >
                        <span>{cat.name}</span>
                        <span className={`${styles.chevron} ${openIds.has(cat.id) ? styles.chevronDown : ""}`}>
                            <ChevronRight />
                        </span>
                    </button>

                    {openIds.has(cat.id) && (
                        <div className={styles.subs}>
                            {cat.children.map((sub: SubCategory) => {
                                const key = `${cat.id}-${sub.id}`;
                                const isChecked = activeSubs.has(key);
                                return (
                                    <label key={sub.id} className={styles.subLabel}>
                                        <input
                                            className={styles.checkbox}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => {
                                                const next = new Set(activeSubs);
                                                if (next.has(key)) next.delete(key);
                                                else next.add(key);
                                                setActiveSubs(next);
                                                const selections: Selection[] = Array.from(next).map((k) => {
                                                    const [cId, sId] = k.split("-").map(Number);
                                                    return { categoryId: cId, subcategoryId: sId };
                                                });
                                                onChange(selections);
                                            }}
                                        />
                                        {sub.name}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </aside>
    );
};