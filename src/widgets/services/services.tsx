"use client";

import styles from "./services.module.scss";
import { useServices } from "@/entities/service";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { useTranslations } from "next-intl";

export function Services() {
    const t = useTranslations("home");
    const { data, isPending } = useServices();
    const services = data?.data ?? [];

    if (isPending && services.length === 0) {
        return (
            <section className={styles.services}>
                <div className={styles.header}>
                    <h2 className={styles.title}>{t("service")}</h2>
                    <p className={styles.subtitle}>{t("service-title")}</p>
                </div>
                <div className={styles.loading}>Yuklanmoqda...</div>
            </section>
        );
    }

    if (services.length === 0) return null;

    return (
        <section className={styles.services}>
            <div className={styles.header}>
                <h2 className={styles.title}>{t("service")}</h2>
                <p className={styles.subtitle}>{t("service-title")}</p>
            </div>

            <div className={styles.list}>
                {services.map((item) => (
                    <div key={item.id} className={styles.row}>
                        <ImageWithLoader
                            src={item.image}
                            alt={item.title}
                            className={styles.image}
                            width={433}
                            height={256}
                            fillWrapper
                        />
                        <div className={styles.textBlock}>
                            <h3 className={styles.rowTitle}>{item.title}</h3>
                            <p className={styles.rowShort}>{item.subtitle}</p>
                        </div>
                        <p className={styles.rowText}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
