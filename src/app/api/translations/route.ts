import { NextRequest } from "next/server";
import { getTranslations } from "@/shared/config/translations";

export async function GET(request: NextRequest) {
  try {
    const locale = request.nextUrl.searchParams.get("locale") ?? "en";
    const { messages } = await getTranslations(locale);
    return Response.json(messages);
  } catch (error) {
    console.error("[translations]", error);
    return Response.json({}, { status: 500 });
  }
}
