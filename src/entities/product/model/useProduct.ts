import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../api/product.service";

const PRODUCT_QUERY_KEY = ["product"] as const;

export function useProduct(slug: string | undefined, locale?: string) {
    return useQuery({
        queryKey: [...PRODUCT_QUERY_KEY, slug, locale],
        queryFn: () => getProductBySlug(slug!, locale),
        enabled: Boolean(slug),
        staleTime: 1000 * 60 * 5,
    });
}
