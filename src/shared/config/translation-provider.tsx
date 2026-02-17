"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode, useEffect, useState } from "react";
import type { AbstractIntlMessages } from "next-intl";

type Props = {
  locale: string;
  children: ReactNode;
};

export function TranslationProvider({ locale, children }: Props) {
  const [messages, setMessages] = useState<AbstractIntlMessages | null>(null);

  useEffect(() => {
    fetch(`/api/translations?locale=${locale}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setMessages)
      .catch(() => setMessages({}));
  }, [locale]);

  if (!messages) {
    return <div style={{ minHeight: "100vh" }} />;
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
