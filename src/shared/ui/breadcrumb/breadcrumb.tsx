"use client";

import Link from "next/link";
import styles from "./breadcrumb.module.scss";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <div className={styles.container}>
        <span className={styles.heading}>Biz haqimizda</span>
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className={styles.item}>
                {item.href && !isLast ? (
                  <Link
                    href={{ pathname: `/${locale}/${item.href}` }}
                    className={styles.link}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.current}>{item.label}</span>
                )}

                {!isLast && <span className={styles.separator}>/</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
