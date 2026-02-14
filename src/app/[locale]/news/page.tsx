"use client";

import { useState } from "react";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import styles from "./news.module.scss";
import { news } from "@/widgets/news/model/news";
import Image from "next/image";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";
import { Pagination } from "@/shared/ui/pagination";

const items = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
];

const PER_PAGE = 9;

const Page = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(news.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PER_PAGE;
  const displayNews = news.slice(startIndex, startIndex + PER_PAGE);

  return (
    <div className={styles.page}>
      <Breadcrumb items={items} />
      <div className={styles.cards}>
        {displayNews.map((item) => (
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

      <div className={styles.paginationWrapper}>
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Page;
