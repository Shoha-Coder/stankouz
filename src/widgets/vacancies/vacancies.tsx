"use client";

import { useState } from "react";
import Link from "next/link";
import { VacancyCard } from "@/shared/ui/vacancy-card/vacancy-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import styles from "./vacancies.module.scss";
import { Button } from "@/shared/ui/button";
import { useVacancies } from "@/entities/vacancy";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/shared/ui/skeleton";

const INITIAL_LIMIT = 6;

const Vacancies = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data, isPending } = useVacancies();
  const vacancies = data?.data;
  const [expanded, setExpanded] = useState(false);

  const showSkeleton = isPending || !vacancies?.length;
  const displayed = vacancies
    ? expanded
      ? vacancies
      : vacancies.slice(0, INITIAL_LIMIT)
    : [];
  const hasMore = (vacancies?.length ?? 0) > INITIAL_LIMIT;

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.vacanciesList} ${hasMore && !expanded ? styles.collapsed : styles.expanded}`}
      >
        <div className={styles.vacancies}>
        {showSkeleton ? (
          [1, 2, 3].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <Skeleton className={styles.skeletonImage} />
              <div className={styles.skeletonContent}>
                <Skeleton className={styles.skeletonTitle} />
                <Skeleton className={styles.skeletonText} />
              </div>
            </div>
          ))
        ) : (
          displayed.map((vacancy, index) => (
            <AnimatedItem key={vacancy.id} index={index}>
              <VacancyCard
                id={vacancy.id}
                date={vacancy.date}
                title={vacancy.title}
                description={vacancy.description}
                slug={vacancy.slug}
              />
            </AnimatedItem>
          ))
        )}
        </div>
      </div>
      {hasMore ? (
        <Button
          className={styles.button}
          outlinebutton
          circleClassName={expanded ? styles.buttonIconOpen : styles.buttonIcon}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Kamroq" : "Ko'proq"}
        </Button>
      ) : (
        <Link href={`/${locale}/jobs`}>
          <Button
            className={styles.button}
            outlinebutton
            circleClassName={styles.buttonIcon}
          >
            Ko&apos;proq
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Vacancies;
