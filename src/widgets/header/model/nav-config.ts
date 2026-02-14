export type NavItem = {
  label: string;
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
  products: CatalogProduct[];
};

export type CatalogCategory = {
  id: string;
  title: string;
  subcategories: CatalogSubcategory[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Katalog", href: "#", hasDropdown: true },
  { label: "Biz haqimizda", href: "about" },
  { label: "Laboratoriya", href: "labs" },
  { label: "Stanoklar", href: "products" },
  { label: "Mahsulotlar", href: "machines" },
  { label: "Ish o'rinlari", href: "jobs" },
  { label: "Yangiliklar", href: "news" },
  { label: "Aloqa", href: "contacts" },
];

const SAMPLE_PRODUCT = "Насосный агрегат Уз СЭ 2500-180";

export const CATALOG_DATA: CatalogCategory[] = [
  {
    id: "cat-1",
    title: "Kategoriya nomi",
    subcategories: [
      {
        id: "sub-1-1",
        title: "Subkategoriya 1",
        products: Array.from({ length: 9 }, (_, i) => ({
          id: `p-1-1-${i + 1}`,
          title: `Mahsulot ${i + 1}`,
          href: "machines",
        })),
      },
      {
        id: "sub-1-2",
        title: "Subkategoriya 2",
        products: Array.from({ length: 5 }, (_, i) => ({
          id: `p-1-2-${i + 1}`,
          title: SAMPLE_PRODUCT,
          href: "machines",
        })),
      },
    ],
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `cat-${i + 2}`,
    title: `Kategoriya ${i + 2}`,
    subcategories: [
      {
        id: `sub-${i + 2}-1`,
        title: `Subkategoriya 1`,
        products: Array.from({ length: 4 }, (_, j) => ({
          id: `p-${i + 2}-1-${j + 1}`,
          title: SAMPLE_PRODUCT,
          href: "machines",
        })),
      },
    ],
  })),
];
