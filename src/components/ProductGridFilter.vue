<template>
  <ul>
    <li v-for="brand in brandsToSelect" :key="brand.id">
      <p>{{ brand.name }}</p>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

const brandsToSelect = productsStore.brandsFiltered();
</script>
