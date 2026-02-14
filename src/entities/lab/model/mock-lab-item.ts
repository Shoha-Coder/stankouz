import { LabItem } from "./types";

const DEFAULT_DESCRIPTION = `Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi.

Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi.

Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi. Ish joyi haqida batafsil ma'lumotlar shu yerda yoziladi.`;

export function createFallbackLabItem(id: string): LabItem {
  return {
    id: Number(id),
    title: "Stanok TO1-Yc3",
    description: DEFAULT_DESCRIPTION,
    image: "/images/stanok1.png",
  };
}
