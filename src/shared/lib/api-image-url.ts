/**
 * Base URL for API-hosted images (API URL without /api path).
 * e.g. https://example.com/api -> https://example.com
 */
const IMAGE_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "")
    .replace(/\/api\/?$/, "")
    .replace(/\/$/, "");

/**
 * Resolves an image URL from the API.
 * - Absolute URLs (http/https) are returned as-is.
 * - Relative URLs (starting with /) are prefixed with the API base domain.
 * - Empty/null/undefined returns empty string.
 */
export function resolveApiImageUrl(url: string | null | undefined): string {
    if (!url?.trim()) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }
    if (trimmed.startsWith("/") && IMAGE_BASE) {
        return `${IMAGE_BASE}${trimmed}`;
    }
    if (IMAGE_BASE && !trimmed.startsWith("http")) {
        return `${IMAGE_BASE}/${trimmed.replace(/^\//, "")}`;
    }
    return trimmed;
}

/**
 * Resolves all img src URLs in HTML content for API-hosted images.
 * Use for HTML rendered via dangerouslySetInnerHTML (e.g. post body).
 */
export function resolveHtmlImageUrls(html: string): string {
    if (!html?.trim()) return html ?? "";
    return html.replace(
        /(<img\b[^>]*)src=(["'])([^"']+)\2/gi,
        (_, before, quote, src) =>
            `${before}src=${quote}${resolveApiImageUrl(src)}${quote}`
    );
}
