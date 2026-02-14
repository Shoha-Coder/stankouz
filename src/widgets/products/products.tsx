"use client";
import styles from "./products.module.scss";
import { products } from "./model/products";
import ArrowRight from "@/shared/ui/icons/arrow-right";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Products({ isLab }: { isLab?: boolean }) {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  return (
    <section className={`${styles.products} ${isLab ? styles.lab : ''}`}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2 className={styles.title}>{isLab ? 'Laboratoriya stanoklari' : 'Mahsulotlarimiz'}</h2>
        {!isLab && (
          <p className={styles.subtitle}>
            Biz yuqori sifatli xizmatlar, tezkor yordam va har bir mijozga
            individual yondashuvni taklif etamiz.
          </p>
        )}
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {products.map((item) => (
          <Link key={item.id} href={`/${locale}/${isLab ? 'labs' : 'machines'}/${item.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
              <span className={styles.badge}>{item.category}</span>
              <Image src={item.image} alt={item.title} width={433} height={256} />
            </div>

            <h3 className={styles.cardTitle}>{item.title}</h3>

            <p className={styles.cardText}>{item.description}</p>

            <Link href={{ pathname: `/${locale}/${isLab ? 'labs' : 'machines'}/${item.id}` }} className={styles.details}>
              Batafsil
            </Link>
          </Link>
        ))}
      </div>

      {/* ACTION */}
      <div className={styles.action}>
        <Link href={{ pathname: `/${locale}/${isLab ? 'labs' : 'machines'}` }} className={styles.outlineBtn}>
          {isLab ? 'Ko‘proq' : 'Katalogni ko‘rish'}
          <div className={styles.iconCircle} style={{ transform: isLab ? 'rotate(90deg)' : 'none' }}>
            <ArrowRight />
          </div>
        </Link>
      </div>
    </section>
  );
}
