"use client";

import Link from "next/link";
import { VacancyCard } from "@/shared/ui/vacancy-card/vacancy-card";
import { AnimatedItem } from "@/shared/ui/animated-item";
import styles from "./vacancies.module.scss";
import { Button } from "@/shared/ui/button";
import { useVacancies } from "@/entities/vacancy";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

const Vacancies = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data, isPending } = useVacancies();
  const vacancies = data?.data ?? [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.vacancies}>
        {isPending && vacancies.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
            Yuklanmoqda...
          </p>
        ) : (
          vacancies.map((vacancy, index) => (
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
      <Link href={`/${locale}/jobs`}>
        <Button
          className={styles.button}
          outlinebutton
          circleClassName={styles.buttonIcon}
        >
          Ko&apos;proq
        </Button>
      </Link>
    </div>
  );
};

export default Vacancies;
