export interface MemberApiImages {
    lg?: string;
    md?: string;
    sm?: string;
}

/** Raw API item from GET /members */
export interface MemberApiItem {
    id: number;
    name: string;
    position: string;
    work_time?: string;
    phone_number?: string;
    instagram_link?: string;
    telegram_link?: string;
    linkedin_link?: string;
    facebook_link?: string;
    images?: MemberApiImages;
}

export interface MembersResponse {
    data: MemberApiItem[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface MemberParams {
    page?: number;
    limit?: number;
}

/** Mapped member for TeamGrid */
export interface Member {
    id: number;
    name: string;
    position: string;
    image: string;
    srcSet?: string;
}
