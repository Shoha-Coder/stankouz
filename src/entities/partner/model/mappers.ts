import type { Partner } from "./types";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import type { ResponsiveImages } from "@/shared/lib/responsive-images";

export interface PartnerCarouselItem {
    id: number;
    logo: string;
    images: ResponsiveImages;
    alt: string;
    link?: string;
}

export function toCarouselItems(partners: Partner[]): PartnerCarouselItem[] {
    return partners.map((p) => ({
        id: p.id,
        logo: getFallbackImage(p.images) || "",
        images: p.images ?? { lg: null, md: null, sm: null },
        alt: p.title ?? "",
        link: p.link?.trim() || undefined,
    }));
}
