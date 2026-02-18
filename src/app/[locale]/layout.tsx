import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { Providers } from "@/shared/config/providers";
import { TranslationProvider } from "@/shared/config/translation-provider";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer/footer";
import { PageTransition } from "@/shared/ui/page-transition";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <TranslationProvider locale={locale} messages={messages}>
      <Providers>
        <div>
          <Header />
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
      </Providers>
    </TranslationProvider>
  );
}
