"use client";
import styles from "./machines.module.scss";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import Image from "next/image";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

export function Machines() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  return (
    <section className={styles.machines}>
      <header className={styles.header}>
        <h2 className={styles.title}>Bizning stanoklar</h2>
        <p className={styles.subtitle}>
          Bizning yuqori darajadagi sifatli va zamonaviy stanoklarimiz bilan
          batafsil tanishib chiqishingiz mumkin.
        </p>
      </header>

      <div className={styles.cards}>
        {/* LEFT CARD */}
        <article className={styles.card}>
          <Image src="/images/stanok1.png" alt="Laboratoriya" width={433} height={256} />
          <div className={styles.overlay}>
            <div>
              <h3>Laboratoriya</h3>
              <p>
                Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga
                individual yondashuvni taklif etamiz.
              </p>
            </div>

            <Link href={{ pathname: `/${locale}/machines/1` }} className={styles.cardBtn}>
              <span>Batafsil</span>
              <span className={styles.icon}>
                <ArrowRight />
              </span>
            </Link>
          </div>
        </article>

        {/* RIGHT CARD */}
        <article className={styles.card}>
          <Image src="/images/stanok2.png" alt="Stanoklar" width={433} height={256} />
          <div className={styles.overlay}>
            <div>
              <h3>Stanoklar</h3>
              <p>
                Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga
                individual yondashuvni taklif etamiz.
              </p>
            </div>

            <Link href={{ pathname: `/${locale}/machines/2` }} className={styles.cardBtn}>
              <span>Batafsil</span>
              <span className={styles.icon}>
                <ArrowRight />
              </span>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
