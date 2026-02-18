import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "../api/certificate.service";
import type { CertificateParams } from "./types";

const CERTIFICATES_QUERY_KEY = ["certificates"] as const;

export function useCertificates(params?: CertificateParams, locale?: string) {
    return useQuery({
        queryKey: [...CERTIFICATES_QUERY_KEY, params?.page, params?.limit, locale],
        queryFn: () => getCertificates(params, locale),
        staleTime: 1000 * 60 * 5,
    });
}
