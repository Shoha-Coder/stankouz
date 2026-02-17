/** Common API image format: lg (large), md (medium), sm (small) */
export interface ResponsiveImages {
    lg: string | null;
    md: string | null;
    sm: string | null;
}

export interface SrcSetOptions {
    /** Width descriptors for sm, md, lg (default: 200, 600, 1000) */
    widths?: { sm?: number; md?: number; lg?: number };
}

const DEFAULT_WIDTHS = { sm: 200, md: 600, lg: 1000 };

/**
 * Build a srcSet string from responsive images.
 * @returns e.g. "https://.../sm.jpg 200w, https://.../md.jpg 600w, https://.../lg.jpg 1000w"
 */
export function buildSrcSet(
    images: ResponsiveImages | null | undefined,
    options?: SrcSetOptions
): string | undefined {
    if (!images) return undefined;
    const { sm, md, lg } = { ...DEFAULT_WIDTHS, ...options?.widths };
    const parts: string[] = [];
    if (images.sm) parts.push(`${images.sm} ${sm}w`);
    if (images.md) parts.push(`${images.md} ${md}w`);
    if (images.lg) parts.push(`${images.lg} ${lg}w`);
    return parts.length > 0 ? parts.join(", ") : undefined;
}

/**
 * Get fallback image URL (prefers lg > md > sm).
 */
export function getFallbackImage(images: ResponsiveImages | null | undefined): string {
    const url = images?.lg ?? images?.md ?? images?.sm;
    return url ?? "";
}
