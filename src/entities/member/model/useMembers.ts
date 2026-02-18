import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/member.service";
import type { MemberParams } from "./types";

const MEMBERS_QUERY_KEY = ["members"] as const;

export function useMembers(params?: MemberParams, locale?: string) {
    return useQuery({
        queryKey: [...MEMBERS_QUERY_KEY, params?.page, params?.limit, locale],
        queryFn: () => getMembers(params, locale),
        staleTime: 1000 * 60 * 5,
    });
}
