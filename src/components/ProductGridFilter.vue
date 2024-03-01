<template>
    <div class="product-grid-filter">
        <template v-for="brand in brandsToSelect" :key="brand.id">
            <chip-element>{{ brand.name }}</chip-element>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

const brandsToSelect = productsStore.brandsFiltered();
</script>
