"use client";

import Link from "next/link";
import { FacebookIcon, InstagramIcon, TelegramIcon, YouTubeIcon } from "../icons";
import styles from "./contact-section.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";

export function ContactSection() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT */}
        <div className={styles.info}>
          <h2 className={styles.title}>Aloqa ma’lumotlari</h2>

          <div className={styles.block}>
            <span className={styles.label}>Bosh ofis manzili</span>
            <p className={styles.text}>
              100017, Toshkent sh., Chilonzor t., Bunyodkor ko‘chasi, 24
            </p>
          </div>

          <div className={styles.block}>
            <span className={styles.label}>Ishonch telefoni</span>
            <Link href="tel:+998792220077">+998 79 222 00 77</Link>
            <Link href="tel:+998906467277">+998 90 646 72 77</Link>
          </div>

          <div className={styles.socialBlock}>
            <div className={styles.block}>
              <span className={styles.label}>Elektron pochta manzili</span>
              <Link href="mailto:info@stanko.uz">info@stanko.uz</Link>
            </div>

            <div>
              <span className={`${styles.label} ${styles.socialsLabel}`}>Ijtimoiy tarmoqlar</span>
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
        <form className={styles.form}>
          <h2 className={styles.formTitle}>Ariza qoldirish</h2>

          <div className={styles.row}>
            <input placeholder="Ismingizni kiriting" />
            <input placeholder="+998 (00) 000-00-00" />
          </div>

          <input placeholder="Elektron pochta manzili (ixtiyoriy)" />

          <textarea  placeholder="Xabar (ixtiyoriy)" />

          <button type="submit" className={styles.submit}>
            Xabar yuborish
            <span className={styles.submitIcon}>
              <ArrowRight />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
