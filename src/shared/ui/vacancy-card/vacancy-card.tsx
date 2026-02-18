"use client";

import Link from "next/link";
import styles from "./vacancy-card.module.scss";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

type Props = {
  id: number;
  date: string;
  title: string;
  description: string;
  slug?: string;
  onDetails?: () => void;
};

export function VacancyCard({ id, date, title, description, slug, onDetails }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const href = slug ? `/${locale}/jobs/${slug}` : `/${locale}/jobs/${id}`;
  return (
    <Link href={href as any} className={styles.card}>
      <time className={styles.date}>{date}</time>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      <button type="button" className={styles.button} onClick={onDetails}>
        Batafsil
      </button>
    </Link>
  );
}
