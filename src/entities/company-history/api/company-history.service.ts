import { api } from "@/shared/lib/api/api-client";
import type {
    CompanyHistoryApiItem,
    CompanyHistoriesResponse,
    CompanyHistoryItem,
    CompanyHistoryParams,
} from "../model/types";
import { toCompanyHistory } from "../model/mappers";

const COMPANY_HISTORIES_ENDPOINT = "/company-histories";

export interface CompanyHistoriesResult {
    data: CompanyHistoryItem[];
    total: number;
}

export async function getCompanyHistories(
    params?: CompanyHistoryParams,
    locale?: string
): Promise<CompanyHistoriesResult> {
    const { data } = await api.get<CompanyHistoriesResponse>(
        COMPANY_HISTORIES_ENDPOINT,
        {
            params: {
                page: params?.page ?? 1,
                limit: params?.limit ?? 12,
            },
            headers: locale ? { "Accept-Language": locale } : undefined,
        }
    );
    const raw = data?.data;
    return {
        data: raw ? raw.map((item: CompanyHistoryApiItem) => toCompanyHistory(item)) : [],
        total: data?.meta?.total ?? (raw?.length ?? 0),
    };
}
