<template>
    <ProductGridFilter />
    <CardGrid clickable>
        <CardElement
            v-for="(product, index) in productsStore.filteredProducts"
            :key="product.id"
            :tabindex="index + 1"
            :imageUrl="exampleImageUrl"
            @click="console.log('click')"
            @keypress.enter.prevent="console.log('click')"
        >
            <template v-slot:title>
                {{ product.name }}
            </template>
        </CardElement>
    </CardGrid>
    <FloatingActionButton icon="plus" @click="$router.push({ name: 'product-new' })" />
</template>

<script lang="ts" setup>
import CardGrid from "@/components/Components/CardGrid.vue";
import FloatingActionButton from "@/components/Components/FloatingActionButton.vue";
import ProductGridFilter from "@/components/ProductGridFilter.vue";

import { useProductsStore } from "@/stores/products";

import exampleImageUrl from "@/common/assets/example_food.jpg";
import CardElement from "@/components/Components/CardElement.vue";

const productsStore = useProductsStore();
await productsStore.synchronizeData();
productsStore.filterOnBrandIDs = [];
productsStore.filterOnCategoryIDs = [];
productsStore.filterOnStoreIDs = [];
</script>
