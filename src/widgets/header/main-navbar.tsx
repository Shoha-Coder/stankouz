"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import Logo from "@/shared/ui/icons/logo";
import { SearchIcon, HamburgerIcon } from "@/shared/ui/icons";
import ChevronDownSvg from "@/shared/ui/icons/chevron-down-svg";
import ChevronRight from "@/shared/ui/icons/chevron-right";
import { LangSwitcher } from "@/shared/ui/lang-switcher";

import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";

import {
  NAV_ITEMS,
  type CatalogCategory,
  type CatalogSubcategory,
} from "./model/nav-config";
import { useCategories } from "@/entities/category/model/useCategories";
import { toCatalogCategories } from "@/entities/category/model/mappers";

import styles from "./main-navbar.module.scss";

const MOBILE_BREAKPOINT = 1200;

export function MainNavbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '').replace('/', '') as string;
  const tNav = useTranslations("header.nav");

  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  type MobileView = "root" | "catalog" | CatalogCategory | CatalogSubcategory;
  const [mobileCatalogStack, setMobileCatalogStack] = useState<MobileView[]>(["root"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);

  const currentMobileView = mobileCatalogStack[mobileCatalogStack.length - 1];

  const closeCatalog = useCallback(() => {
    setCatalogOpen(false);
    setSelectedCategory(null);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileCatalogStack(["root"]);
    setSearchQuery("");
  }, []);

  const handleCatalogToggle = useCallback(() => {
    setCatalogOpen((v) => !v);
    if (catalogOpen) setSelectedCategory(null);
  }, [catalogOpen]);

  const handleCategorySelect = useCallback((cat: CatalogCategory) => {
    setSelectedCategory(cat);
  }, []);

  const handleMobileBack = useCallback(() => {
    setMobileCatalogStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);

  const handleMobileCategorySelect = useCallback(
    (cat: CatalogCategory) => {
      setMobileCatalogStack((s) => [...s, cat]);
    },
    []
  );

  const handleMobileSubcategorySelect = useCallback(
    (sub: CatalogSubcategory) => {
      setMobileCatalogStack((s) => [...s, sub]);
    },
    []
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!catalogOpen && !mobileOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (catalogOpen && !isMobile) {
        if (
          catalogRef.current &&
          !catalogRef.current.contains(target) &&
          navRef.current &&
          !navRef.current.contains(target)
        ) {
          closeCatalog();
        }
      }
      if (mobileOpen && isMobile) {
        if (navRef.current && !navRef.current.contains(target)) {
          closeMobile();
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [catalogOpen, mobileOpen, isMobile, closeCatalog, closeMobile]);

  useEffect(() => {
    if ((mobileOpen && isMobile)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, isMobile]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen, closeMobile]);

  const buildHref = (path: string) =>
    path ? `/${locale}/${path}` : `/${locale}`;

  const { data: categories = [] } = useCategories();
  const catalogCategories = toCatalogCategories(categories);

  const filteredCategories = searchQuery
    ? catalogCategories.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : catalogCategories;

  const displayCategory = selectedCategory ?? filteredCategories[0];

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
      <div className={styles.container}>
        <Link href={buildHref("") as any} className={styles.logoLink} aria-label="Gidro Stanko Servis - Home">
          <Logo className={styles.logoIcon} />
        </Link>

        {/* Desktop nav */}
        <div className={styles.desktopNav}>
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.labelKey} className={styles.navItem}>
                {item.hasDropdown ? (
                  <button
                    type="button"
                    className={`${styles.navLink} ${styles.navLinkButton} ${catalogOpen ? styles.navLinkActive : ""}`}
                    onClick={handleCatalogToggle}
                    aria-expanded={catalogOpen}
                    aria-haspopup="true"
                  >
                    {tNav(item.labelKey)}
                    <ChevronDownSvg
                      className={`${styles.caret} ${catalogOpen ? styles.caretOpen : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={buildHref(item.href) as any}
                      className={`${styles.navLink} ${item.href === pathnameWithoutLocale ? styles.navLinkActive : ""}`}
                    onClick={() => isMobile && closeMobile()}
                  >
                    {tNav(item.labelKey)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className={styles.hamburger}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <HamburgerIcon open={mobileOpen} className={styles.hamburgerIcon} />
        </button>
      </div>

      {/* Desktop Katalog dropdown */}
      {catalogOpen && !isMobile && (
        <div
          ref={catalogRef}
          className={styles.catalogDropdown}
          role="menu"
          aria-label="Catalog menu"
        >
          <div className={styles.catalogInner}>
            <div className={styles.catalogLeft}>
              <div className={styles.searchWrap}>
                <input
                  type="search"
                  placeholder={tNav("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search catalog"
                />
                <SearchIcon className={styles.searchIcon} />
              </div>
              <ul className={styles.categoryList}>
                {filteredCategories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      className={`${styles.categoryItem} ${
                        selectedCategory?.id === cat.id || (!selectedCategory && cat.id === filteredCategories[0]?.id)
                          ? styles.categoryItemActive
                          : ""
                      }`}
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat.title}
                      <ChevronRight className={styles.categoryArrow} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.catalogRight}>
              <h3 className={styles.catalogTitle}>{displayCategory?.title}</h3>
              <div className={styles.productGrid}>
                {(displayCategory?.subcategories ?? []).flatMap((sub) =>
                  sub.products.map((p) => (
                    <Link
                      key={p.id}
                      href={buildHref(p.href) as any}
                      className={styles.productItem}
                      onClick={closeCatalog}
                    >
                      {p.title}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu dropdown - inline below navbar, like catalog */}
      {mobileOpen && isMobile && (
        <div
          className={styles.mobileDropdown}
          role="menu"
          aria-label="Navigation menu"
        >
          <div className={styles.mobileContent}>
              {currentMobileView === "root" ? (
                <>
                  <button
                    type="button"
                    className={`${styles.mobileNavItem} ${catalogOpen && styles.mobileNavItemActive}`}
                    onClick={() => setMobileCatalogStack((s) => [...s, "catalog"])}
                  >
                    {tNav("catalog")}
                    <ChevronRight className={styles.mobileChevron} />
                  </button>
                  {NAV_ITEMS.filter((i) => !i.hasDropdown).map((item) => (
                    <Link
                      key={item.labelKey}
                      href={buildHref(item.href) as any}
                      className={`${styles.mobileNavItem} ${item.href === pathnameWithoutLocale ? styles.navLinkActive : ""}`}
                      onClick={closeMobile}
                    >
                      {tNav(item.labelKey)}
                    </Link>
                  ))}
                  <div className={styles.mobileLangWrap}>
                    <LangSwitcher />
                  </div>
                </>
              ) : currentMobileView === "catalog" ? (
                <MobileCatalogView
                  title={tNav("catalog")}
                  searchPlaceholder={tNav("searchPlaceholder")}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onBack={handleMobileBack}
                  categories={filteredCategories}
                  onCategorySelect={handleMobileCategorySelect}
                  SearchIcon={SearchIcon}
                  ChevronRight={ChevronRight}
                  styles={styles}
                />
              ) : "subcategories" in currentMobileView ? (
                <MobileSubcategoryView
                  category={currentMobileView as CatalogCategory}
                  onBack={handleMobileBack}
                  onSubcategorySelect={handleMobileSubcategorySelect}
                  ChevronRight={ChevronRight}
                  styles={styles}
                />
              ) : (
                <MobileProductView
                  subcategory={currentMobileView as CatalogSubcategory}
                  onBack={handleMobileBack}
                  buildHref={buildHref}
                  closeMobile={closeMobile}
                  searchPlaceholder={tNav("searchPlaceholder")}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  SearchIcon={SearchIcon}
                  ChevronRight={ChevronRight}
                  styles={styles}
                />
              )}
          </div>
        </div>
      )}
    </nav>
  );
}

function MobileCatalogView({
  title,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  onBack,
  categories,
  onCategorySelect,
  SearchIcon,
  ChevronRight,
  styles: s,
}: {
  title: string;
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onBack: () => void;
  categories: CatalogCategory[];
  onCategorySelect: (c: CatalogCategory) => void;
  SearchIcon: React.ComponentType<{ className?: string }>;
  ChevronRight: React.ComponentType<{ className?: string }>;
  styles: Record<string, string>;
}) {
  return (
    <>
      <div className={s.mobileNavHeader}>
        <button type="button" className={s.mobileBack} onClick={onBack} aria-label="Back">
          <ChevronRight className={s.mobileBackIcon} />
        </button>
        <span className={s.mobileNavTitle}>{title}</span>
      </div>
      <div className={s.searchWrap}>
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={s.searchInput}
          aria-label="Search catalog"
        />
        <SearchIcon className={s.searchIcon} />
      </div>
      <ul className={s.mobileCategoryList}>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              className={s.mobileCategoryItem}
              onClick={() => onCategorySelect(cat)}
            >
              {cat.title}
              <ChevronRight className={s.mobileChevron} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function MobileSubcategoryView({
  category,
  onBack,
  onSubcategorySelect,
  ChevronRight,
  styles: s,
}: {
  category: CatalogCategory;
  onBack: () => void;
  onSubcategorySelect: (sub: CatalogSubcategory) => void;
  ChevronRight: React.ComponentType<{ className?: string }>;
  styles: Record<string, string>;
}) {
  return (
    <>
      <div className={s.mobileNavHeader}>
        <button type="button" className={s.mobileBack} onClick={onBack} aria-label="Back">
          <ChevronRight className={s.mobileBackIcon} />
        </button>
        <span className={s.mobileNavTitle}>{category.title}</span>
      </div>
      <ul className={s.mobileCategoryList}>
        {category.subcategories.map((sub) => (
          <li key={sub.id}>
            <button
              type="button"
              className={s.mobileCategoryItem}
              onClick={() => onSubcategorySelect(sub)}
            >
              {sub.title}
              <ChevronRight className={s.mobileChevron} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function MobileProductView({
  subcategory,
  onBack,
  buildHref,
  closeMobile,
  searchPlaceholder,
  searchQuery,
  onSearchChange,
  SearchIcon,
  ChevronRight,
  styles: s,
}: {
  subcategory: CatalogSubcategory;
  onBack: () => void;
  buildHref: (path: string) => string;
  closeMobile: () => void;
  searchPlaceholder: string;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  SearchIcon: React.ComponentType<{ className?: string }>;
  ChevronRight: React.ComponentType<{ className?: string }>;
  styles: Record<string, string>;
}) {
  const filtered = searchQuery
    ? subcategory.products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : subcategory.products;

  return (
    <>
      <div className={s.mobileNavHeader}>
        <button type="button" className={s.mobileBack} onClick={onBack} aria-label="Back">
          <ChevronRight className={s.mobileBackIcon} />
        </button>
        <span className={s.mobileNavTitle}>{subcategory.title}</span>
      </div>
      <div className={s.searchWrap}>
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={s.searchInput}
          aria-label="Search products"
        />
        <SearchIcon className={s.searchIcon} />
      </div>
      <ul className={s.mobileProductList}>
        {filtered.map((p) => (
          <li key={p.id}>
            <Link
              href={buildHref(p.href) as any}
              className={s.mobileProductItem}
              onClick={closeMobile}
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
