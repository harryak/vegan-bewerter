import { Brand, Category, Product, Store } from "./products";

export interface ApiDTO {
    brands: Brand[];
    categories: Category[];
    stores: Store[];
    products: Product[];
}

export interface ProductResponseDTO {
    id: string;
    brand: string;
    displayName: string;
    eans: string[];
    stores: string[];
    categories: string[];
    ratings: number[];
    totoalRating: number;
}
