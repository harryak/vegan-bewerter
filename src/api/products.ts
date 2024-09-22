import axios from "axios";

import { bearerTokenRequestInterceptor, refreshTokenResponseInterceptor } from "@/plugins/authInterceptors";
import {
    BrandRequestDTO,
    BrandResponseDTO,
    ProductCategoryRequestDTO,
    ProductCategoryResponseDTO,
    ProductRequestDTO,
    ProductResponseDTO,
    StoreRequestDTO,
    StoreResponseDTO,
} from "@/types";

//import devProducts from "../../products-dev.json";

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

    async addBrand(brandName: string): Promise<BrandResponseDTO> {
        const stub = "brands";
        const payload: BrandRequestDTO = { name: brandName };

        return (await api.post(stub, payload)).data;
    },

    async getProducts(): Promise<ProductResponseDTO[]> {
        const stub = "products";
        return (await api.get(stub)).data;
    },

    async addProduct(newProduct: ProductRequestDTO): Promise<ProductResponseDTO> {
        const stub = "products";
        const payload: ProductRequestDTO = newProduct;

        return (await api.post(stub, payload)).data;
    },

    async getProductCategories(): Promise<ProductCategoryResponseDTO[]> {
        const stub = "product-categories";
        return (await api.get(stub)).data;
    },

    async addProductCategory(productCategoryName: string): Promise<ProductCategoryResponseDTO> {
        const stub = "product-categories";
        const payload: ProductCategoryRequestDTO = { displayName: productCategoryName };

        return (await api.post(stub, payload)).data;
    },

    async getStores(): Promise<StoreResponseDTO[]> {
        const stub = "stores";
        return (await api.get(stub)).data;
    },

    async addStore(storeName: string): Promise<StoreResponseDTO> {
        const stub = "stores";
        const payload: StoreRequestDTO = { name: storeName };

        return (await api.post(stub, payload)).data;
    },
};
