export interface LocalizedString {
  en?: string;
  uz?: string;
  ru?: string;
}

export interface SiteInfo {
  title: LocalizedString;
  logo: string | null;
  logo_dark: string | null;
  desc: LocalizedString;
  address: LocalizedString;
  phone_number: string;
  email: string;
  work_time: LocalizedString;
  map: string | null;
  exchange: string | null;
  favicon: string | null;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  completed_projects: string;
  years_of_experience: string;
  investment_profit: string;
}

export interface SiteInfoResponse {
  data: SiteInfo;
}
