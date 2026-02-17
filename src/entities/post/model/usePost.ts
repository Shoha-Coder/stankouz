import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "../api/post.service";

const POST_QUERY_KEY = ["post"] as const;

export function usePost(slug: string | undefined) {
    return useQuery({
        queryKey: [...POST_QUERY_KEY, slug],
        queryFn: () => getPostBySlug(slug!),
        enabled: Boolean(slug),
        staleTime: 1000 * 60 * 5,
    });
}
