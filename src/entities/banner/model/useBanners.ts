import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../api/banner.service";

const BANNERS_QUERY_KEY = ["banners"] as const;

export function useBanners(page = "home") {
    return useQuery({
        queryKey: [...BANNERS_QUERY_KEY, page],
        queryFn: () => getBanners(page),
        staleTime: 1000 * 60 * 5,
    });
}
