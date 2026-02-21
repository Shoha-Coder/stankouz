import { api } from "@/shared/lib/api/api-client";
import type { Category, CategoryApiItem, SubCategory } from "../model/types";
import { getProducts } from "@/entities/product/api/product.service";
import type { Product } from "@/entities/product/model/types";

const CATEGORIES_ENDPOINT = "/categories/products";
const DEFAULT_CATEGORY_PRODUCTS_LIMIT = 15;

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
    const items = data?.data;
    return items ? buildCategoryTree(items) : [];
}

export async function getCategoryBySlug(slug: string): Promise<CategoryApiItem | null> {
    const { data } = await api.get<CategoryApiItem | { data: CategoryApiItem }>(
        `${CATEGORIES_ENDPOINT}/${slug}`
    );
    if (!data) return null;
    return "data" in data ? data.data : data;
}

export interface CategoryProductsParams {
    categoryId: number;
    subcategoryId?: number;
    limit?: number;
}

export async function getCategoryProducts(
    params: CategoryProductsParams
): Promise<Product[]> {
    const { categoryId, subcategoryId, limit = DEFAULT_CATEGORY_PRODUCTS_LIMIT } = params;
    const result = await getProducts({
        category_id: categoryId,
        subcategory_id: subcategoryId,
        page: 1,
    });
    return (result.data ?? []).slice(0, limit);
}
