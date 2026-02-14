'use client';
import Link from "next/link";
import styles from "./not-found.module.scss";
import { ArrowRightIcon } from "@/shared/ui/icons";
import Logo from "@/shared/ui/icons/logo";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";

export default function NotFound() {
    const pathname = usePathname()
    const locale = getLocaleFromPath(pathname)

  return (
    <main className={styles.root}>
      <Link href={`/${locale}`} className={styles.logo}>
        <Logo />
      </Link>

      {/* CONTENT */}
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <p className={styles.text}>Sahifa topilmadi!</p>

        <Link href={`/${locale}`} className={styles.button}>
          <span className={styles.icon}>
            <ArrowRightIcon />
          </span>
          Bosh sahifaga qaytish
        </Link>
      </div>
    </main>
  );
}
