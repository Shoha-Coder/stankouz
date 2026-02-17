import { getRequestConfig } from "next-intl/server";
import { getLocales } from "./translations";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const { locales, defaultLocale } = await getLocales();
  const validLocale =
    locale && locales.includes(locale) ? locale : defaultLocale;
  return {
    locale: validLocale,
    messages: {},
  };
});
