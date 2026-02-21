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
  /** Optional video URL (mp4, webm, etc.) for hero background */
  video?: string;
}

export interface BannersResponse {
  data: Banner[];
  meta: { total: number };
}
