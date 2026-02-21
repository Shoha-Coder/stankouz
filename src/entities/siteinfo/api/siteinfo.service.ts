import { api } from "@/shared/lib/api/api-client";
import type { SiteInfo, SiteInfoResponse } from "../model/types";

const SITEINFO_ENDPOINT = "/siteinfo";

function getLocalized(
  obj: Record<string, string> | null | undefined,
  locale: string
): string {
  if (!obj || typeof obj !== "object") return "";
  const key = locale in obj ? locale : "en" in obj ? "en" : "ru" in obj ? "ru" : "uz";
  return obj[key] ?? Object.values(obj)[0] ?? "";
}

export async function getSiteInfo(locale?: string): Promise<SiteInfo | null> {
  const { data } = await api.get<SiteInfoResponse>(SITEINFO_ENDPOINT, {
    headers: locale ? { "Accept-Language": locale } : undefined,
  });
  return data?.data ?? null;
}

export function getLocalizedSiteInfo(
  siteInfo: SiteInfo | null | undefined,
  locale: string
) {
  if (!siteInfo) return null;
  return {
    title: getLocalized(siteInfo.title as unknown as Record<string, string>, locale),
    desc: getLocalized(siteInfo.desc as unknown as Record<string, string>, locale),
    address: getLocalized(siteInfo.address as unknown as Record<string, string>, locale),
    work_time: getLocalized(siteInfo.work_time as unknown as Record<string, string>, locale),
    completed_projects: siteInfo.completed_projects ?? "",
    years_of_experience: siteInfo.years_of_experience ?? "",
    investment_profit: siteInfo.investment_profit ?? "",
    phone_number: siteInfo.phone_number ?? "",
    email: siteInfo.email ?? "",
    map: siteInfo.map,
  };
}
