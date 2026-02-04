import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from middleware using requestLocale (recommended approach)
  const locale = await requestLocale;
  
  // Validate locale
  const validLocale = locale && locales.includes(locale as (typeof locales)[number])
    ? locale
    : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});

