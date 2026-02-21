import { api } from "@/shared/lib/api/api-client";
import type { VacancyApiItem, VacanciesResponse, Vacancy, VacancyDetail } from "../model/types";
import { toVacancy, toVacancyDetail } from "../model/mappers";

const VACANCIES_ENDPOINT = "/vacancies";

export interface VacanciesResult {
    data: Vacancy[];
    total: number;
}

export async function getVacancies(): Promise<VacanciesResult> {
    const { data } = await api.get<VacanciesResponse>(VACANCIES_ENDPOINT);
    const raw = data?.data;
    const mapped = raw ? raw.map(toVacancy) : [];
    const uniqueBySlug = Array.from(
        new Map(mapped.map((v) => [v.slug, v])).values()
    ).sort((a, b) => b.id - a.id);
    return {
        data: mapped,
        total: data?.meta?.total,
    };
}

export async function getVacancyBySlug(slug: string): Promise<VacancyDetail> {
    const { data } = await api.get<unknown>(`${VACANCIES_ENDPOINT}/${slug}`);
    const raw = extractVacancyFromResponse(data);
    if (!raw) throw new Error("Vacancy not found");
    return toVacancyDetail(raw);
}

function extractVacancyFromResponse(data: unknown): VacancyApiItem | null {
    if (!data || typeof data !== "object") return null;
    const obj = data as Record<string, unknown>;
    if (obj.data && typeof obj.data === "object") return obj.data as VacancyApiItem;
    if (obj.vacancy && typeof obj.vacancy === "object") return obj.vacancy as VacancyApiItem;
    if (obj.id != null && obj.slug != null) return obj as unknown as VacancyApiItem;
    return null;
}
