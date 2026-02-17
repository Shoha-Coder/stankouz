import { getLocales } from "@/shared/config/translations";

export async function GET() {
  try {
    const { locales, defaultLocale } = await getLocales();
    return Response.json({ locales, defaultLocale });
  } catch (error) {
    console.error("[locales]", error);
    return Response.json(
      { locales: ["en", "ru", "uz"], defaultLocale: "en" },
      { status: 200 }
    );
  }
}
