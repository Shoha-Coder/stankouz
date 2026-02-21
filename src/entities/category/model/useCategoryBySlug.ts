import { useQuery } from "@tanstack/react-query";
import { getCategoryBySlug } from "../api/category.service";

const CATEGORY_BY_SLUG_QUERY_KEY = ["category-by-slug"] as const;

export function useCategoryBySlug(slug: string | null | undefined) {
    const enabled = Boolean(slug?.trim());

    return useQuery({
        queryKey: [...CATEGORY_BY_SLUG_QUERY_KEY, slug ?? ""],
        queryFn: () => getCategoryBySlug(slug!),
        enabled,
        staleTime: 1000 * 60 * 5,
    });
}
