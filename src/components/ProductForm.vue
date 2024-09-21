<template>
    <div class="col-2">
        <div class="col-left">
            <TextInput
                label="EAN"
                type="text"
                v-model="ean"
                :required="true"
                :maxlength="13"
                :validation="validations.ean"
            />
            <TextInput label="Name" v-model="name" :required="true" />
            <DropdownElement
                label="Brand"
                @add-item="addNewBrand"
                :items="possibleBrands"
                :required="true"
                v-model="brand"
            />
            <ChipInput
                label="Stores"
                @add-item="addNewStore"
                :items="possibleStores"
                :required="true"
                v-model="stores"
            />
            <ChipInput
                label="Categories"
                @add-item="addNewCategory"
                :items="possibleProductCategories"
                v-model="productCategories"
            />
        </div>
        <div class="col-right">
            <PhotoElement />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useAppStateStore } from "@/stores/appState";
import { useProductsStore } from "@/stores/products";

import ChipInput from "./Forms/ChipInput.vue";
import DropdownElement from "./Forms/DropdownElement.vue";
import TextInput from "./Forms/TextInput.vue";
import PhotoElement from "./Forms/PhotoElement.vue";

const props = defineProps({
    eanCode: {
        type: String,
        required: false,
        default: "",
    },
});

const appState = useAppStateStore();
const productsStore = useProductsStore();
appState.isLoading = false;

const possibleBrands = productsStore.brands.map(brand => ({ id: brand.id, label: brand.name }));
const possibleProductCategories = productsStore.categories.map(category => ({ id: category.id, label: category.name }));
const possibleStores = productsStore.stores.map(store => ({ id: store.id, label: store.name }));

const ean = ref(props.eanCode);
const name = ref<string>("");
const brand = ref<string>("");
const stores = ref<string[]>([]);
const productCategories = ref<string[]>([]);

const validations: { [inputName: string]: (value: string) => string } = {
    ean: (value: string) =>
        value === parseInt(value).toString()
            ? value.length === 13
                ? ""
                : "Is exactly 13 digits."
            : "Has to be numeric.",
};

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
</script>
