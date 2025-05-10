<template>
    <!-- <scanner-element @codeDetected="codeDetected" v-if="!currentEANCode" /> -->
    <product-form v-model="product" :ean-code="currentEANCode" :is-new="isNewProduct" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import ProductForm from "@/components/ProductForm.vue";
import { useProductsStore } from "@/stores/products";
import { useRoute } from "vue-router";
import { Product } from "@/types";

const productStore = useProductsStore();

await productStore.synchronizeData();

const route = useRoute();
const isNewProduct = !("productId" in route.params) || !route.params.productId || route.params.productId === "new";

let product: Partial<Product> | Product = {};

if (!isNewProduct) {
    const productId = route.params.productId as string;
    product = productStore.getProduct(productId) ?? product;
}

const currentEANCode = ref<string | undefined>(undefined);
// const codeDetected = (code: string) => {
//   currentEANCode.value = code;
// };
</script>
