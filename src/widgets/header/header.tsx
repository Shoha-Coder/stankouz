import { TopInfoBar } from './top-infobar';
import styles from './header.module.scss';
import { MainNavbar } from './main-navbar';

export function Header() {
  return (
    <header className={styles.header}>
      <TopInfoBar />
      <MainNavbar />
    </header>
  );
}
