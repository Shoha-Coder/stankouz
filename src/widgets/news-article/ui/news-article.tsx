"use client";

import styles from "../news-article.module.scss";
import { NewsArticle, NewsItem } from "../model/types";
import { NewsSidebar } from "./news-sidebar";
import { NewsNavigation } from "./news-navigation";
import { ImageWithLoader } from "@/shared/ui/image-with-loader";
import { HtmlContent } from "@/shared/ui/html-content";

type Props = {
  article: NewsArticle;
  sidebar: NewsItem[];
  prevArticle?: { title: string; slug: string } | null;
  nextArticle?: { title: string; slug: string } | null;
  currentSlug?: string;
};

export function NewsArticleView({ article, sidebar, prevArticle, nextArticle, currentSlug }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        {/* MAIN */}
        <article className={styles.article}>
          <ImageWithLoader
            src={article.image}
            alt={article.title}
            className={styles.cover}
            width={433}
            height={256}
            fillWrapper
            srcSet={article.imageSrcSet}
            sizes={article.imageSizes}
          />

          <time className={styles.date}>{article.date}</time>

          <HtmlContent content={article.content} className={styles.text} />

          <NewsNavigation
            prevArticle={prevArticle}
            nextArticle={nextArticle}
            currentSlug={currentSlug}
          />
        </article>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <NewsSidebar items={sidebar} />
        </aside>
      </div>
    </section>
  );
}
