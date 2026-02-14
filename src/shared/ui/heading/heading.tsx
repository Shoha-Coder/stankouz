import styles from "./heading.module.scss";

type HeadingProps = {
  title?: string;
  text?: string;
};

const Heading = ({ title, text }: HeadingProps) => {
  return (
    <header className={styles.header}>
      {title && <h2 className={styles.title}>{title}</h2>}
      {text && <p className={styles.subtitle}>{text}</p>}
    </header>
  );
};

export default Heading;
