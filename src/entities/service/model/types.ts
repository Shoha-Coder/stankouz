/** Raw API item from GET /services - matches backend response exactly */
export interface ServiceApiItem {
    id: number;
    title: string;
    subtitle: string;
    desc: string;
    img: string | null;
    slug: string;
}

export interface ServicesResponseMeta {
    total: number;
}

export interface ServicesResponse {
    data: ServiceApiItem[];
    meta: ServicesResponseMeta;
}

/** Mapped service for UI display */
export interface Service {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    slug: string;
}
