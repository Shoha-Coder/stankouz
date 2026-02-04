export const locales = ['en', 'ru', 'uz'] as const;
export const defaultLocale = 'en';

export type AppLocale = (typeof locales)[number];
