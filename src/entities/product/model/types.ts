/** Raw API product from /products */
export interface ProductCategory {
    id: number;
    name: string;
}

/** Single characteristic item from API */
export interface ProductCharacteristicItem {
    name: string | null;
    value: string | null;
}

/** Characteristics keyed by locale: { en: [...], ru: [...], uz: [...] } */
export interface ProductCharacteristics {
    en?: ProductCharacteristicItem[];
    ru?: ProductCharacteristicItem[];
    uz?: ProductCharacteristicItem[];
}

/** Responsive image object from API */
export interface ProductImageItem {
    lg?: string | null;
    md?: string | null;
    sm?: string | null;
}

export interface ProductApiItem {
    id: number;
    title: string;
    desc: string;
    slug: string;
    price?: number | null;
    discount_price?: number | null;
    status?: string;
    main_image?: string;
    brand?: string | null;
    categories?: ProductCategory[];
    /** Detail response: array of responsive images */
    images?: ProductImageItem[];
    /** Detail response: characteristics by locale */
    characteristics?: ProductCharacteristics;
}

export interface ProductResponseMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ProductResponseLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface ProductResponse {
    data: ProductApiItem[];
    meta: ProductResponseMeta;
    links: ProductResponseLinks;
}

export interface ProductParams {
    category_id?: number;
    subcategory_id?: number;
    search?: string;
    page?: number;
}

/** Mapped product for list/card display */
export interface Product {
    id: number;
    title: string;
    image: string;
    slug: string;
    categoryLabel: string;
    description?: string;
}

export interface ProductFeature {
    name: string;
    value: string;
}

/** Mapped product for detail page */
export interface ProductDetail {
    id: number;
    title: string;
    description: string;
    images: string[];
    features: ProductFeature[];
}
