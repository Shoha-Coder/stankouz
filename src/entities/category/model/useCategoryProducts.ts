import { useQuery } from "@tanstack/react-query";
import { getCategoryProducts } from "../api/category.service";

const CATEGORY_PRODUCTS_QUERY_KEY = ["category-products"] as const;

export interface UseCategoryProductsParams {
    categoryId: number | null | undefined;
    subcategoryId?: number | null;
    limit?: number;
}

export function useCategoryProducts(params: UseCategoryProductsParams) {
    const { categoryId, subcategoryId, limit = 6 } = params;
    const enabled = typeof categoryId === "number" && categoryId > 0;

    return useQuery({
        queryKey: [...CATEGORY_PRODUCTS_QUERY_KEY, categoryId, subcategoryId ?? null, limit],
        queryFn: () =>
            getCategoryProducts({
                categoryId: categoryId!,
                subcategoryId: subcategoryId ?? undefined,
                limit,
            }),
        enabled,
        staleTime: 1000 * 60 * 5,
    });
}
