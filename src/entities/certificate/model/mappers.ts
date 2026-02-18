import type { CertificateApiItem, Certificate } from "./types";
import { resolveApiImageUrl } from "@/shared/lib/api-image-url";

export function toCertificate(api: CertificateApiItem): Certificate {
    return {
        id: api.id,
        image: resolveApiImageUrl(api.image) || api.image,
        alt: api.title || api.desc || undefined,
    };
}
