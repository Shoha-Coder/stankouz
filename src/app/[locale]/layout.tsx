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

  return (
    <TranslationProvider locale={locale}>
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
