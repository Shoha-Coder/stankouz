import { useQuery } from "@tanstack/react-query";
import { getSiteInfo } from "../api/siteinfo.service";

const SITEINFO_QUERY_KEY = ["siteinfo"] as const;

export function useSiteInfo(locale?: string) {
  return useQuery({
    queryKey: [...SITEINFO_QUERY_KEY, locale],
    queryFn: () => getSiteInfo(locale),
    staleTime: 1000 * 60 * 10,
  });
}
