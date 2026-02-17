import { useQuery } from "@tanstack/react-query";
import { getVacancies } from "../api/vacancy.service";

const VACANCIES_QUERY_KEY = ["vacancies"] as const;

export function useVacancies() {
    return useQuery({
        queryKey: VACANCIES_QUERY_KEY,
        queryFn: getVacancies,
        staleTime: 1000 * 60 * 5,
    });
}
