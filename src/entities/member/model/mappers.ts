import type { MemberApiItem, Member } from "./types";
import { resolveApiImageUrl } from "@/shared/lib/api-image-url";
import { buildSrcSet, getFallbackImage } from "@/shared/lib/responsive-images";

function resolveImages(images?: MemberApiItem["images"]) {
    if (!images) return { src: "", srcSet: undefined };
    const resolved = {
        lg: resolveApiImageUrl(images.lg),
        md: resolveApiImageUrl(images.md),
        sm: resolveApiImageUrl(images.sm),
    };
    const src = getFallbackImage(resolved) || "";
    const srcSet = buildSrcSet(resolved);
    return { src, srcSet };
}

export function toMember(api: MemberApiItem): Member {
    const { src, srcSet } = resolveImages(api.images);
    return {
        id: api.id,
        name: api.name,
        position: api.position,
        image: src,
        srcSet: srcSet || undefined,
    };
}
