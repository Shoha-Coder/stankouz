"use client";

import { useParams } from "next/navigation";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { VacancySection } from "@/widgets/vacancy-section/vacancy-section";
import { useVacancy } from "@/entities/vacancy";
import styles from "../jobs.module.scss";
import { useTranslations } from "next-intl";

export default function VacancyDetailPage() {
    const params = useParams();
    const slug = params?.slug as string | undefined;
    const tBreadcrumb = useTranslations("breadcrumbs");
    const BREADCRUMB_ITEMS = [
        { label: tBreadcrumb("home"), href: "" },
        { label: tBreadcrumb("vacancies"), href: "jobs" },
    ];
    const { data: vacancy, isPending, isError } = useVacancy(slug);

    if (!slug) {
        return (
            <div className={styles.page}>
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
                    Vakansiya topilmadi
                </p>
            </div>
        );
    }

    if (isPending && !vacancy) {
        return (
            <div className={styles.page}>
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <p style={{ padding: "2rem", textAlign: "center", color: "#6c6c6c" }}>
                    Yuklanmoqda...
                </p>
            </div>
        );
    }

    if ((isError || !vacancy) && !isPending) {
        return (
            <div className={styles.page}>
                <Breadcrumb items={BREADCRUMB_ITEMS} />
                <p style={{ padding: "2rem", textAlign: "center", color: "#c53030" }}>
                    Vakansiya topilmadi
                </p>
            </div>
        );
    }

    return (
        <div className={styles.page} key={slug}>
            <Breadcrumb items={BREADCRUMB_ITEMS} />
            <VacancySection vacancy={vacancy} />
        </div>
    );
}
