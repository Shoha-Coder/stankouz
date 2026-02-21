import { api } from "@/shared/lib/api/api-client";
import type { Partner, PartnersResponse } from "../model/types";

const PARTNERS_ENDPOINT = "/partners";

export async function getPartners(): Promise<Partner[]> {
    const { data } = await api.get<PartnersResponse>(PARTNERS_ENDPOINT);
    const items = data?.data;
    return items ? items : [];
}
