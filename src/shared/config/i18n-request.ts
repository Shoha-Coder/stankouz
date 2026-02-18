import { getRequestConfig } from "next-intl/server";
import { getTranslations } from "./translations";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const { locale: validLocale, messages } = await getTranslations(locale);
  return {
    locale: validLocale,
    messages,
  };
});
