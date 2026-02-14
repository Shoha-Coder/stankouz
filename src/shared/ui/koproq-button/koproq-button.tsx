"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import styles from "./koproq-button.module.scss";

interface Props {
  href?: string;
  onClick?: () => void;
}

export function KoproqButton({ href, onClick }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const to = href ?? `/${locale}/machines`;

  const content = (
    <>
      <span className={styles.text}>Ko&apos;proq</span>
      <span className={styles.iconCircle}>
        <ArrowRight className={styles.arrow} />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={styles.button} onClick={onClick}>
        {content}
      </button>
    );
  }

  return (
    <Link href={to as any} className={styles.button}>
      {content}
    </Link>
  );
}
