import { api } from "@/shared/lib/api/api-client";
import type {
    ProductApiItem,
    ProductResponse,
    ProductParams,
    Product,
    ProductDetail,
} from "../model/types";
import { toProduct, toProductDetail } from "../model/mappers";

const PRODUCTS_ENDPOINT = "/products";

export async function getProducts(params?: ProductParams) {
    const { data } = await api.get<ProductResponse>(PRODUCTS_ENDPOINT, { params });
    const items = (data?.data ?? []).map(toProduct);
    return {
        data: items,
        meta: data?.meta ?? { current_page: 1, last_page: 1, per_page: 12, total: 0 },
        links: data?.links ?? { first: "", last: "", prev: null, next: null },
    };
}

export async function getProductBySlug(slug: string, locale?: string): Promise<ProductDetail> {
    const { data } = await api.get<{ data: ProductApiItem } | ProductApiItem>(
        `${PRODUCTS_ENDPOINT}/${slug}`
    );
    const raw = data && typeof data === "object" && "data" in data ? data.data : data;
    if (!raw || typeof raw !== "object") throw new Error("Product not found");
    return toProductDetail(raw as ProductApiItem, locale);
}
