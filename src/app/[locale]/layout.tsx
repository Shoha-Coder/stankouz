import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { Providers } from "@/shared/config/providers";
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
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <div>
        <Header />
        <Providers>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </div>
      <Footer />
    </NextIntlClientProvider>
  );
}
