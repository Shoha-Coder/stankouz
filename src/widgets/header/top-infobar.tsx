'use client';

import { useTranslations } from 'next-intl';
import styles from './top-infobar.module.scss';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocaleFromPath } from '@/shared/lib/i18n/get-locale-from-path';
import { handleLocaleChange } from '@/shared/lib/i18n/handle-locale-change';
import { locales } from '@/shared/config/i18n';
import ChevronDown from '@/shared/ui/icons/chevron-down';
import Link from 'next/link';

export function TopInfoBar() {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPath(pathname);

  const tHeader = useTranslations('header');
  const t = useTranslations('header.topBar');

  const labels: Record<string, string> = {
    ru: tHeader('localeLabels.ru'),
    en: tHeader('localeLabels.en'),
    uz: tHeader('localeLabels.uz'),
  };

  /* ===== Click outside ===== */
  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  /* ===== ESC key ===== */
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div className={`${styles.topInfoBar} roboto`}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <span className={styles.infoText}>{t('address')}</span>
        </div>

        <div className={styles.rightSection}>
          <div ref={wrapperRef} className={styles.langWrapper}>
            <button
              ref={buttonRef}
              type="button"
              className={`${styles.langButton} inter`}
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {locale.toUpperCase()}
              <ChevronDown
                className={`${styles.chevron} ${open ? styles.chevronOpen : ''
                  }`}
              />
            </button>

            {open && (
              <div className={styles.langDropdown} role="menu">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    role="menuitem"
                    className={`${styles.langOption} ${locale === loc ? styles.active : ''
                      } inter`}
                    onClick={() => {
                      handleLocaleChange(loc, locale, pathname, router);
                      setOpen(false);
                    }}
                  >
                    {labels[loc]}
                  </button>
                ))}
              </div>
            )}
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
