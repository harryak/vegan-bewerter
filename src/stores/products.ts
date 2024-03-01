import { defineStore } from "pinia";
import { ref, Ref } from "vue";

import api from "../api/products";
import { Brand, Category, Product, Store } from "../types";

export const useProductsStore = defineStore("products", () => {
    const brands: Ref<Brand[]> = ref([]);
    const categories: Ref<Category[]> = ref([]);
    const stores: Ref<Store[]> = ref([]);
    const products: Ref<Product[]> = ref([]);

    const brandsIDFilter: Ref<string[]> = ref([]);
    const categoriesIDFilter: Ref<string[]> = ref([]);
    const storesIDFilter: Ref<string[]> = ref([]);

    const resetFilter = (filter: "brands" | "categories" | "stores" | ("brands" | "categories" | "stores")[]): void => {
        if (filter === "brands" || filter.includes("brands")) {
            brandsIDFilter.value = brands.value.map((brand: Brand) => brand.id);
        }

        if (filter === "categories" || filter.includes("categories")) {
            categoriesIDFilter.value = categories.value.map((categories: Category) => categories.id);
        }

        if (filter === "stores" || filter.includes("stores")) {
            storesIDFilter.value = stores.value.map((stores: Store) => stores.id);
        }
    };

    const resetAllFilters = (): void => {
        resetFilter(["brands", "categories", "stores"]);
    };

    const fetchData = async (): Promise<void> => {
        const data = await api.fetchProducts();

        brands.value = data.brands;
        categories.value = data.categories;
        stores.value = data.stores;
        products.value = data.products;

        resetAllFilters();
    };

    const brandsFiltered = (): Brand[] => {
        const storeIDs = storesIDFilter.value;

        const existingCombinations = products.value
            .filter((product: Product) => product.stores.some(productStore => storeIDs.indexOf(productStore) >= 0))
            .flatMap((product: Product) => product.brand);

        return brands.value.filter((brand: Brand) => existingCombinations.indexOf(brand.id) >= 0);
    };

    return {
        brands,
        categories,
        stores,
        products,
        brandsFilter: brandsIDFilter,
        categoriesFilter: categoriesIDFilter,
        storesFilter: storesIDFilter,
        fetchData,
        resetFilter,
        resetFilters: resetAllFilters,
        brandsFiltered,
    };
});
