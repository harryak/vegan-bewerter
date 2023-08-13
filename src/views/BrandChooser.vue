<template>
  <van-grid square clickable column-num="2">
    <van-grid-item
      v-for="brand in brandsToSelect"
      :key="brand.id"
      :text="brand.name"
      @click="chooseBrand(brand.id)"
    />
  </van-grid>
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
