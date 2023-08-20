<template>
  <menu-grid clickable>
    <menu-grid-item
      v-for="brand in brandsToSelect"
      :key="brand.id"
      @click="chooseBrand(brand.id)"
    >
      {{ brand.name }}
    </menu-grid-item>
  </menu-grid>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

productsStore.resetFilter("brands");

const brandsToSelect = productsStore.brandsFiltered();

const chooseBrand = (brandId: string): void => {
  productsStore.storesFilter = [brandId];
};
</script>
