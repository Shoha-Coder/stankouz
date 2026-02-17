import type { PostApiItem, Post, PostDetail } from "./types";
import { resolveApiImageUrl, resolveHtmlImageUrls } from "@/shared/lib/api-image-url";

const DEFAULT_POST_IMAGE = "/images/new1.png";

/** Resolve image URL; use default only when backend sent no image. */
function resolveImage(url: string | null | undefined): string {
    if (!url?.trim()) return DEFAULT_POST_IMAGE;
    const resolved = resolveApiImageUrl(url);
    return resolved || url.trim();
}

/** Extract image from API: prefers images[0] (lg/md/sm), fallback to image. */
function getImageFromApi(api: PostApiItem): { src: string; srcSet?: string; sizes?: string } {
    const first = api.images?.[0];
    if (first) {
        const sm = resolveApiImageUrl(first.sm) || first.sm;
        const md = resolveApiImageUrl(first.md) || first.md;
        const lg = resolveApiImageUrl(first.lg) || first.lg;
        return {
            src: lg,
            srcSet: `${sm} 200w, ${md} 600w, ${lg} 1200w`,
            sizes: "(max-width: 640px) 200px, (max-width: 1024px) 600px, 1200px",
        };
    }
    return { src: resolveImage(api.image) };
}

function stripHtml(html: string): string {
    if (!html?.trim()) return "";
    return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

/** Extract paragraphs from HTML, preserving inner tags (strong, em, a, etc.) */
function htmlToParagraphs(html: string): string[] {
    if (!html?.trim()) return [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    const matches = [...html.matchAll(pRegex)];
    const paragraphs = matches
        .map((m) => m[1].replace(/&nbsp;/g, " ").trim())
        .filter(Boolean);
    return paragraphs.length > 0 ? paragraphs : [stripHtml(html) || html.trim()];
}

function formatDate(dateStr: string): string {
    if (!dateStr) return "";
    try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("uz-UZ");
    } catch {
        return dateStr;
    }
}

export function toPost(api: PostApiItem): Post {
    const img = getImageFromApi(api);
    return {
        id: api.id,
        title: api.title,
        subtitle: api.subtitle,
        image: img.src,
        date: formatDate(api.date),
        slug: api.slug,
        createdAt: api.created_at ?? api.date ?? "",
    };
}

export function toPostDetail(api: PostApiItem): PostDetail {
    const rawDesc = api.desc ?? "";
    const description = stripHtml(rawDesc);
    const content = htmlToParagraphs(resolveHtmlImageUrls(rawDesc));
    const img = getImageFromApi(api);
    return {
        id: api.id,
        title: api.title,
        subtitle: api.subtitle,
        description,
        content: content.length > 0 ? content : (description ? [description] : []),
        image: img.src,
        imageSrcSet: img.srcSet,
        imageSizes: img.sizes,
        date: formatDate(api.date),
        slug: api.slug,
        viewsCount: api.views_count ?? 0,
        createdAt: api.created_at ?? api.date ?? "",
    };
}
