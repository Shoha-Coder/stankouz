import { useQuery } from "@tanstack/react-query";
import { getPartners } from "../api/partner.service";

const PARTNERS_QUERY_KEY = ["partners"] as const;

export function usePartners() {
    return useQuery({
        queryKey: PARTNERS_QUERY_KEY,
        queryFn: getPartners,
        staleTime: 1000 * 60 * 5,
    });
}
