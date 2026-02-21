import { api } from "@/shared/lib/api/api-client";
import type {
    MemberApiItem,
    MembersResponse,
    Member,
    MemberParams,
} from "../model/types";
import { toMember } from "../model/mappers";

const MEMBERS_ENDPOINT = "/members";

export interface MembersResult {
    data: Member[];
    total: number;
    currentPage?: number;
    lastPage?: number;
}

export async function getMembers(
    params?: MemberParams,
    locale?: string
): Promise<MembersResult> {
    const { data } = await api.get<MembersResponse>(MEMBERS_ENDPOINT, {
        params: {
            page: params?.page ?? 1,
            limit: params?.limit ?? 12,
        },
        headers: locale ? { "Accept-Language": locale } : undefined,
    });
    const raw = data?.data;
    const meta = data?.meta;
    return {
        data: raw ? raw.map((item: MemberApiItem) => toMember(item)) : [],
        total: meta?.total ?? (raw?.length ?? 0),
        currentPage: meta?.current_page,
        lastPage: meta?.last_page,
    };
}
