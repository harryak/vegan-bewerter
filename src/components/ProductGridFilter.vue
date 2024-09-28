<template>
    <div>
        <ChipFilter label="Stores" v-model="storesToSelect" @update:modelValue="onSelectStore"> </ChipFilter>
    </div>
    <div>
        <ChipFilter label="Brands" v-model="brandsToSelect" @update:modelValue="onSelectBrand"> </ChipFilter>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useProductsStore } from "@/stores/products";
import ChipFilter from "./Forms/ChipFilter.vue";

const productsStore = useProductsStore();

const storesToSelect = productsStore.stores.map(store =>
    reactive({
        ...store,
        isSelected: false,
        isDisabled: false,
        isHidden: false,
    }),
);
const brandsToSelect = productsStore.brands.map(brand =>
    reactive({
        ...brand,
        isSelected: false,
        isDisabled: false,
        isHidden: false,
    }),
);

const onSelectStore = () => {
    productsStore.filterOnStoreIDs = storesToSelect.filter(store => store.isSelected).map(store => store.id);
    const availableBrands = productsStore.filteredProducts.map(product => product.brand.id);

    const areAllBrandsActive = availableBrands.length < 1;

    const disabledBrands: string[] = [];
    brandsToSelect.forEach(brand => {
        brand.isDisabled = !areAllBrandsActive && !availableBrands.includes(brand.id);
        if (brand.isDisabled) {
            disabledBrands.push(brand.id);
            brand.isSelected = false;
        }
    });
    productsStore.filterOnBrandIDs = productsStore.filterOnBrandIDs.filter(id => !disabledBrands.includes(id));

    brandsToSelect.sort((brandA, brandB) => {
        if (brandA.isDisabled && !brandB.isDisabled) {
            return 1;
        }
        if (brandB.isDisabled && !brandA.isDisabled) {
            return -1;
        }
        return brandA.name.localeCompare(brandB.name);
    });
};

const onSelectBrand = () => {
    productsStore.filterOnBrandIDs = brandsToSelect.filter(brand => brand.isSelected).map(brand => brand.id);
};
</script>
