import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product.service";
import type { ProductParams } from "./types";

const PRODUCTS_QUERY_KEY = ["products"] as const;

export function useProducts(params?: ProductParams) {
    const normalized = params
        ? {
              category_id: params.category_id,
              subcategory_id: params.subcategory_id,
              search: params.search?.trim() || undefined,
              page: params.page ?? 1,
          }
        : undefined;
    return useQuery({
        queryKey: [...PRODUCTS_QUERY_KEY, normalized ?? {}],
        queryFn: () => getProducts(normalized),
        staleTime: 1000 * 60 * 5,
    });
}
