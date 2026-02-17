import type { ServiceApiItem, Service } from "./types";
import { resolveApiImageUrl } from "@/shared/lib/api-image-url";

const DEFAULT_SERVICE_IMAGE = "/images/service1.png";

function stripHtml(html: string): string {
    if (!html?.trim()) return "";
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function resolveImage(img: string | null | undefined): string {
    const resolved = resolveApiImageUrl(img ?? "");
    return resolved || DEFAULT_SERVICE_IMAGE;
}

export function toService(api: ServiceApiItem): Service {
    return {
        id: api.id,
        title: api.title,
        subtitle: api.subtitle,
        description: stripHtml(api.desc),
        image: resolveImage(api.img),
        slug: api.slug,
    };
}
