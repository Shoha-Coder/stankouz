import styles from "./vacancy-detail.module.scss";
import { HtmlContent } from "@/shared/ui/html-content";

export type VacancyDetailProps = {
  title: string;
  content: string | string[];
  updatedAt?: string;
};

export function VacancyDetail({
  title,
  content,
  updatedAt,
}: VacancyDetailProps) {
  return (
    <article className={styles.card}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.content}>
        <HtmlContent content={content} className={styles.htmlContent} />
        {updatedAt && (
          <p className={styles.updated}>Oxirgi yangilanish {updatedAt}</p>
        )}
      </div>
    </article>
  );
}
