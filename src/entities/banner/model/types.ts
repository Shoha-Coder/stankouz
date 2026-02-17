export interface BannerImages {
  lg: string | null;
  md: string | null;
  sm: string | null;
}

export interface Banner {
  id: number;
  title: string;
  desc: string;
  url: string;
  page: string;
  images: BannerImages;
}

export interface BannersResponse {
  data: Banner[];
  meta: { total: number };
}
