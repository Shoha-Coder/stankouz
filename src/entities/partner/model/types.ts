export interface PartnerImages {
    lg: string | null;
    md: string | null;
    sm: string | null;
}

export interface Partner {
    id: number;
    title: string;
    link: string;
    images: PartnerImages;
}

export interface PartnersResponse {
    data: Partner[];
    meta: { total: number };
}
