import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/service.service";

const SERVICES_QUERY_KEY = ["services"] as const;

export function useServices() {
    return useQuery({
        queryKey: SERVICES_QUERY_KEY,
        queryFn: getServices,
        staleTime: 1000 * 60 * 5,
    });
}
