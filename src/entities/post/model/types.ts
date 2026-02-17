/** API image variants (by slug/detail endpoint) */
export interface PostApiImages {
    lg: string;
    md: string;
    sm: string;
}

/** Raw API item from GET /posts - matches backend response exactly */
export interface PostApiItem {
    id: number;
    title: string;
    subtitle: string;
    desc: string;
    slug: string;
    date: string;
    views_count: number;
    /** Legacy: single image URL (list endpoint) */
    image?: string;
    /** Detail endpoint: responsive image variants */
    images?: PostApiImages[];
    categories: unknown[];
    tags: unknown[];
    created_at: string;
}

export interface PostsResponseMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PostsResponseLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface PostsResponse {
    data: PostApiItem[];
    meta: PostsResponseMeta;
    links: PostsResponseLinks;
}

export interface PostParams {
    page?: number;
}

/** Mapped post for list/card display */
export interface Post {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    date: string;
    slug: string;
    createdAt: string;
}

/** Mapped post for detail page */
export interface PostDetail {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    content: string[];
    image: string;
    imageSrcSet?: string;
    imageSizes?: string;
    date: string;
    slug: string;
    viewsCount: number;
    createdAt: string;
}
