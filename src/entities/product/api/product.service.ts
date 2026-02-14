import { api } from "@/shared/lib/api/api-client";
import { ProductResponse, ProductParams, ProductDetail, Product } from "../model/types";

export const getProducts = async (params?: ProductParams) => {
    const { data } = await api.get<ProductResponse>("/products", { params });

    return data;
};

export const getProductById = async (id: string | number): Promise<ProductDetail> => {
    const { data } = await api.get<{ data: ProductDetail } | ProductDetail>(`/products/${id}`);
    const raw = "data" in data ? data.data : data;

    if ("images" in raw && Array.isArray(raw.images)) {
        return raw as ProductDetail;
    }

    if ("image" in raw && typeof raw.image === "string") {
        const p = raw as unknown as Product;
        return {
            id: p.id,
            title: p.title,
            description: "",
            images: [p.image],
            features: [],
        };
    }

    return raw as ProductDetail;
};
