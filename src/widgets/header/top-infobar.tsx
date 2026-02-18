'use client';

import { useTranslations } from 'next-intl';
import styles from './top-infobar.module.scss';
import Link from 'next/link';
import { LangSwitcher } from '@/shared/ui/lang-switcher';

export function TopInfoBar() {
  const t = useTranslations('header.topBar');

  return (
    <div className={`${styles.topInfoBar} roboto`}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <span className={styles.infoText}>{t('address')}</span>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.langWrapperDesktop}>
            <LangSwitcher variant="light" />
          </div>

          <span className={styles.divider}>|</span>
          <Link href={`tel:${t('phone')}`} className={`${styles.infoText} inter`}>{t('phone')}</Link>
          <span className={styles.divider}>|</span>
          <Link href={`mailto:${t('email')}`} className={`${styles.infoText} inter`}>{t('email')}</Link>
        </div>
      </div>
    </div>
  );
}
