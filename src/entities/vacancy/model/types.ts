/** API image variants (vacancies use object, not array) */
export interface VacancyApiImages {
    lg: string | null;
    md: string | null;
    sm: string | null;
}

/** Raw API item from GET /vacancies */
export interface VacancyApiItem {
    id: number;
    title: string;
    desc: string;
    date: string | null;
    views_count: number;
    slug: string;
    images: VacancyApiImages;
}

export interface VacanciesResponse {
    data: VacancyApiItem[];
    meta: { total: number };
}

/** Mapped vacancy for list/card display */
export interface Vacancy {
    id: number;
    title: string;
    description: string;
    date: string;
    slug: string;
}

/** Mapped vacancy for detail page */
export interface VacancyDetail {
    id: number;
    title: string;
    description: string;
    content: string[];
    date: string;
    slug: string;
    viewsCount: number;
}
