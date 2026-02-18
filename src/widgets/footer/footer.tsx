"use client";

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

export function Footer() {
  const tFooter = useTranslations("footer");
  return (
    <footer className={styles.footer}>
      {/* TOP */}
      <div className={styles.top}>
        {/* ADDRESS */}
        <div className={styles.col}>
          <span className={styles.label}>{tFooter("address")}</span>
          <p className={styles.address}>
            100017, Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko‘chasi,
            24
          </p>

          <span className={styles.label}>{tFooter("email")}</span>
          <Link href="mailto:info@stanko.uz" className={styles.email}>
            info@stanko.uz
          </Link>

          <span className={styles.label}>{tFooter("phones")}</span>
          <Link href="tel:+998792220077" className={styles.phone}>
            +998 79 222 00 77
          </Link>
          <Link href="tel:+998906467277" className={styles.phone}>
            +998 90 646 72 77
          </Link>
        </div>

        {/* MAP */}
        <div className={styles.col}>
          <span className={styles.label}>{tFooter("location-text")}</span>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3767.9743448158447!2d65.348624!3d40.085757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c7cc417399af%3A0x7b280d8da54ee6c!2sGIDRO%20STANKO%20SERVIS%20Navoiy!5e1!3m2!1sen!2sus!4v1770266631538!5m2!1sen!2sus"
              width="433"
              height="262"
              allowFullScreen
              loading="lazy"
              title="Ofis joylashuvi xaritasi"
            />
          </div>
        </div>

        {/* CATALOG */}
        <div className={`${styles.col} ${styles.links}`}>
          <ul className={styles.menu}>
            <li>Katalog</li>
            <li className={styles.active}>Biz haqimizda</li>
            <li>Mahsulotlar</li>
            <li>Stanoklar</li>
            <li>Laboratoriya</li>
            <li>Yangiliklar</li>
          </ul>
        </div>

        {/* JOBS */}
        <div className={`${styles.col} ${styles.links}`}>
          <ul className={styles.menu}>
            <li>Bo‘sh ish o‘rinlari</li>
            <li>Aloqa</li>
          </ul>
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
