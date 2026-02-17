"use client";

import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@/shared/ui/icons";
import styles from "./contact-section.module.scss";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function ContactSection() {
  const tForm = useTranslations("form");
  const tFooter = useTranslations("footer");
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.info}>
          <h2 className={styles.title}>{tForm("title1")}</h2>

          <div className={styles.block}>
            <span className={styles.label}>{tFooter("address")}</span>
            <p className={styles.text}>
              100017, Toshkent sh., Chilonzor t., Bunyodkor ko‘chasi, 24
            </p>
          </div>

          <div className={styles.block}>
            <span className={`${styles.label}`}>{tFooter("email")}</span>
            <Link href="mailto:info@stanko.uz" className={styles.email}>info@stanko.uz</Link>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>{tFooter("phones")}</span>
            <Link href="tel:+998792220077" className={styles.number}>+998 79 222 00 77</Link>
            <Link href="tel:+998906467277" className={styles.number}>+998 90 646 72 77</Link>
          </div>

          <div className={styles.socialBlock}>
            <div>
              <span className={`${styles.label} ${styles.socialsLabel}`}>
                {tForm("social")}
              </span>
              <div className={styles.socials}>
                <InstagramIcon className={styles.icon} />
                <TelegramIcon className={styles.icon} />
                <FacebookIcon className={styles.icon} />
                <YouTubeIcon className={styles.icon} />
              </div>
            </div>
          </div>

          <div className={styles.bgLogo} />
        </div>

        {/* RIGHT */}
        <div className={styles.formCard}>
          <h3>{tForm("title2")}</h3>

          <form>
            <div className={styles.row}>
              <input placeholder={tForm("name-surname")} />
              <input placeholder={tForm("phone")} />
            </div>

            <input placeholder={tForm("email")} />

            <textarea placeholder={tForm("message")} />

            <button type="submit">
              {tForm("send")} <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
