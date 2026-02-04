"use client";

import styles from './hero.module.scss';
import ArrowRight from '@/shared/ui/icons/arrow-right';
import Download from '@/shared/ui/icons/download';
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero} role="region" aria-label={t('aria')}> 
      <div className={styles.container}>
        <div className={styles.eyebrow}>{t('eyebrow')}</div>
        <h1 className={styles.title}>
          {t('titleLine1')}
          <br />
          {t('titleLine2')}
        </h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>

        <div className={styles.actions}>
          <a href="#" className={styles.primary} aria-label={t('primaryAria')}>
            <span>{t('primary')}</span>
            <span className={styles.primaryIconWrapper}><ArrowRight /></span>
          </a>

          <a href="#" className={styles.secondary} aria-label={t('secondaryAria')}>
            <span>{t('secondary')}</span>
            <span className={styles.secondaryIconWrapper}><Download /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
