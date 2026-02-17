/** Raw API response item from /categories/products */
export interface CategoryApiItem {
    id: number;
    name: string | null;
    desc: string | null;
    slug: string;
    parent_id: number | null;
    in_main: number;
    view: number;
    images: {
        lg: string | null;
        md: string | null;
        sm: string | null;
    };
}

/** Tree node for catalog filter (sidebar, mobile sheet) */
export interface SubCategory {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    children: SubCategory[];
}
