import { useQuery } from "@tanstack/react-query";
import { getVacancyBySlug } from "../api/vacancy.service";

const VACANCY_QUERY_KEY = ["vacancy"] as const;

export function useVacancy(slug: string | undefined) {
    return useQuery({
        queryKey: [...VACANCY_QUERY_KEY, slug],
        queryFn: () => getVacancyBySlug(slug!),
        enabled: Boolean(slug),
        staleTime: 1000 * 60 * 5,
    });
}
