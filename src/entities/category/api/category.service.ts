import { api } from "@/shared/lib/api/api-client";
import { Category } from "../model/types";

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await api.get<Category[]>("/categories");
    return data;
};