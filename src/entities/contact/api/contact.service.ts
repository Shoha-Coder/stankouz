import { api } from "@/shared/lib/api/api-client";

export interface SubmitApplicationPayload {
  vacancy_id?: number;
  name: string;
  phone_number: string;
  email?: string;
  message?: string;
  resume?: File;
  page?: string;
}

const CONTACTS_ENDPOINT = "/contacts";

export async function submitApplication(payload: SubmitApplicationPayload): Promise<unknown> {
  const formData = new FormData();

  if (payload.vacancy_id != null) {
    formData.append("vacancy_id", String(payload.vacancy_id));
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

  const { data } = await api.post<unknown>(CONTACTS_ENDPOINT, formData, {
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });
  return data;
}
