import axios from "axios";

//import devProducts from "../../products-dev.json";

import { ProductResponseDTO } from "@/types";
import { bearerTokenRequestInterceptor, refreshTokenResponseInterceptor } from "@/plugins/authInterceptors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
    decompress: true,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept-Encoding": "compress, gzip",
        "Access-Control-Allow-Origin": "localhost",
    },
});

api.interceptors.request.use(bearerTokenRequestInterceptor, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => {
        return response;
    },
    async error => refreshTokenResponseInterceptor(error, api),
);

export default {
    async fetchProducts(): Promise<ProductResponseDTO> {
        const stub = "products";
        return await api.get(stub);
    },
};
