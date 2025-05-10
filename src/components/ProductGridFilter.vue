<template>
    <div class="filter-wrapper">
        <ChipFilter
            label="Stores"
            :isCollapsible="true"
            :isCollapsed="true"
            v-model="storesToSelect"
            @update:modelValue="onSelectStore"
        >
        </ChipFilter>
        <ChipFilter
            label="Brands"
            :isCollapsible="true"
            :isCollapsed="true"
            v-model="brandsToSelect"
            @update:modelValue="onSelectBrand"
        >
        </ChipFilter>
        <div class="filter-clear-wrapper">
            <button class="filter-clear" @click="onClearFilters">Clear all filters</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useProductsStore } from "@/stores/products";
import ChipFilter from "./Forms/ChipFilter.vue";
import { ChipFilterItem } from "@/types/filter";

const productsStore = useProductsStore();

const storesToSelect: ChipFilterItem[] = productsStore.stores.map(store =>
    reactive({
        ...store,
        isSelected: false,
        isDisabled: false,
        isHidden: false,
    }),
);
const brandsToSelect: ChipFilterItem[] = productsStore.brands.map(brand =>
    reactive({
        ...brand,
        isSelected: false,
        isDisabled: false,
        isHidden: false,
    }),
);

const sortFilterItems = (filterItems: ChipFilterItem[]) => {
    filterItems.sort((brandA, brandB) => {
        if (brandA.isDisabled && !brandB.isDisabled) {
            return 1;
        }
        if (brandB.isDisabled && !brandA.isDisabled) {
            return -1;
        }
        return brandA.name.localeCompare(brandB.name);
    });
};

const toggleStoresAvailable = () => {
    const availableStores = productsStore.filteredProducts.flatMap(product => product.stores.map(store => store.id));

    storesToSelect.forEach(store => {
        store.isDisabled = !availableStores.includes(store.id);
    });
};

const toggleBrandsAvailable = () => {
    const availableBrands = productsStore.filteredProducts.map(product => product.brand.id);

    brandsToSelect.forEach(brand => {
        brand.isDisabled = !availableBrands.includes(brand.id);
    });
};

const onSelectStore = () => {
    productsStore.filterOnStoreIDs = storesToSelect.filter(store => store.isSelected).map(store => store.id);

    toggleBrandsAvailable();
    sortFilterItems(brandsToSelect);
};

const onSelectBrand = () => {
    productsStore.filterOnBrandIDs = brandsToSelect.filter(brand => brand.isSelected).map(brand => brand.id);

    toggleStoresAvailable();
    sortFilterItems(storesToSelect);
};

const onClearFilters = () => {
    storesToSelect.forEach(store => {
        store.isSelected = false;
    });
    onSelectStore();

    brandsToSelect.forEach(brand => {
        brand.isSelected = false;
    });
    onSelectBrand();
};

onSelectStore();
onSelectBrand();
</script>
