import { NextRequest } from "next/server";

const EXTERNAL_API =
  (process.env.NEXT_PUBLIC_API_URL ?? "https://project1.ndc-agency.uz/api").replace(/\/$/, "");
const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ?? "8465358311:AAFs-TQaGCSEa9qwLd9zdTkw6QNd6TlWBoQ";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID ?? "3797959143";

async function sendTelegramNotification(data: {
  name: string;
  phone_number: string;
  email?: string;
  message?: string;
  page?: string;
  vacancy_id?: string;
  vacancy_title?: string;
  resume?: File;
}) {
  const lines = [
    data.vacancy_id ? "📋 *Yangi vakansiya arizasi*" : "📩 *Yangi murojaat*",
    "",
    `👤 *Ism:* ${data.name}`,
    `📞 *Telefon:* ${data.phone_number}`,
    ...(data.vacancy_title ? [`📌 *Vakansiya:* ${data.vacancy_title}`] : []),
    ...(data.vacancy_id ? [`🆔 *Vakansiya ID:* ${data.vacancy_id}`] : []),
    ...(data.email ? [`📧 *Email:* ${data.email}`] : []),
    ...(data.message ? [`💬 *Xabar:* ${data.message}`] : []),
    ...(data.page ? [`📄 *Sahifa:* ${data.page}`] : []),
    ...(data.resume ? [`📎 *Rezyume:* ${data.resume.name}`] : []),
  ];
  const text = lines.join("\n");

  if (data.resume && data.resume.size > 0) {
    const sendDocUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;
    const docFormData = new FormData();
    docFormData.append("chat_id", TELEGRAM_CHAT_ID);
    docFormData.append("document", data.resume, data.resume.name);
    docFormData.append("caption", text);
    docFormData.append("parse_mode", "Markdown");

    const docRes = await fetch(sendDocUrl, {
      method: "POST",
      body: docFormData,
    });

    if (!docRes.ok) {
      const err = await docRes.text();
      console.error("[contacts] Telegram sendDocument failed:", docRes.status, err);
    }
  } else {
    const sendMessageUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const msgRes = await fetch(sendMessageUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });

    if (!msgRes.ok) {
      const err = await msgRes.text();
      console.error("[contacts] Telegram sendMessage failed:", msgRes.status, err);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const locale = request.headers.get("accept-language") ?? "ru";

    const name = (formData.get("name") as string)?.trim() ?? "";
    const phone_number = (formData.get("phone_number") as string)?.trim() ?? "";
    const email = (formData.get("email") as string)?.trim() || undefined;
    const message = (formData.get("message") as string)?.trim() || undefined;
    const page = (formData.get("page") as string)?.trim() || undefined;
    const vacancy_id = (formData.get("vacancy_id") as string)?.trim() || undefined;
    const vacancy_title = (formData.get("vacancy_title") as string)?.trim() || undefined;
    const resume = formData.get("resume") as File | null;
    const resumeFile = resume && resume.size > 0 ? resume : undefined;

    if (!name || !phone_number) {
      return Response.json({ error: "name and phone_number required" }, { status: 400 });
    }

    const forwardFormData = new FormData();
    formData.forEach((value, key) => {
      forwardFormData.append(key, value);
    });

    const externalUrl = `${EXTERNAL_API}/contacts`;
    const externalRes = await fetch(externalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": locale,
      },
      body: forwardFormData,
    });

    const contentType = externalRes.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await externalRes.json()
      : await externalRes.text();

    if (!externalRes.ok) {
      return Response.json(data, { status: externalRes.status });
    }

    sendTelegramNotification({
      name,
      phone_number,
      email,
      message,
      page,
      vacancy_id,
      vacancy_title,
      resume: resumeFile,
    }).catch((e) => console.error("[contacts] Telegram error:", e));

    return Response.json(data);
  } catch (error) {
    console.error("[contacts] Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
