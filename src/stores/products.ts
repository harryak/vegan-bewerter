import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";

import api from "@/api/products";
import { Brand, Category, Product, Store } from "@/types/products";
import { ApiMapperService } from "@/services/apiMapper";
import { ProductRequestDTO } from "@/types";

export const useProductsStore = defineStore("products", () => {
    const brands: Ref<Brand[]> = ref([]);
    const categories: Ref<Category[]> = ref([]);
    const stores: Ref<Store[]> = ref([]);
    const products: Ref<Product[]> = ref([]);

    const filterOnBrandIDs: Ref<string[]> = ref([]);
    const filterOnCategoryIDs: Ref<string[]> = ref([]);
    const filterOnStoreIDs: Ref<string[]> = ref([]);

    const filteredProducts = computed(() =>
        products.value.filter(
            product =>
                (filterOnBrandIDs.value.length < 1 || filterOnBrandIDs.value.includes(product.brand.id)) &&
                (filterOnCategoryIDs.value.length < 1 ||
                    product.categories.some(category => filterOnCategoryIDs.value.includes(category.id))) &&
                (filterOnStoreIDs.value.length < 1 ||
                    product.stores.some(store => filterOnStoreIDs.value.includes(store.id))),
        ),
    );

    const apiMapperServiceInstance = ApiMapperService();

    const _fetchProducts = async (): Promise<void> => {
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
    };

    const synchronizeData = async (): Promise<void> => {
        try {
            await _fetchProducts();
        } catch (exception) {
            console.error(exception);
        }
    };

    const addNewBrand = async (brandName: string): Promise<Brand> => {
        return apiMapperServiceInstance.brandResponseDTOtoBrand(await api.addBrand(brandName));
    };

    const addNewCategory = async (categoryName: string): Promise<Category> => {
        return apiMapperServiceInstance.productCategoryResponseDTOtoCategory(
            await api.addProductCategory(categoryName),
        );
    };

    const addNewProduct = async (newProductDTO: ProductRequestDTO): Promise<Product> => {
        return apiMapperServiceInstance.productResponseDTOtoProduct(
            await api.addProduct(newProductDTO),
            brands.value,
            categories.value,
            stores.value,
        );
    };

    const addNewStore = async (storeName: string): Promise<Store> => {
        return apiMapperServiceInstance.storeResponseDTOtoStore(await api.addStore(storeName));
    };

    return {
        brands,
        categories,
        stores,
        products,

        filteredProducts,

        synchronizeData,

        addNewBrand,
        addNewCategory,
        addNewProduct,
        addNewStore,

        filterOnBrandIDs,
        filterOnCategoryIDs,
        filterOnStoreIDs,
    };
});
