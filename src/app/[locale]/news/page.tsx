import { Breadcrumb } from "@/shared/ui/breadcrumb/breadcrumb";
import styles from "./news.module.scss";
import { news } from "@/widgets/news/model/news";
import Image from "next/image";

const items = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
];

const page = () => {
  return (
    <div>
      <Breadcrumb items={items} />
      <div className={styles.cards}>
        {news.map((item) => (
          <article className={styles.card}>
            <div className={styles.imageWrap}>
              <Image src={item.image} />
            </div>

            <span className={styles.date}>{item.date}</span>

            <h3 className={styles.cardTitle}>{item.title}</h3>

            <a className={styles.link}>Batafsil</a>
          </article>
        ))}
      </div>
    </div>
  );
};

export default page;
