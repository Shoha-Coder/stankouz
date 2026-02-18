import type { CompanyHistoryApiItem, CompanyHistoryItem } from "./types";
import { resolveApiImageUrl } from "@/shared/lib/api-image-url";

export function toCompanyHistory(api: CompanyHistoryApiItem): CompanyHistoryItem {
    return {
        id: api.id,
        year: api.year,
        title: api.title,
        description: api.desc ?? "",
        image: resolveApiImageUrl(api.img) || "",
    };
}
