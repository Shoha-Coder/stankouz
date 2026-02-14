import { api } from "@/shared/lib/api/api-client";
import { LabItem } from "../model/types";

export const getLabById = async (id: string | number): Promise<LabItem> => {
  const { data } = await api.get<{ data: LabItem } | LabItem>(`/labs/${id}`);
  return "data" in data ? data.data : data;
};
