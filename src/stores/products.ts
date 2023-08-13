import { defineStore } from "pinia";

import api from "../api/products";
import { Brand, Product, Store } from "../types";

export const useProductsStore = () => {
  const productsStoreBuilder = defineStore("products", {
    state: () => ({
      products: [] as Product[],
    }),

    getters: {
      stores(): Store[] {
        return this.products.flatMap((product) => product.store);
      },
    },

    actions: {
      async fetchProducts(): Promise<void> {
        this.products = await api.fetchProducts();
      },

      brandsForStore(store: Store): Brand[] {
        return this.products
          .filter((product) =>
            product.store.some((productStore) => productStore.id == store.id)
          )
          .flatMap((product) => product.brand);
      },

      $reset(): void {
        this.fetchProducts();
      },
    },
  });

  const productsStore = productsStoreBuilder();
  productsStore.$reset();
  return productsStore;
};
