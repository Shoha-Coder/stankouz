import { useInfiniteQuery } from "@tanstack/react-query";
import { getMembers } from "../api/member.service";
import type { Member } from "./types";

const MEMBERS_QUERY_KEY = ["members", "infinite"] as const;
const PER_PAGE = 8;

export function useMembersInfinite(locale?: string) {
    return useInfiniteQuery({
        queryKey: [...MEMBERS_QUERY_KEY, locale],
        queryFn: ({ pageParam }) =>
            getMembers({ page: pageParam, limit: PER_PAGE }, locale),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { currentPage, lastPage: last } = lastPage;
            if (currentPage == null || last == null) return undefined;
            return currentPage < last ? currentPage + 1 : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });
}

export function flattenMembers(data: { pages: { data: Member[] }[] } | undefined): Member[] {
    return data?.pages.flatMap((p) => p.data) ?? [];
}
