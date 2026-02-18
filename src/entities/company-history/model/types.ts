/** Raw API item from GET /company-histories */
export interface CompanyHistoryApiItem {
    id: number;
    year: string;
    title: string;
    desc: string;
    img: string;
    photos?: string[];
    created_at?: string;
}

export interface CompanyHistoriesResponse {
    data: CompanyHistoryApiItem[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface CompanyHistoryParams {
    page?: number;
    limit?: number;
}

/** Mapped history item for CompanyHistory widget */
export interface CompanyHistoryItem {
    id: number;
    year: string;
    title: string;
    description: string;
    image: string;
}
