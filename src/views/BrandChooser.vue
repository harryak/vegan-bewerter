<template>
  <card-grid clickable>
    <card
      v-for="brand in brandsToSelect"
      :key="brand.id"
      @click="chooseBrand(brand.id)"
    >
      {{ brand.name }}
    </card>
  </card-grid>
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
