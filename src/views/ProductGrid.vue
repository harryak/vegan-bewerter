<template>
    <ProductGridFilter />

    <CardGrid clickable>
        <CardElement
            v-for="(product, index) in productsStore.filteredProducts"
            :key="product.id"
            :tabindex="index + 1"
            :imageUrl="exampleImageUrl"
            @click="$router.push({ name: 'product-details', params: { productId: product.id } })"
            @keypress.enter.prevent="$router.push({ name: 'product-details', params: { productId: product.id } })"
        >
            <template v-slot:title>
                {{ product.name }}
            </template>
            <template v-slot:subtitle>
                <RatingStar :rating="product.totalRating" />
            </template>
        </CardElement>
    </CardGrid>
    <FloatingActionButton
        icon="plus"
        @click="$router.push({ name: 'product-details', params: { productId: 'new' } })"
    />
</template>

<script lang="ts" setup>
import exampleImageUrl from "@/common/assets/example_food.jpg";
import CardElement from "@/components/Components/CardElement.vue";
import CardGrid from "@/components/Components/CardGrid.vue";
import FloatingActionButton from "@/components/Components/FloatingActionButton.vue";
import ProductGridFilter from "@/components/ProductGridFilter.vue";
import RatingStar from "@/components/Components/RatingStar.vue";

import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
await productsStore.synchronizeData();
productsStore.filterOnBrandIDs = [];
productsStore.filterOnCategoryIDs = [];
productsStore.filterOnStoreIDs = [];
</script>
