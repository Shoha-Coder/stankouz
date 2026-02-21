import { api } from "@/shared/lib/api/api-client";
import type { Service, ServiceApiItem, ServicesResponse } from "../model/types";
import { toService } from "../model/mappers";

const SERVICES_ENDPOINT = "/services";

export interface ServicesResult {
    data: Service[];
    meta: ServicesResponse["meta"];
}

export async function getServices(): Promise<ServicesResult> {
    const { data } = await api.get<ServicesResponse>(SERVICES_ENDPOINT);
    const raw = data?.data;
    return {
        data: raw ? raw.map(toService) : [],
        meta: data?.meta ?? { total: 0 },
    };
}
