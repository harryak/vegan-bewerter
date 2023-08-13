import { Brand, Category, Product, Store } from "./products";

export interface ApiDTO {
  brands: Brand[];
  categories: Category[];
  stores: Store[];
  products: Product[];
}
