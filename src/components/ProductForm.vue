<template>
    <div class="col-2">
        <div class="col-left col-bottom">
            <TextInput
                v-model="ean"
                v-model:is-valid="isEANValid"
                :disabled="!isEditingActive"
                label="EAN"
                :maxlength="13"
                :required="true"
                type="text"
                :validation="validations.ean"
            />
            <TextInput
                v-model="name"
                v-model:is-valid="isNameValid"
                :disabled="!isEditingActive"
                label="Name"
                :required="true"
            />
            <DropdownElement
                v-model="brand"
                v-model:is-valid="isBrandValid"
                :disabled="!isEditingActive"
                label="Brand"
                :items="possibleBrands"
                :required="true"
                @add-item="addNewBrand"
            />
            <ChipInput
                v-model="stores"
                v-model:is-valid="areStoresValid"
                :disabled="!isEditingActive"
                label="Stores"
                :items="possibleStores"
                :required="true"
                @add-item="addNewStore"
            />
            <ChipInput
                v-model="productCategories"
                v-model:is-valid="areCategoriesValid"
                :disabled="!isEditingActive"
                label="Categories"
                :items="possibleProductCategories"
                @add-item="addNewCategory"
            />
        </div>
        <div class="col-right col-top">
            <PhotoElement v-if="isNew" />
            <img v-else :src="exampleImageUrl" />
        </div>
    </div>

    <SubmitButton v-if="isEditingActive" @submit="saveProduct">{{ submitLabel }}</SubmitButton>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

import exampleImageUrl from "@/common/assets/example_food.jpg";

import { Product } from "@/types";

import { useAppStateStore } from "@/stores/appState";
import { useProductsStore } from "@/stores/products";

import ChipInput from "./Forms/ChipInput.vue";
import DropdownElement from "./Forms/DropdownElement.vue";
import PhotoElement from "./Forms/PhotoElement.vue";
import SubmitButton from "./Forms/SubmitButton.vue";
import TextInput from "./Forms/TextInput.vue";

const props = defineProps({
    eanCode: {
        type: String,
        required: false,
        default: undefined,
    },
    isNew: {
        type: Boolean,
        required: false,
        default: false,
    },
    active: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const inputModel = defineModel<Partial<Product> | Product>({ default: {} });

const appState = useAppStateStore();
const productsStore = useProductsStore();
appState.isLoading = false;

const submitLabel = props.isNew ? "Add product" : "Save product";

const isEditingActive = ref(props.active);

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
