<template>
  <div style="display: flex; gap: 0.25rem; margin: 1rem 0">
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
