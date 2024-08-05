import { Brand, Category, Product, Store } from "./products";

export interface ApiDTO {
    brands: Brand[];
    categories: Category[];
    stores: Store[];
    products: Product[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ProductDTO {}
