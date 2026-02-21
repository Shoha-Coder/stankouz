import { api } from "@/shared/lib/api/api-client";
import type { Banner, BannersResponse } from "../model/types";

const BANNERS_ENDPOINT = "/banners";

export async function getBanners(page = "home"): Promise<Banner[]> {
    const { data } = await api.get<BannersResponse>(BANNERS_ENDPOINT);
    const items = data?.data;
    return items ? items.filter((b) => b.page === page) : [];
}
