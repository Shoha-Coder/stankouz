export interface NewsItem {
    id: number;
    title: string;
    date: string;
    slug: string;
}

export interface NewsArticle {
    id: number;
    title: string;
    date: string;
    image: string;
    imageSrcSet?: string;
    imageSizes?: string;
    content: string[];
    tags?: string[];
}
