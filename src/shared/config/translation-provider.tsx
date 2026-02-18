"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import type { AbstractIntlMessages } from "next-intl";

type Props = {
  locale: string;
  children: ReactNode;
  /** Messages from backend (via getRequestConfig → getTranslations). When provided, no client fetch. */
  messages?: AbstractIntlMessages | null;
};

export function TranslationProvider({ locale, children, messages }: Props) {
  return (
    <NextIntlClientProvider
      messages={messages ?? {}}
      locale={locale}
    >
      {children}
    </NextIntlClientProvider>
  );
}
