import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/post.service";
import type { PostParams } from "./types";

const POSTS_QUERY_KEY = ["posts"] as const;

export function usePosts(params?: PostParams) {
    return useQuery({
        queryKey: [...POSTS_QUERY_KEY, params?.page],
        queryFn: () => getPosts(params),
        staleTime: 1000 * 60 * 5,
    });
}
