import { TopInfoBar } from './top-infobar';
import styles from './header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <TopInfoBar />
    </header>
  );
}
