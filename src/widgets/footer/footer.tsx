"use client";

import { usePathname } from "next/navigation";
import Logo from "@/shared/ui/icons/logo";
import styles from "./footer.module.scss";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@/shared/ui/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
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

export function Footer() {
  const tFooter = useTranslations("footer");
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data: siteInfo } = useSiteInfo(locale);
  const localized = getLocalizedSiteInfo(siteInfo ?? null, locale);

  const address = localized?.address ?? "";
  const phones = parsePhones(localized?.phone_number ?? "");
  const emails = parseEmails(localized?.email ?? "");
  const workTime = localized?.work_time ?? "";
  const mapHtml = siteInfo?.map ?? "";

  return (
    <footer className={styles.footer}>
      {/* TOP */}
      <div className={styles.top}>
        {/* ADDRESS */}
        <div className={styles.col}>
          <span className={styles.label}>{tFooter("address")}</span>
          {address && <p className={styles.address}>{address}</p>}

          <span className={styles.label}>{tFooter("email")}</span>
          {emails.length > 0 ? (
            emails.map((email, i) => (
              <Link key={i} href={`mailto:${email}`} className={styles.email}>
                {email}
              </Link>
            ))
          ) : (
            <span className={styles.email}>—</span>
          )}

          <span className={styles.label}>{tFooter("phones")}</span>
          {phones.length > 0 ? (
            phones.map((phone, i) => (
              <Link
                key={i}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={styles.phone}
              >
                {phone}
              </Link>
            ))
          ) : (
            <span className={styles.phone}>—</span>
          )}
        </div>

        {/* MAP */}
        <div className={styles.col}>
          <span className={styles.label}>{tFooter("location-text")}</span>
          <div className={styles.map}>
            {mapHtml ? (
              <div className={styles.mapEmbed} dangerouslySetInnerHTML={{ __html: mapHtml }} />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3767.9743448158447!2d65.348624!3d40.085757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c7cc417399af%3A0x7b280d8da54ee6c!2sGIDRO%20STANKO%20SERVIS%20Navoiy!5e1!3m2!1sen!2sus!4v1770266631538!5m2!1sen!2sus"
                width="433"
                height="262"
                allowFullScreen
                loading="lazy"
                title="Ofis joylashuvi xaritasi"
              />
            )}
          </div>
        </div>

        {/* WORKING HOURS */}
        <div className={`${styles.col} ${styles.links}`}>
          <span className={styles.label}>{tFooter("working-hours-text")}</span>
          <p className={styles.workingHours}>
            {workTime || "Ish vaqti: 09:00 - 18:00"}
          </p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.subBottom}>
        <div className={styles.brand}>
          <Logo />
        </div>

        <div className={styles.socials}>
          <Link href="https://www.instagram.com/gidrostanko/" className={styles.social}>
            <InstagramIcon />
          </Link>
          <Link href="https://t.me/gidrostanko" className={`${styles.social}`}>
            <TelegramIcon />
          </Link>
          <Link href="https://www.facebook.com/gidrostanko/" className={styles.social}>
            <FacebookIcon />
          </Link>
          <Link href="https://www.youtube.com/channel/UC1A3R9_Tv49K_U0X9j9p9IQ" className={styles.social}>
            <YouTubeIcon />
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>{tFooter("copyright")}</span>
        <span>Maxfiylik siyosati</span>
        <a href={tFooter("by-link")} target="_blank" rel="noopener noreferrer">
          {tFooter("by")}
        </a>
      </div>
    </footer>
  );
}
