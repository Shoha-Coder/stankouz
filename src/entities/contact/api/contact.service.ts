export interface SubmitApplicationPayload {
  vacancy_id?: number;
  vacancy_title?: string;
  name: string;
  phone_number: string;
  email?: string;
  message?: string;
  resume?: File;
  page?: string;
}

function getContactsApiUrl(): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/contacts`;
  }
  return "/api/contacts";
}

export async function submitApplication(payload: SubmitApplicationPayload): Promise<unknown> {
  const formData = new FormData();

  if (payload.vacancy_id != null) {
    formData.append("vacancy_id", String(payload.vacancy_id));
  }
  if (payload.vacancy_title?.trim()) {
    formData.append("vacancy_title", payload.vacancy_title.trim());
  }
  formData.append("name", payload.name.trim());
  formData.append("phone_number", payload.phone_number.trim());
  if (payload.email?.trim()) {
    formData.append("email", payload.email.trim());
  }
  if (payload.message?.trim()) {
    formData.append("message", payload.message.trim());
  }
  if (payload.resume) {
    formData.append("resume", payload.resume, payload.resume.name);
  }
  if (payload.page) {
    formData.append("page", payload.page);
  }

  const segment = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";
  const locale = segment && /^[a-z]{2}(-[a-z]{2})?$/i.test(segment) ? segment : "ru";

  const res = await fetch(getContactsApiUrl(), {
    method: "POST",
    headers: { "Accept-Language": locale },
    body: formData,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message ?? "Request failed");
  }
  return data;
}
