"use client";

import { usePathname } from "next/navigation";
import styles from "./top-infobar.module.scss";
import Link from "next/link";
import { LangSwitcher } from "@/shared/ui/lang-switcher";
import { useSiteInfo, getLocalizedSiteInfo } from "@/entities/siteinfo";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";

function parsePhones(phoneNumber: string): string[] {
  return (phoneNumber ?? "")
    .split(/[\r\n]+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseEmails(email: string): string[] {
  return (email ?? "")
    .split(/\s*\|\s*/)
    .map((e) => e.trim())
    .filter(Boolean);
}

export function TopInfoBar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data: siteInfo } = useSiteInfo(locale);
  const localized = getLocalizedSiteInfo(siteInfo ?? null, locale);

  const address = localized?.address ?? "";
  const phones = parsePhones(localized?.phone_number ?? "");
  const emails = parseEmails(localized?.email ?? "");
  const firstPhone = phones[0] ?? "";
  const firstEmail = emails[0] ?? "";

  return (
    <div className={`${styles.topInfoBar} roboto`}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          {address && <span className={styles.infoText}>{address}</span>}
        </div>

        <div className={styles.rightSection}>
          <div className={styles.langWrapperDesktop}>
            <LangSwitcher variant="light" />
          </div>

          {firstPhone && (
            <>
              <span className={styles.divider}>|</span>
              <Link
                href={`tel:${firstPhone.replace(/\s/g, "")}`}
                className={`${styles.infoText} inter`}
              >
                {firstPhone}
              </Link>
            </>
          )}
          {firstEmail && (
            <>
              <span className={styles.divider}>|</span>
              <Link href={`mailto:${firstEmail}`} className={`${styles.infoText} inter`}>
                {firstEmail}
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
