import styles from "./vacancy-detail.module.scss";

export type VacancyDetailProps = {
  title: string;
  descriptionBlocks: {
    title: string;
    items: string[];
  }[];
  updatedAt: string;
};

export function VacancyDetail({
  title,
  descriptionBlocks,
  updatedAt,
}: VacancyDetailProps) {
  return (
    <article className={styles.card}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.content}>
        {descriptionBlocks.map((block, i) => (
          <div key={i} className={styles.block}>
            <h3 className={styles.blockTitle}>{block.title}</h3>
            <ul className={styles.list}>
              {block.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
        <p className={styles.updated}>Oxirgi yangilanish {updatedAt}</p>
      </div>
    </article>
  );
}
