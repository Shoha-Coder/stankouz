import axios from "axios";

const API_BASE =
    (process.env.NEXT_PUBLIC_API_URL ?? "https://project1.ndc-agency.uz/api").replace(
        /\/$/,
        ""
    );

function getLocaleFromPathname(): string {
    if (typeof window === "undefined") return "ru";
    const segment = window.location.pathname.split("/")[1];
    return segment && /^[a-z]{2}(-[a-z]{2})?$/i.test(segment) ? segment : "ru";
}

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 20000,
});

api.interceptors.request.use((config) => {
    const locale = config.headers["Accept-Language"] ?? getLocaleFromPathname();
    config.headers["Accept-Language"] = locale;
    return config;
});