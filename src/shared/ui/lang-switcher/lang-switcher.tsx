'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getLocaleFromPath } from '@/shared/lib/i18n/get-locale-from-path';
import { handleLocaleChange } from '@/shared/lib/i18n/handle-locale-change';
import ChevronDown from '@/shared/ui/icons/chevron-down';
import styles from './lang-switcher.module.scss';

type Props = {
  className?: string;
  dropdownClassName?: string;
  /** 'light' for top infobar (light text), 'dark' for navbar (default) */
  variant?: 'light' | 'dark';
};

export function LangSwitcher({ className, dropdownClassName, variant = 'dark' }: Props) {
  const [open, setOpen] = useState(false);
  const [locales, setLocales] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPath(pathname);
  const tHeader = useTranslations('header');

  useEffect(() => {
    fetch('/api/locales')
      .then((res) => res.json())
      .then((data) => setLocales(data.locales ?? []))
      .catch(() => setLocales(['en', 'ru', 'uz']));
  }, []);

  const getLabel = (loc: string) => {
    const label = tHeader(`localeLabels.${loc}` as 'localeLabels.ru');
    return label?.startsWith('localeLabels') ? loc.toUpperCase() : (label ?? loc.toUpperCase());
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

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
    <div ref={wrapperRef} className={`${styles.wrapper} ${variant === 'light' ? styles.light : ''} ${className ?? ''}`}>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.button} inter`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {locale.toUpperCase()}
        <ChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>
      {open && (
        <div className={`${styles.dropdown} ${dropdownClassName ?? ''}`} role="menu">
          {(locales.length ? locales : ['en', 'ru', 'uz']).map((loc) => (
            <button
              key={loc}
              role="menuitem"
              className={`${styles.option} ${locale === loc ? styles.active : ''} inter`}
              onClick={() => {
                handleLocaleChange(loc, locale, pathname, router);
                setOpen(false);
              }}
            >
              {getLabel(loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
