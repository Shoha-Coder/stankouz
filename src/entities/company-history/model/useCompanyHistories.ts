import { useQuery } from "@tanstack/react-query";
import { getCompanyHistories } from "../api/company-history.service";
import type { CompanyHistoryParams } from "./types";

const COMPANY_HISTORIES_QUERY_KEY = ["company-histories"] as const;

export function useCompanyHistories(
    params?: CompanyHistoryParams,
    locale?: string
) {
    return useQuery({
        queryKey: [
            ...COMPANY_HISTORIES_QUERY_KEY,
            params?.page,
            params?.limit,
            locale,
        ],
        queryFn: () => getCompanyHistories(params, locale),
        staleTime: 1000 * 60 * 5,
    });
}
