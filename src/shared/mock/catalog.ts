
export const categories = [
  {
    id: 1,
    title: "Kategoriya 1",
    subcategories: [
      { id: 11, title: "Subkategoriya 1" },
      { id: 12, title: "Subkategoriya 2" },
      { id: 13, title: "Subkategoriya 3" },
      { id: 14, title: "Subkategoriya 4" },
    ],
  },
  { id: 2, title: "Kategoriya 2" },
  { id: 3, title: "Kategoriya 3" },
];

export const products = [
  {
    id: 1,
    title: "Тормоз колодочный типа TKT с электромагнитом MO",
    standard: "Ts 21611802-017:2017",
    image: "/mock/product-1.png",
    categoryId: 1,
    subcategoryId: 14,
  },
  {
    id: 2,
    title: "Насосный агрегат У3 СЭ 2500-180",
    standard: "Ts 21611802-017:2017",
    image: "/mock/product-2.png",
    categoryId: 1,
  },
];
