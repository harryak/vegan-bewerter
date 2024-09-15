import { defineStore } from "pinia";
import { ref, Ref } from "vue";

import api from "@/api/products";
import { Brand, Category, Product, Store } from "@/types/products";
import { ApiMapperService } from "@/services/apiMapper";

export const useProductsStore = defineStore("products", () => {
    const brands: Ref<Brand[]> = ref([]);
    const categories: Ref<Category[]> = ref([]);
    const stores: Ref<Store[]> = ref([]);
    const products: Ref<Product[]> = ref([]);

    const brandsIDFilter: Ref<string[]> = ref([]);
    const categoriesIDFilter: Ref<string[]> = ref([]);
    const storesIDFilter: Ref<string[]> = ref([]);

    const apiMapperServiceInstance = ApiMapperService();

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
        const [brandDTOs, productCategoryDTOs, productDTOs, storeDTOs] = await Promise.all([
            api.getBrands(),
            api.getProductCategories(),
            api.getProducts(),
            api.getStores(),
        ]);

        brands.value = brandDTOs.map(apiMapperServiceInstance.brandResponseDTOtoBrand);
        categories.value = productCategoryDTOs.map(apiMapperServiceInstance.productCategoryResponseDTOtoCategory);
        stores.value = storeDTOs.map(apiMapperServiceInstance.storeResponseDTOtoStore);

        products.value = productDTOs.map(dto =>
            apiMapperServiceInstance.productResponseDTOtoProduct(dto, brands.value, categories.value, stores.value),
        );

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
