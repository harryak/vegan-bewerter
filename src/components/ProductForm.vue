<template>
    <div class="col-2">
        <div class="col-left col-bottom">
            <text-input
                label="EAN"
                type="text"
                v-model="ean"
                v-model:is-valid="isEANValid"
                :required="true"
                :maxlength="13"
                :validation="validations.ean"
            />
            <text-input label="Name" v-model="name" v-model:is-valid="isNameValid" :required="true" />
            <dropdown-element
                label="Brand"
                @add-item="addNewBrand"
                :items="possibleBrands"
                :required="true"
                v-model="brand"
                v-model:is-valid="isBrandValid"
            />
            <chip-input
                label="Stores"
                @add-item="addNewStore"
                :items="possibleStores"
                :required="true"
                v-model="stores"
                v-model:is-valid="areStoresValid"
            />
            <chip-input
                label="Categories"
                @add-item="addNewCategory"
                :items="possibleProductCategories"
                v-model="productCategories"
                v-model:is-valid="areCategoriesValid"
            />
        </div>
        <div class="col-right col-top">
            <PhotoElement />
        </div>
    </div>

    <SubmitButton label="Add product" @submit="saveProduct" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import { useAppStateStore } from "@/stores/appState";
import { useProductsStore } from "@/stores/products";

import ChipInput from "./Forms/ChipInput.vue";
import DropdownElement from "./Forms/DropdownElement.vue";
import TextInput from "./Forms/TextInput.vue";
import PhotoElement from "./Forms/PhotoElement.vue";
import { Product } from "@/types";

const props = defineProps({
    eanCode: {
        type: String,
        required: false,
        default: undefined,
    },
});

const inputModel = defineModel<Partial<Product> | Product>({ default: {} });

const appState = useAppStateStore();
const productsStore = useProductsStore();
appState.isLoading = false;

const possibleBrands = productsStore.brands.map(brand => ({ id: brand.id, label: brand.name }));
const possibleProductCategories = productsStore.categories.map(category => ({ id: category.id, label: category.name }));
const possibleStores = productsStore.stores.map(store => ({ id: store.id, label: store.name }));

const ean = ref(props.eanCode ?? inputModel.value.eans?.[0] ?? "");
const isEANValid = ref(false);

const name = ref<string>(inputModel.value.name ?? "");
const isNameValid = ref(false);

const brand = ref<string>(inputModel.value.brand?.name ?? "");
const isBrandValid = ref(false);

const stores = ref<string[]>(inputModel.value.stores?.map(store => store.id) ?? []);
const areStoresValid = ref(false);

const productCategories = ref<string[]>(inputModel.value.categories?.map(category => category.id) ?? []);
const areCategoriesValid = ref(false);

const validations: { [inputName: string]: (value: string) => string } = {
    ean: (value: string) =>
        value === parseInt(value).toString()
            ? value.length === 13
                ? ""
                : "Is exactly 13 digits."
            : "Has to be numeric.",
};

const isValid = computed(() => {
    return (
        isEANValid.value && isNameValid.value && isBrandValid.value && areStoresValid.value && areCategoriesValid.value
    );
});

const addNewBrand = async (brandName: string) => {
    appState.isLoading = true;
    const newBrand = await productsStore.addNewBrand(brandName);

    possibleBrands.push({ id: newBrand.id, label: newBrand.name });
    brand.value = newBrand.id;

    appState.isLoading = false;
};

const addNewCategory = async (categoryName: string) => {
    appState.isLoading = true;
    const newCategory = await productsStore.addNewCategory(categoryName);

    possibleProductCategories.push({ id: newCategory.id, label: newCategory.name });
    productCategories.value.push(newCategory.id);

    appState.isLoading = false;
};

const addNewStore = async (storeName: string) => {
    appState.isLoading = true;
    const newStore = await productsStore.addNewStore(storeName);

    possibleStores.push({ id: newStore.id, label: newStore.name });
    stores.value.push(newStore.id);

    appState.isLoading = false;
};

const saveProduct = async () => {
    if (!isValid.value) {
        return;
    }

    // inputModel.value = {
    //     brand: brand.value,
    //     displayName: name.value,
    //     eans: [ean.value],
    //     stores: stores.value,
    //     categories: productCategories.value,
    //     ratings: [],
    //     totalRating: 0,
    // };

    // await productsStore.addNewProduct(inputModel.value);
};
</script>
