"use client";

import styles from "./main-navbar.module.scss";
import { useTranslations } from "next-intl";
import ChevronDown from "@/shared/ui/icons/chevron-down";
import SearchIcon from "@/shared/ui/icons/search";
import Logo from "@/shared/ui/icons/logo";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

export function MainNavbar() {
  const t = useTranslations("header.nav");
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const menu = [
    { key: "catalog", label: t("catalog") },
    { key: "about", label: t("about") },
    { key: "labs", label: t("labs") },
    { key: "machines", label: t("machines") },
    { key: "products", label: t("products") },
    { key: "jobs", label: t("jobs") },
    { key: "news", label: t("news") },
    { key: "contacts", label: t("contacts") },
  ];

  const catalog = {
    categories: new Array(8).fill(0).map((_, i) => `Kategoriya nomi`),
    items: new Array(9)
      .fill(0)
      .map((_, i) => `Насосный агрегат Уз СЭ 2500-180`),
  };

  const handleDocumentClick = useCallback((e: MouseEvent) => {
    if (!wrapperRef.current) return;
    if (!wrapperRef.current.contains(e.target as Node)) {
      setCatalogOpen(false);
    }
  }, []);

  useEffect(() => {
    if (catalogOpen)
      document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [catalogOpen, handleDocumentClick]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <nav className={styles.navbar} aria-label="Main navigation">
        <div className={styles.left}>
          <Link href={{ pathname: `/${locale}` }}>
            <div className={styles.brand}>
              <Logo />
            </div>
          </Link>
        </div>

        <ul className={styles.menu} role="menubar">
          {menu.map((m) => (
            <li
              key={m.key}
              role="none"
            //   onMouseEnter={() => m.key === "catalog" && setCatalogOpen(true)}
            //   onFocus={() => m.key === "catalog" && setCatalogOpen(true)}
            >
              {m.key === "catalog" ? (
                <button
                  aria-haspopup="true"
                  aria-expanded={catalogOpen}
                  className={styles.menuButton}
                  onClick={() => setCatalogOpen((v) => !v)}
                >
                  <span>{m.label}</span>
                  <ChevronDown
                    className={`${styles.chev} ${catalogOpen ? styles.chevOpen : ""}`}
                  />
                </button>
              ) : (
                <Link href={{pathname: `/${locale}/${m.key}`}}>
                  <span className={styles.menuLink}>{m.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {catalogOpen && (
        <div className={styles.catalog} role="dialog" aria-label="Catalog">
          <div className={styles.sidebar}>
            <div className={styles.search}>
              <input placeholder={t("catalog.searchPlaceholder")} />
              <SearchIcon />
            </div>

            <ul>
              {catalog.categories.map((c, idx) => (
                <li key={idx} className={styles.categoryItem}>
                  <button
                    className={`${styles.categoryButton} ${idx === 0 ? styles.active : ""}`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.grid}>
            {Array.from({ length: 3 }).map((_, col) => (
              <div key={col} className={styles.column}>
                <h4 className={styles.columnTitle}>Kategoriya nomi</h4>
                {catalog.items.map((it, i) => (
                  <div key={i} className={styles.item}>
                    {it}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
