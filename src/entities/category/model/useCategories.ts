import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/category.service";

const CATEGORIES_QUERY_KEY = ["categories"] as const;

export const useCategories = () => {
    return useQuery({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
    });
};