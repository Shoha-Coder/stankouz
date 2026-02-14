"use client";

import styles from "../news-article.module.scss";
import { NewsArticle, NewsItem } from "../model/types";
import { NewsSidebar } from "./news-sidebar";
import { NewsNavigation } from "./news-navigation";

type Props = {
  article: NewsArticle;
  sidebar: NewsItem[];
};

export function NewsArticleView({ article, sidebar }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {/* MAIN */}
        <article className={styles.article}>
          <img
            src={article.image}
            alt={article.title}
            className={styles.cover}
          />

          <time className={styles.date}>{article.date}</time>

          {article.content.map((p, i) => (
            <p key={i} className={styles.text}>
              {p}
            </p>
          ))}

          <NewsNavigation />
        </article>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <NewsSidebar items={sidebar} />
        </aside>
      </div>
    </section>
  );
}
