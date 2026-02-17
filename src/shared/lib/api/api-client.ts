import axios from "axios";

const API_BASE =
    (process.env.NEXT_PUBLIC_API_URL ?? "https://project1.ndc-agency.uz/api").replace(
        /\/$/,
        ""
    );

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 20000,
});