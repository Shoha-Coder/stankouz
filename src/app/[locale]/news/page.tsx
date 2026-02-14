"use client";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import styles from "./news.module.scss";
import { news } from "@/widgets/news/model/news";
import Image from "next/image";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

const items = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
];

const Page = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  return (
    <div>
      <Breadcrumb items={items} />
      <div className={styles.cards}>
        {news.map((item) => (
          <article className={styles.card} key={item.id}>
            <div className={styles.imageWrap}>
              <Image src={item.image} alt={item.title} width={433} height={256} className={styles.image} />
            </div>

            <span className={styles.date}>{item.date}</span>

            <h3 className={styles.cardTitle}>{item.title}</h3>

            <Link href={{ pathname: `/${locale}/news/${item.id}` }} className={styles.link}>Batafsil</Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Page;
