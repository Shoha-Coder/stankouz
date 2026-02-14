"use client";

import styles from "./main-navbar.module.scss";
import { useTranslations } from "next-intl";
import ChevronDown from "@/shared/ui/icons/chevron-down";
import ChevronRight from "@/shared/ui/icons/chevron-right";
import SearchIcon from "@/shared/ui/icons/search";
import Logo from "@/shared/ui/icons/logo";
import HamburgerIcon from "@/shared/ui/icons/hamburger";
import { ArrowRightIcon, DownloadIcon } from "@/shared/ui/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { usePathname } from "next/navigation";

/** Catalog hierarchy: Category → Subcategory → Product */
const MOCK_CATALOG = {
  categories: Array.from({ length: 9 }, (_, i) => ({
    id: `cat-${i + 1}`,
    name: `Kategoriya ${i + 1}`,
    subcategories: Array.from({ length: 9 }, (_, j) => ({
      id: `sub-${i + 1}-${j + 1}`,
      name: `Subkategoriya ${j + 1}`,
      products: Array.from({ length: 9 }, (_, k) => ({
        id: `prod-${i + 1}-${j + 1}-${k + 1}`,
        name: `Mahsulot ${k + 1}`,
      })),
    })),
  })),
};

type CatalogView = "main" | "categories" | "subcategories" | "products";

export function MainNavbar() {
  const t = useTranslations("header.nav");
  const tHero = useTranslations("hero");
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);
  const [catalogClosing, setCatalogClosing] = useState(false);
  const [catalogView, setCatalogView] = useState<CatalogView>("main");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
  const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState<number | null>(null);

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

  const selectedCategory =
    selectedCategoryIndex !== null ? MOCK_CATALOG.categories[selectedCategoryIndex] : null;
  const selectedSubcategory =
    selectedCategory && selectedSubcategoryIndex !== null
      ? selectedCategory.subcategories[selectedSubcategoryIndex]
      : null;

  const resetCatalogState = useCallback(() => {
    setCatalogView("main");
    setSelectedCategoryIndex(null);
    setSelectedSubcategoryIndex(null);
  }, []);

  const closeAll = useCallback(() => {
    if (mobileOpen) setMobileClosing(true);
    if (catalogOpen && !mobileOpen) setCatalogClosing(true);
    setTimeout(() => {
      setCatalogOpen(false);
      setMobileOpen(false);
      setMobileClosing(false);
      setCatalogClosing(false);
      resetCatalogState();
    }, 250);
  }, [mobileOpen, catalogOpen, resetCatalogState]);

  const closeMobile = useCallback(() => {
    setMobileClosing(true);
    setTimeout(() => {
      setCatalogOpen(false);
      setMobileOpen(false);
      setMobileClosing(false);
      resetCatalogState();
    }, 250);
  }, [resetCatalogState]);

  const goBackInCatalog = useCallback(() => {
    if (catalogView === "products") {
      setCatalogView("subcategories");
      setSelectedSubcategoryIndex(null);
    } else if (catalogView === "subcategories") {
      setCatalogView("categories");
      setSelectedCategoryIndex(null);
    } else if (catalogView === "categories") {
      setCatalogView("main");
      setCatalogOpen(false);
    }
  }, [catalogView]);

  const openCatalog = useCallback(() => {
    setCatalogView("categories");
    setCatalogOpen(true);
    resetCatalogState();
  }, [resetCatalogState]);

  const toggleCatalog = useCallback(() => {
    if (catalogOpen) {
      setCatalogClosing(true);
      setTimeout(() => {
        setCatalogOpen(false);
        setCatalogClosing(false);
        resetCatalogState();
      }, 200);
    } else {
      openCatalog();
    }
  }, [catalogOpen, openCatalog, resetCatalogState]);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) closeAll();
    },
    [closeAll]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (catalogView !== "main" && catalogOpen) {
        goBackInCatalog();
      } else {
        closeAll();
      }
    },
    [catalogView, catalogOpen, goBackInCatalog, closeAll]
  );

  useEffect(() => {
    if (catalogOpen || mobileOpen) {
      document.addEventListener("mousedown", handleDocumentClick);
    }
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [catalogOpen, mobileOpen, handleDocumentClick]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const getCatalogTitle = () => {
    if (catalogView === "categories") return t("catalog");
    if (catalogView === "subcategories" && selectedCategory) return selectedCategory.name;
    if (catalogView === "products" && selectedSubcategory) return selectedSubcategory.name;
    return t("catalog");
  };

  const isProductsView = catalogView === "products";

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

        <button
          type="button"
          className={styles.hamburger}
          onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>

        <ul className={styles.menu} role="menubar">
          {menu.map((m) => (
            <li key={m.key} role="none">
              {m.key === "catalog" ? (
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={catalogOpen}
                  className={styles.menuButton}
                  onClick={toggleCatalog}
                >
                  <span>{m.label}</span>
                  <ChevronDown className={`${styles.chev} ${catalogOpen ? styles.chevOpen : ""}`} />
                </button>
              ) : (
                <Link href={{ pathname: `/${locale}/${m.key}` }}>
                  <span className={styles.menuLink}>{m.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu overlay */}
      {(mobileOpen || mobileClosing) && (
        <div
          id="mobile-menu"
          className={`${styles.mobileMenu} ${mobileClosing ? styles.mobileMenuClosing : ""}`}
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
          onClick={closeAll}
        >
          <div
            className={`${styles.mobilePanel} ${mobileClosing ? styles.mobilePanelClosing : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {!catalogOpen ? (
              <>
                <ul className={styles.mobileMenuList}>
                  {menu.map((m) => (
                    <li key={m.key} className={styles.mobileMenuItem}>
                      {m.key === "catalog" ? (
                        <button
                          type="button"
                          className={styles.mobileMenuButton}
                          onClick={openCatalog}
                        >
                          <span>{m.label}</span>
                          <ChevronRight className={styles.chevRight} />
                        </button>
                      ) : (
                        <Link
                          href={{ pathname: `/${locale}/${m.key}` }}
                          className={styles.mobileMenuLink}
                          onClick={closeMobile}
                        >
                          {m.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <header
                  className={`${styles.mobilePanelHeader} ${styles.mobilePanelHeaderCatalog} ${isProductsView ? styles.mobilePanelHeaderProducts : ""}`}
                >
                  <button
                    type="button"
                    className={styles.mobileBackBtn}
                    onClick={goBackInCatalog}
                    aria-label="Back"
                  >
                    <ChevronRight className={styles.chevLeft} />
                  </button>
                  <h2 className={styles.mobilePanelTitle}>{getCatalogTitle()}</h2>
                </header>
                <div className={styles.mobileCatalogBody}>
                  <div className={styles.search}>
                    <input
                      type="search"
                      placeholder={t("searchPlaceholder")}
                      aria-label={t("searchPlaceholder")}
                    />
                    <SearchIcon className={styles.searchIcon} />
                  </div>
                  {catalogView === "categories" && (
                    <ul className={styles.mobileCategoryList}>
                      {MOCK_CATALOG.categories.map((cat, idx) => (
                        <li key={cat.id} className={styles.mobileCategoryItem}>
                          <button
                            type="button"
                            className={styles.mobileCategoryButton}
                            onClick={() => {
                              setSelectedCategoryIndex(idx);
                              setCatalogView("subcategories");
                            }}
                          >
                            {cat.name}
                            <ChevronRight className={styles.chevRight} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {catalogView === "subcategories" && selectedCategory && (
                    <ul className={styles.mobileCategoryList}>
                      {selectedCategory.subcategories.map((sub, idx) => (
                        <li key={sub.id} className={styles.mobileCategoryItem}>
                          <button
                            type="button"
                            className={styles.mobileCategoryButton}
                            onClick={() => {
                              setSelectedSubcategoryIndex(idx);
                              setCatalogView("products");
                            }}
                          >
                            {sub.name}
                            <ChevronRight className={styles.chevRight} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {catalogView === "products" && selectedSubcategory && (
                    <ul className={styles.mobileProductList}>
                      {selectedSubcategory.products.map((prod) => (
                        <li key={prod.id} className={styles.mobileProductItem}>
                          <Link
                            href={{ pathname: `/${locale}/products` }}
                            className={styles.mobileProductLink}
                            onClick={closeMobile}
                          >
                            {prod.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop catalog dropdown */}
      {((catalogOpen && !mobileOpen && !mobileClosing) || (catalogClosing && !mobileOpen)) && (
        <div
          className={`${styles.catalog} ${catalogClosing ? styles.catalogClosing : ""}`}
          role="dialog"
          aria-label="Catalog"
        >
          <div className={styles.sidebar}>
            <div className={styles.search}>
              <input
                type="search"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
              />
              <SearchIcon className={styles.searchIcon} />
            </div>
            <ul>
              {MOCK_CATALOG.categories.map((cat, idx) => (
                <li key={cat.id} className={styles.categoryItem}>
                  <button
                    type="button"
                    className={`${styles.categoryButton} ${idx === 0 ? styles.active : ""}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.grid}>
            {Array.from({ length: 3 }).map((_, col) => (
              <div key={col} className={styles.column}>
                <h4 className={styles.columnTitle}>Kategoriya {col + 1}</h4>
                {MOCK_CATALOG.categories[0]?.subcategories[0]?.products.map((p) => (
                  <div key={p.id} className={styles.item}>
                    {p.name}
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
