import type { ProductApiItem, Product, ProductDetail, ProductFeature } from "./types";
import { resolveApiImageUrl } from "@/shared/lib/api-image-url";
import { getFallbackImage } from "@/shared/lib/responsive-images";

const DEFAULT_PRODUCT_IMAGE = "/images/product1.png";
const LOCALE_FALLBACK_ORDER = ["uz", "ru", "en"] as const;

function stripHtml(html: string): string {
    if (!html?.trim()) return "";
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function getMainImageUrl(api: ProductApiItem): string {
    if (api.main_image) {
        const resolved = resolveApiImageUrl(api.main_image);
        return resolved || DEFAULT_PRODUCT_IMAGE;
    }
    const first = api.images?.[0];
    if (first) {
        const url = getFallbackImage(first);
        return url || DEFAULT_PRODUCT_IMAGE;
    }
    return DEFAULT_PRODUCT_IMAGE;
}

function getImageUrls(api: ProductApiItem): string[] {
    const urls: string[] = [];
    for (const img of api.images ?? []) {
        const url = getFallbackImage(img);
        if (url) urls.push(url);
    }
    if (urls.length > 0) return urls;
    const main = getMainImageUrl(api);
    return main !== DEFAULT_PRODUCT_IMAGE ? [main] : [DEFAULT_PRODUCT_IMAGE];
}

function getCharacteristicsForLocale(
    characteristics: ProductApiItem["characteristics"],
    locale: string
): ProductFeature[] {
    if (!characteristics || typeof characteristics !== "object") return [];
    const keysToTry = [locale, ...LOCALE_FALLBACK_ORDER].filter((k, i, arr) => arr.indexOf(k) === i);
    for (const key of keysToTry) {
        const items = characteristics[key as keyof typeof characteristics];
        if (!Array.isArray(items) || items.length === 0) continue;
        const valid = items
            .filter((item): item is { name: string; value: string } =>
                item != null && item.name != null && item.value != null && String(item.name).trim() !== "" && String(item.value).trim() !== ""
            )
            .map((item) => ({ name: String(item.name), value: String(item.value) }));
        if (valid.length > 0) return valid;
    }
    return [];
}

export function toProduct(api: ProductApiItem): Product {
    const categoryLabel = api.categories?.[0]?.name ?? "";
    const description = stripHtml(api.desc ?? "").slice(0, 120);
    return {
        id: api.id,
        title: api.title,
        image: getMainImageUrl(api),
        slug: api.slug,
        categoryLabel,
        description: description || undefined,
    };
}

export function toProductDetail(api: ProductApiItem, locale?: string): ProductDetail {
    return {
        id: api.id,
        title: api.title,
        description: stripHtml(api.desc ?? ""),
        images: getImageUrls(api),
        features: getCharacteristicsForLocale(api.characteristics, locale ?? "uz"),
    };
}
