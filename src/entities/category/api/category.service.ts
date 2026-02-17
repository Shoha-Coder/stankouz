import { api } from "@/shared/lib/api/api-client";
import type { Category, CategoryApiItem, SubCategory } from "../model/types";

const CATEGORIES_ENDPOINT = "/categories/products";

function getDisplayName(item: CategoryApiItem): string {
    return item.name?.trim() || item.slug || String(item.id);
}

function buildCategoryTree(flat: CategoryApiItem[]): Category[] {
    const visible = flat.filter((c) => c.view === 1);
    const parents = visible.filter((c) => c.parent_id === null);
    const children = visible.filter((c) => c.parent_id !== null);

    return parents.map((parent) => {
        const childItems = children.filter((c) => c.parent_id === parent.id);
        const childSubs: SubCategory[] = childItems.map((c) => ({
            id: c.id,
            name: getDisplayName(c),
        }));
        return {
            id: parent.id,
            name: getDisplayName(parent),
            slug: parent.slug,
            children: childSubs,
        };
    });
}

export async function getCategories(): Promise<Category[]> {
    const { data } = await api.get<{ data: CategoryApiItem[] }>(CATEGORIES_ENDPOINT);
    const items = data?.data ?? [];
    return buildCategoryTree(items);
}
