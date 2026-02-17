"use client";

import { useEffect, useState, useCallback } from "react";
import ChevronRight from "@/shared/ui/icons/chevron-right";
import FilterIcon from "@/shared/ui/icons/filter";
import styles from "./catalog-filter.module.scss";
import { Category, SubCategory } from "@/entities/category/model/types";
import { useTranslations } from "next-intl";
import { useCategories } from "@/entities/category/model/useCategories";

export type Selection = { categoryId: number; subcategoryId: number };

interface Props {
    onChange: (selections: Selection[]) => void;
}

function FilterContent({
    categories,
    openIds,
    setOpenIds,
    activeSubs,
    setActiveSubs,
    onChange,
    tAll,
}: {
    categories: Category[];
    openIds: Set<number>;
    setOpenIds: React.Dispatch<React.SetStateAction<Set<number>>>;
    activeSubs: Set<string>;
    setActiveSubs: React.Dispatch<React.SetStateAction<Set<string>>>;
    onChange: (selections: Selection[]) => void;
    tAll: string;
}) {
    const handleSubChange = useCallback(
        (key: string) => {
            setActiveSubs((prev) => {
                const next = new Set(prev);
                if (next.has(key)) next.delete(key);
                else next.add(key);
                onChange(
                    Array.from(next).map((k) => {
                        const [cId, sId] = k.split("-").map(Number);
                        return { categoryId: cId, subcategoryId: sId };
                    })
                );
                return next;
            });
        },
        [onChange, setActiveSubs]
    );

    const handleBarchasi = useCallback(
        (catId: number) => {
            setActiveSubs((prev) => {
                const next = new Set(prev);
                const keysToRemove = Array.from(next).filter((k) => k.startsWith(`${catId}-`));
                keysToRemove.forEach((k) => next.delete(k));
                onChange(
                    Array.from(next).map((k) => {
                        const [cId, sId] = k.split("-").map(Number);
                        return { categoryId: cId, subcategoryId: sId };
                    })
                );
                return next;
            });
        },
        [onChange, setActiveSubs]
    );

    return (
        <>
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
                            <label className={styles.subLabel}>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={!cat.children.some((s) => activeSubs.has(`${cat.id}-${s.id}`))}
                                    onChange={() => handleBarchasi(cat.id)}
                                />
                                {tAll}
                            </label>
                            {cat.children.map((sub: SubCategory) => {
                                const key = `${cat.id}-${sub.id}`;
                                const isChecked = activeSubs.has(key);
                                return (
                                    <label key={sub.id} className={styles.subLabel}>
                                        <input
                                            className={styles.checkbox}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleSubChange(key)}
                                        />
                                        {sub.name}
                                    </label>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export const CatalogFilter = ({ onChange }: Props) => {
    const t = useTranslations("catalog");
    const { data: categories = [] } = useCategories();
    const [openIds, setOpenIds] = useState<Set<number>>(new Set());
    const [activeSubs, setActiveSubs] = useState<Set<string>>(new Set());
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (categories.length > 0 && openIds.size === 0) {
            setOpenIds(new Set([categories[0].id]));
        }
    }, [categories, openIds.size]);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleClear = useCallback(() => {
        setActiveSubs(new Set());
        onChange([]);
    }, [onChange]);

    const handleApply = useCallback(() => {
        setMobileOpen(false);
    }, []);

    const handleRemoveChip = useCallback(
        (catId: number) => {
            setActiveSubs((prev) => {
                const next = new Set(prev);
                Array.from(next)
                    .filter((k) => k.startsWith(`${catId}-`))
                    .forEach((k) => next.delete(k));
                onChange(
                    Array.from(next).map((k) => {
                        const [cId, sId] = k.split("-").map(Number);
                        return { categoryId: cId, subcategoryId: sId };
                    })
                );
                return next;
            });
        },
        [onChange]
    );

    const selectedCategoryIds = Array.from(activeSubs)
        .map((k) => parseInt(k.split("-")[0], 10))
        .filter((id, i, arr) => arr.indexOf(id) === i);
    const selectedCategories = categories.filter((c) => selectedCategoryIds.includes(c.id));

    return (
        <div className={styles.wrapper}>
            {/* Desktop sidebar */}
            <aside className={styles.sidebar}>
                <h2>{t("categories")}</h2>
                <FilterContent
                    categories={categories}
                    openIds={openIds}
                    setOpenIds={setOpenIds}
                    activeSubs={activeSubs}
                    setActiveSubs={setActiveSubs}
                    onChange={onChange}
                    tAll={t("all")}
                />
            </aside>

            {/* Mobile trigger button */}
            <button
                type="button"
                className={styles.mobileTrigger}
                onClick={() => setMobileOpen(true)}
                aria-label={t("filter")}
            >
                <FilterIcon className={styles.filterIcon} />
                <span>{t("filter")}</span>
                <ChevronRight className={styles.triggerChevron} />
            </button>

            {/* Mobile selected filter chips */}
            {selectedCategories.length > 0 && (
                <div className={styles.chips}>
                    {selectedCategories.map((cat) => (
                        <span key={cat.id} className={styles.chip}>
                            {cat.name}
                            <button
                                type="button"
                                className={styles.chipRemove}
                                onClick={() => handleRemoveChip(cat.id)}
                                aria-label={t("removeFilter", { name: cat.name })}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {/* Mobile bottom sheet */}
            {mobileOpen && (
                <>
                    <div
                        className={styles.overlay}
                        onClick={() => setMobileOpen(false)}
                        aria-hidden
                    />
                    <div className={styles.sheet} role="dialog" aria-modal="true" aria-label={t("filter")}>
                        <div className={styles.sheetHandle} />
                        <div className={styles.sheetHeader}>
                            <h2 className={styles.sheetTitle}>{t("filter")}</h2>
                            <button
                                type="button"
                                className={styles.sheetClose}
                                onClick={() => setMobileOpen(false)}
                                aria-label={t("close")}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.sheetContent}>
                            <FilterContent
                                categories={categories}
                                openIds={openIds}
                                setOpenIds={setOpenIds}
                                activeSubs={activeSubs}
                                setActiveSubs={setActiveSubs}
                                onChange={onChange}
                                tAll={t("all")}
                            />
                        </div>
                        <div className={styles.sheetActions}>
                            <button type="button" className={styles.btnClear} onClick={handleClear}>
                                {t("clear")}
                            </button>
                            <button type="button" className={styles.btnApply} onClick={handleApply}>
                                {t("apply")}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};