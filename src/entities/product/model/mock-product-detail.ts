import { ProductDetail } from "./types";

const DEFAULT_IMAGES = [
  "/images/product1.png",
  "/images/product1.png",
  "/images/product1.png",
  "/images/product1.png",
];

export function createFallbackProductDetail(slug: string): ProductDetail {
  return {
    id: 0,
    title: "Nasos agregati Uz SE 2500-180",
    description: `Максимальный момент силы, не менее, Нm - 4350;
Частота вращения водила (без нагрузки) с-1 - 1,4;
Время развинчивания или свинчивания одного соединения, с - 3,3;
Передаточное число - 17;
Привод (электродвигатель) мощность, кВт - 4;
Частота вращения вала, мин-1 - 1500;
Диаметр отверстия в корпусе вращателя, мм - 200;`,
    images: [...DEFAULT_IMAGES],
    features: [
      { name: "Brend", value: "Brend nomi" },
      { name: "Ishlab chiqarilgan davlat", value: "Davlat nomi" },
      { name: "Xususiyat nomi", value: "Xususiyat turi" },
    ],
  };
}
