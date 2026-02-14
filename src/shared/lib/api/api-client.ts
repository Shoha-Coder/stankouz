import axios from "axios";

export const api = axios.create({
    baseURL: "https://project1.ndc-agency.uz/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 20000,
});