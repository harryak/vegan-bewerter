import axios from "axios";

//import devProducts from "../../products-dev.json";

import { BrandResponseDTO, ProductCategoryResponseDTO, ProductResponseDTO, StoreResponseDTO } from "@/types";
import { bearerTokenRequestInterceptor, refreshTokenResponseInterceptor } from "@/plugins/authInterceptors";

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
    async getBrands(): Promise<BrandResponseDTO[]> {
        const stub = "brands";
        return (await api.get(stub)).data;
    },

    async getProducts(): Promise<ProductResponseDTO[]> {
        const stub = "products";
        return (await api.get(stub)).data;
    },

    async getProductCategories(): Promise<ProductCategoryResponseDTO[]> {
        const stub = "product-categories";
        return (await api.get(stub)).data;
    },

    async getStores(): Promise<StoreResponseDTO[]> {
        const stub = "stores";
        return (await api.get(stub)).data;
    },
};
