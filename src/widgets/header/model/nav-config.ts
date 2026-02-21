export type NavItem = {
  /** Translation key under header.nav (e.g. 'catalog', 'about') */
  labelKey: string;
  href: string;
  hasDropdown?: boolean;
};

export type CatalogProduct = {
  id: string;
  title: string;
  href: string;
};

export type CatalogSubcategory = {
  id: string;
  title: string;
  categoryId: string;
  products: CatalogProduct[];
};

export type CatalogCategory = {
  id: string;
  title: string;
  subcategories: CatalogSubcategory[];
};

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "catalog", href: "#", hasDropdown: true },
  { labelKey: "about", href: "about" },
  { labelKey: "labs", href: "labs" },
  { labelKey: "products", href: "products" },
  { labelKey: "machines", href: "machines" },
  { labelKey: "jobs", href: "jobs" },
  { labelKey: "news", href: "news" },
  { labelKey: "contacts", href: "contacts" },
];

