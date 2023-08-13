import { defineStore } from "pinia";

import api from "../api/products";
import { Brand, Category, Product, Store } from "../types";

export const useProductsStore = () => {
  const productsStoreBuilder = defineStore("products", {
    state: () => ({
      brands: [] as Brand[],
      categories: [] as Category[],
      stores: [] as Store[],
      products: [] as Product[],
    }),

    getters: {
      //
    },

    actions: {
      async fetchData(): Promise<void> {
        const data = await api.fetchProducts();

        this.brands = data.brands;
        this.categories = data.categories;
        this.stores = data.stores;
        this.products = data.products;
      },

      brandsForStore(store: Store): Brand[] {
        const existingCombinations = this.products
          .filter((product) =>
            product.stores.some((productStore) => productStore == store.id)
          )
          .flatMap((product) => product.brand);

        return this.brands.filter(
          (brand) => existingCombinations.indexOf(brand.id) >= 0
        );
      },

      $reset(): void {
        this.fetchData();
      },
    },
  });

  const productsStore = productsStoreBuilder();
  productsStore.$reset();
  return productsStore;
};
