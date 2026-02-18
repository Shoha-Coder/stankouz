import { api } from "@/shared/lib/api/api-client";
import type {
    CertificateApiItem,
    CertificatesResponse,
    Certificate,
    CertificateParams,
} from "../model/types";
import { toCertificate } from "../model/mappers";

const CERTIFICATES_ENDPOINT = "/certificates";

export interface CertificatesResult {
    data: Certificate[];
    total: number;
}

export async function getCertificates(
    params?: CertificateParams,
    locale?: string
): Promise<CertificatesResult> {
    const { data } = await api.get<CertificatesResponse>(CERTIFICATES_ENDPOINT, {
        params: {
            page: params?.page ?? 1,
            limit: params?.limit ?? 12,
        },
        headers: locale ? { "Accept-Language": locale } : undefined,
    });
    const raw = data?.data ?? [];
    return {
        data: raw.map((item: CertificateApiItem) => toCertificate(item)),
        total: data?.meta?.total ?? raw.length,
    };
}
