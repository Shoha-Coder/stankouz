"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import ChevronRight from "@/shared/ui/icons/chevron-right";
import FilterIcon from "@/shared/ui/icons/filter";
import styles from "./catalog-filter.module.scss";
import { Category, SubCategory } from "@/entities/category/model/types";
import { useTranslations } from "next-intl";
import { useCategories } from "@/entities/category/model/useCategories";

export type Selection = { categoryId: number; subcategoryId?: number };

interface Props {
    onChange: (selections: Selection[]) => void;
}

function FilterContent({
    categories,
    selectedKey,
    onSelect,
    tAll,
}: {
    categories: Category[];
    selectedKey: string | null;
    onSelect: (key: string) => void;
    tAll: string;
}) {
    const handleClick = useCallback(
        (key: string) => {
            onSelect(selectedKey === key ? "" : key);
        },
        [selectedKey, onSelect]
    );

    return (
        <>
            {categories.map((cat: Category) => (
                <div key={cat.id} className={styles.category}>
                    {cat.children.length === 0 ? (
                        <button
                            type="button"
                            className={`${styles.selectItem} ${selectedKey === `${cat.id}-0` ? styles.selectItemActive : ""}`}
                            onClick={() => handleClick(`${cat.id}-0`)}
                        >
                            {cat.name}
                        </button>
                    ) : (
                        <>
                            <div className={styles.categoryName}>
                                <span>{cat.name}</span>
                            </div>
                            <div className={styles.subs}>
                                <button
                                    type="button"
                                    className={`${styles.selectItem} ${selectedKey === `${cat.id}-0` ? styles.selectItemActive : ""}`}
                                    onClick={() => handleClick(`${cat.id}-0`)}
                                >
                                    {tAll}
                                </button>
                                {cat.children.map((sub: SubCategory) => {
                                    const key = `${cat.id}-${sub.id}`;
                                    return (
                                        <button
                                            key={sub.id}
                                            type="button"
                                            className={`${styles.selectItem} ${selectedKey === key ? styles.selectItemActive : ""}`}
                                            onClick={() => handleClick(key)}
                                        >
                                            {sub.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

export const CatalogFilter = ({ onChange }: Props) => {
    const t = useTranslations("catalog");
    const { data: catalogCategories = [] } = useCategories();
    const categories = catalogCategories.filter(c => c.slug !== "stanki").filter(c => c.slug !== "laboratoriia");
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const handleSelect = useCallback(
        (key: string) => {
            setSelectedKey(key || null);
            if (!key) {
                onChange([]);
                return;
            }
            const [cId, sId] = key.split("-").map(Number);
            onChange([{ categoryId: cId, subcategoryId: sId === 0 ? undefined : sId }]);
        },
        [onChange]
    );

    const handleClear = useCallback(() => {
        setSelectedKey(null);
        onChange([]);
    }, [onChange]);

    const handleApply = useCallback(() => {
        setMobileOpen(false);
    }, []);

    const handleRemoveChip = useCallback(() => {
        setSelectedKey(null);
        onChange([]);
    }, [onChange]);

    const selectedLabel = selectedKey
        ? (() => {
              const [catId, subId] = selectedKey.split("-").map(Number);
              const cat = categories.find((c) => c.id === catId);
              if (!cat) return null;
              if (subId === 0) return cat.name;
              const sub = cat.children.find((s) => s.id === subId);
              return sub ? sub.name : cat.name;
          })()
        : null;

    return (
        <div className={styles.wrapper}>
            {/* Desktop sidebar */}
            <aside className={styles.sidebar}>
                <h2>{t("categories")}</h2>
                <FilterContent
                    categories={categories}
                    selectedKey={selectedKey}
                    onSelect={handleSelect}
                    tAll={t("all")}
                />
                <div className={styles.sheetActions}>
                    <button type="button" className={styles.btnClear} onClick={handleClear}>
                        {t("clear")}
                    </button>
                    <button type="button" className={styles.btnApply} onClick={handleApply}>
                        {t("apply")}
                    </button>
                </div>
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

            {/* Mobile selected filter chip */}
            {selectedLabel && (
                <div className={styles.chips}>
                    <span className={styles.chip}>
                        {selectedLabel}
                        <button
                            type="button"
                            className={styles.chipRemove}
                            onClick={handleRemoveChip}
                            aria-label={t("removeFilter", { name: selectedLabel })}
                        >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </span>
                </div>
            )}

            {/* Mobile bottom sheet - portal to body so it appears above navbar */}
            {mobileOpen &&
                typeof document !== "undefined" &&
                createPortal(
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
                                    selectedKey={selectedKey}
                                    onSelect={handleSelect}
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
                    </>,
                    document.body
                )}
        </div>
    );
};