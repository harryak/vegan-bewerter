import { Brand, Category, Product, Store } from "@/types/products";
import { BrandResponseDTO, ProductCategoryResponseDTO, ProductResponseDTO, StoreResponseDTO } from "@/types/api";

export const ApiMapperService = () => {
    const brandResponseDTOtoBrand = (dto: BrandResponseDTO): Brand => {
        return {
            id: dto.id,
            name: dto.name,
        };
    };

    const productCategoryResponseDTOtoCategory = (dto: ProductCategoryResponseDTO): Category => {
        return {
            id: dto.id,
            name: dto.displayName,
        };
    };

    const productResponseDTOtoProduct = (
        dto: ProductResponseDTO,
        brands: Brand[],
        categories: Category[],
        stores: Store[],
    ): Product => {
        return {
            id: dto.id,
            name: dto.displayName,

            brand: brands.find(brand => brand.id === dto.brand)?.name ?? "",
            categories: dto.categories
                .map(categoryId => categories.find(category => category.id === categoryId)?.name)
                .filter(entry => entry !== undefined),
            ratings: [],
            stores: dto.stores
                .map(storeId => stores.find(store => store.id === storeId)?.name)
                .filter(entry => entry !== undefined),
        };
    };

    const storeResponseDTOtoStore = (dto: StoreResponseDTO): Store => {
        return {
            id: dto.id,
            name: dto.name,
        };
    };

    return {
        brandResponseDTOtoBrand,
        productCategoryResponseDTOtoCategory,
        productResponseDTOtoProduct,
        storeResponseDTOtoStore,
    };
};
