import { api } from "@/shared/lib/api/api-client";
import type {
    PostApiItem,
    PostsResponse,
    PostParams,
    Post,
    PostDetail,
} from "../model/types";
import { toPost, toPostDetail } from "../model/mappers";

const POSTS_ENDPOINT = "/posts";

export interface PostsResult {
    data: Post[];
    meta: PostsResponse["meta"];
    links: PostsResponse["links"];
}

export async function getPosts(params?: PostParams): Promise<PostsResult> {
    const { data } = await api.get<PostsResponse>(POSTS_ENDPOINT, { params });
    const raw = data?.data;
    return {
        data: raw ? raw.map(toPost) : [],
        meta: data?.meta ?? { current_page: 1, last_page: 1, per_page: 12, total: 0 },
        links: data?.links ?? { first: "", last: "", prev: null, next: null },
    };
}

export async function getPostBySlug(slug: string): Promise<PostDetail> {
    const { data } = await api.get<unknown>(`${POSTS_ENDPOINT}/${slug}`);
    const raw = extractPostFromResponse(data);
    if (!raw) throw new Error("Post not found");
    return toPostDetail(raw);
}

function extractPostFromResponse(data: unknown): PostApiItem | null {
    if (!data || typeof data !== "object") return null;
    const obj = data as Record<string, unknown>;
    if (obj.data && typeof obj.data === "object") return obj.data as PostApiItem;
    if (obj.post && typeof obj.post === "object") return obj.post as PostApiItem;
    if (obj.id != null && obj.slug != null) return obj as unknown as PostApiItem;
    return null;
}
