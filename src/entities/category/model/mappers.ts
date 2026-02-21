import type { Category } from "./types";
import type { CatalogCategory, CatalogSubcategory } from "@/widgets/header/model/nav-config";

/** Format for CatalogFilters sidebar (id, title, subcategories) */
export interface CatalogFilterItem {
    id: number;
    title: string;
    subcategories?: { id: number; title: string }[];
}

export function toCatalogFiltersFormat(categories: Category[]): CatalogFilterItem[] {
    return categories.map((cat) => ({
        id: cat.id,
        title: cat.name,
        subcategories: cat.children.map((sub) => ({
            id: sub.id,
            title: sub.name,
        })),
    }));
}

/** Map Category tree to CatalogCategory for navbar dropdown */
export function toCatalogCategories(categories: Category[]): CatalogCategory[] {
    return categories.map((cat) => ({
        id: String(cat.id),
        title: cat.name,
        subcategories: cat.children.map((sub) => ({
            id: String(sub.id),
            title: sub.name,
            categoryId: String(cat.id),
            products: [
                {
                    id: `view-${sub.id}`,
                    title: sub.name,
                    href: `machines?category=${cat.id}&sub=${sub.id}`,
                },
            ] as { id: string; title: string; href: string }[],
        })) as CatalogSubcategory[],
    }));
}
