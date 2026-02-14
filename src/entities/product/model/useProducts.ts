import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product.service";

export const useProducts = (params: {
    category?: number;
    page?: number;
    search?: string;
}) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
        staleTime: 1000 * 60 * 60 * 24,
    });
};