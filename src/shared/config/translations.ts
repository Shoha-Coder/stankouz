import type { AbstractIntlMessages } from "next-intl";
import { defaultLocale, locales as fallbackLocales } from "./i18n";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const TRANSLATIONS_URL = `${API_BASE}/translations`;
const LOCALES_URL = `${API_BASE}/locales`;

type FlatMessages = Record<string, string>;
type NestedMessages = Record<string, unknown>;


const BACKEND_TO_HEADER: Record<string, string> = {
  "menu.phone": "header.topBar.phone",
  "menu.email": "header.topBar.email",
  "footer.address": "header.topBar.address",
  "main.catalog": "header.nav.catalog",
  "main.about": "header.nav.about",
  "main.lab": "header.nav.labs",
  "main.stanoklar": "header.nav.products",
  "main.products": "header.nav.machines",
  "main.vacancies": "header.nav.jobs",
  "main.news": "header.nav.news",
  "main.contacts": "header.nav.contacts",
  "main.seaech-text": "header.nav.searchPlaceholder",
};

async function fetchLocales(): Promise<{ locales: string[]; defaultLocale: string }> {
  if (!API_BASE) {
    return { locales: [...fallbackLocales], defaultLocale };
  }
  try {
    const res = await fetch(LOCALES_URL, { cache: "no-store" });
    if (!res.ok) return { locales: [...fallbackLocales], defaultLocale };

    const raw = (await res.json()) as
      | string[]
      | { locales: string[]; defaultLocale?: string }
      | { data: { locales: string[]; defaultLocale?: string } };
    let data: { locales: string[]; defaultLocale: string };
    if (Array.isArray(raw)) {
      data = { locales: raw, defaultLocale: raw[0] ?? defaultLocale };
    } else if (raw && typeof raw === "object" && "data" in raw && raw.data) {
      const d = raw.data;
      data = { locales: d.locales ?? [], defaultLocale: d.defaultLocale ?? defaultLocale };
    } else if (raw && typeof raw === "object" && "locales" in raw) {
      const r = raw as { locales: string[]; defaultLocale?: string };
      data = { locales: r.locales ?? [], defaultLocale: r.defaultLocale ?? defaultLocale };
    } else {
      data = { locales: [...fallbackLocales], defaultLocale };
    }

    return {
      locales: Array.isArray(data.locales) ? data.locales : [...fallbackLocales],
      defaultLocale: data.defaultLocale ?? defaultLocale,
    };
  } catch {
    return { locales: [...fallbackLocales], defaultLocale };
  }
}

function resolveLocale(
  locale: string | undefined,
  serverLocales: string[],
  serverDefault: string
): string {
  if (!locale) return serverDefault;
  return serverLocales.includes(locale) ? locale : serverDefault;
}

function setByPath(obj: NestedMessages, path: string, value: string): void {
  const keys = path.split(".");
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const existing = current[key];
    if (!existing || typeof existing !== "object" || Array.isArray(existing)) {
      current[key] = {};
    }
    current = current[key] as NestedMessages;
  }
  current[keys[keys.length - 1]] = value;
}

function flatToNested(flat: FlatMessages): NestedMessages {
  const result: NestedMessages = {};
  for (const [key, value] of Object.entries(flat)) {
    setByPath(result, key, value);
    const headerPath = BACKEND_TO_HEADER[key];
    if (headerPath) setByPath(result, headerPath, value);
  }
  return result;
}

function mergeDeep(target: NestedMessages, source: NestedMessages): void {
  for (const [key, value] of Object.entries(source)) {
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      const existing = target[key];
      if (existing !== null && typeof existing === "object" && !Array.isArray(existing)) {
        mergeDeep(existing as NestedMessages, value as NestedMessages);
      } else {
        target[key] = { ...(value as NestedMessages) };
      }
    } else {
      target[key] = value;
    }
  }
}

async function fetchFromApi(locale: string): Promise<FlatMessages | null> {
  if (!API_BASE) return null;

  const res = await fetch(TRANSLATIONS_URL, {
    headers: { "Accept-Language": locale },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const raw = (await res.json()) as unknown;
  const flat =
    raw &&
    typeof raw === "object" &&
    "data" in raw &&
    raw.data &&
    typeof raw.data === "object"
      ? (raw.data as FlatMessages)
      : (raw as FlatMessages);

  return flat && typeof flat === "object" ? flat : null;
}

/**
 * Returns available locales from the server. Falls back to local config if API fails.
 */
export async function getLocales(): Promise<{ locales: string[]; defaultLocale: string }> {
  return fetchLocales();
}

/**
 * Returns merged translations for the given locale.
 * Fetches from API first, falls back to local messages, merges with API taking precedence.
 * Uses server locales for validation.
 */
export async function getTranslations(locale: string | undefined): Promise<{
  locale: string;
  messages: AbstractIntlMessages;
}> {
  const { locales: serverLocales, defaultLocale: serverDefault } = await fetchLocales();
  const validLocale = resolveLocale(locale, serverLocales, serverDefault);

  const localeToLoad =
    fallbackLocales.includes(validLocale as (typeof fallbackLocales)[number])
      ? validLocale
      : fallbackLocales.includes(serverDefault as (typeof fallbackLocales)[number])
        ? serverDefault
        : defaultLocale;

  const local = (await import(`../../messages/${localeToLoad}.json`))
    .default as NestedMessages;

  const apiFlat = await fetchFromApi(validLocale);
  if (!apiFlat || Object.keys(apiFlat).length === 0) {
    return { locale: validLocale, messages: local as AbstractIntlMessages };
  }

  const apiNested = flatToNested(apiFlat);
  const merged = JSON.parse(JSON.stringify(local)) as NestedMessages;
  mergeDeep(merged, apiNested);

  return { locale: validLocale, messages: merged as AbstractIntlMessages };
}
