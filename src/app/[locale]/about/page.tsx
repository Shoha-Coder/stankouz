"use client";

import { usePathname } from "next/navigation";
import Advantages from "@/shared/ui/advantages/advantages";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { CertificatesCarousel } from "@/shared/ui/certificates/certificates-carousel";
import Player from "@/widgets/player/player";
import { TeamGrid } from "@/shared/ui/team-card/team-grid";
import { CompanyHistory } from "@/widgets/company-history/company-history";
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
import { Skeleton } from "@/shared/ui/skeleton";

export default function AboutPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data: certData, isPending: certPending } = useCertificates({ page: 1, limit: 12 }, locale);
  const { data: historyData, isPending: historyPending } = useCompanyHistories({ page: 1, limit: 12 }, locale);
  const historyItems = historyData?.data;
  const {
    data: membersData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMembersInfinite(locale);
  const members = flattenMembers(membersData);
  const certItems = certData?.data;

  const showHistorySkeleton = historyPending || !historyItems?.length;
  const showCertSkeleton = certPending || !certItems?.length;

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
      {showHistorySkeleton ? (
        <section className={styles.skeletonSection}>
          <Skeleton className={styles.skeletonTitle} />
          <div className={styles.skeletonHistoryLayout}>
            <Skeleton className={styles.skeletonHistoryImage} />
            <div className={styles.skeletonHistoryContent}>
              <Skeleton className={styles.skeletonHistoryText} />
              <Skeleton className={styles.skeletonHistoryTextShort} />
            </div>
          </div>
        </section>
      ) : (
        <CompanyHistory title="Kompaniyamiz tarixi" items={historyItems!} />
      )}
      <TeamGrid
        members={members}
        onLoadMore={() => fetchNextPage()}
        hasMore={hasNextPage ?? false}
        isLoadingMore={isFetchingNextPage}
      />
      {showCertSkeleton ? (
        <section className={styles.skeletonSection}>
          <Skeleton className={styles.skeletonTitle} />
          <div className={styles.skeletonCerts}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className={styles.skeletonCert} />
            ))}
          </div>
        </section>
      ) : (
        <CertificatesCarousel items={certItems!} />
      )}
      <News />
      <Partners />
      <ContactSection page="about" />
    </main>
  );
}
