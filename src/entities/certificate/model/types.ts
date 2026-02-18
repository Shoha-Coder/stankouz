/** Raw API item from GET /certificates */
export interface CertificateApiItem {
    id: number;
    title: string;
    desc: string;
    image: string;
}

export interface CertificatesResponse {
    data: CertificateApiItem[];
    meta: { total: number };
}

export interface CertificateParams {
    page?: number;
    limit?: number;
}

/** Mapped certificate for carousel/preview */
export interface Certificate {
    id: number;
    image: string;
    alt?: string;
}
