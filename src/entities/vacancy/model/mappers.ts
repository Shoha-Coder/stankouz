import type { VacancyApiItem, Vacancy, VacancyDetail } from "./types";
import { resolveHtmlImageUrls } from "@/shared/lib/api-image-url";

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

function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "";
    try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("uz-UZ");
    } catch {
        return dateStr ?? "";
    }
}

export function toVacancy(api: VacancyApiItem): Vacancy {
    const description = stripHtml(api.desc);
    return {
        id: api.id,
        title: api.title,
        description: description || api.title,
        date: formatDate(api.date),
        slug: api.slug,
    };
}

export function toVacancyDetail(api: VacancyApiItem): VacancyDetail {
    const rawDesc = api.desc ?? "";
    const description = stripHtml(rawDesc);
    const content = htmlToParagraphs(resolveHtmlImageUrls(rawDesc));
    return {
        id: api.id,
        title: api.title,
        description: description || api.title,
        content: content.length > 0 ? content : (description ? [description] : []),
        date: formatDate(api.date),
        slug: api.slug,
        viewsCount: api.views_count ?? 0,
    };
}
