export interface Product {
  id: number;
  title: string;
  ts: string;
  image: string;
}

export interface ProductFeature {
  name: string;
  value: string;
}

export interface ProductDetail {
  id: number;
  title: string;
  description: string;
  images: string[];
  features: ProductFeature[];
}

export interface ProductResponse {
  data: Product[];
  meta: {
    total: number;
    current_page: number;
    last_page: number;
  };
}

export interface ProductParams {
  category_id?: number;
  subcategory_id?: number;
  search?: string;
  page?: number;
}
