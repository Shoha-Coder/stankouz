"use client";

import { usePathname } from "next/navigation";
import Advantages from "@/shared/ui/advantages/advantages";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { CertificatesCarousel } from "@/shared/ui/certificates/certificates-carousel";
import Player from "@/widgets/player/player";
import { TeamGrid } from "@/shared/ui/team-card/team-grid";
import { CompanyHistory } from "@/widgets/company-history/company-history";
import { history as defaultHistory } from "@/widgets/company-history/model/data";
import { useCompanyHistories } from "@/entities/company-history";
import { statsData } from "@/widgets/stats/model/stats";
import { Stats } from "@/widgets/stats/stats";
import { News } from "@/widgets/news/news";
import { Partners } from "@/widgets/partners/partners";
import { ContactSection } from "@/shared/ui/contact-section/contact-section";
import { useCertificates } from "@/entities/certificate";
import { useMembersInfinite, flattenMembers } from "@/entities/member";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import styles from "./about.module.scss";
import { useTranslations } from "next-intl";

const DEFAULT_CERT_ITEMS = [
  { id: 1, image: "/images/certs/1.png" },
  { id: 2, image: "/images/certs/2.png" },
  { id: 3, image: "/images/certs/3.png" },
];

export default function AboutPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data } = useCertificates({ page: 1, limit: 12 }, locale);
  const { data: historyData } = useCompanyHistories({ page: 1, limit: 12 }, locale);
  const historyItems = historyData?.data?.length ? historyData.data : defaultHistory;
  const {
    data: membersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMembersInfinite(locale);
  const members = flattenMembers(membersData);
  const certItems = data?.data ?? [];
  const carouselItems = certItems.length > 0 ? certItems : DEFAULT_CERT_ITEMS;
  const tBreadcrumb = useTranslations("breadcrumbs");
  const BREADCRUMB_ITEMS = [
    { label: tBreadcrumb("home"), href: "" },
    { label: tBreadcrumb("about"), href: "about" },
  ];
  return (
    <main>
      <Breadcrumb items={BREADCRUMB_ITEMS} />
      <Player />
      <Stats items={statsData} />
      <div className={styles.advantages}>
        <Advantages
          title="Bizning afzalliklar"
          text="Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga individual yondashuvni taklif etamiz."
          className={styles.advantagesContent}
        />
      </div>
      <CompanyHistory title="Kompaniyamiz tarixi" items={historyItems} />
      <TeamGrid
        members={members}
        onLoadMore={() => fetchNextPage()}
        hasMore={hasNextPage ?? false}
        isLoadingMore={isFetchingNextPage}
      />
      <CertificatesCarousel items={carouselItems} />
      <News />
      <Partners />
      <ContactSection />
    </main>
  );
}
