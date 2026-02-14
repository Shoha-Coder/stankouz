"use client";

import { useState } from "react";
import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import { AnimatedItem } from "@/shared/ui/animated-item";
import styles from "./news.module.scss";
import { news } from "@/widgets/news/model/news";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
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
        {displayNews.map((item, index) => (
          <AnimatedItem key={item.id} index={index}>
            <article className={styles.card}>
            <div className={styles.imageWrap}>
              <ImageWithLoader src={item.image} alt={item.title} width={433} height={256} className={styles.image} fillWrapper />
            </div>

            <span className={styles.date}>{item.date}</span>

            <h3 className={styles.cardTitle}>{item.title}</h3>

            <Link href={{ pathname: `/${locale}/news/${item.id}` }} className={styles.link}>Batafsil</Link>
          </article>
          </AnimatedItem>
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
