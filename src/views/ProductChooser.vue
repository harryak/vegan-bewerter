<template>
  <ul>
    <li v-for="brand in brandsToSelect" :key="brand.id">
      <van-button>{{ brand.name }}</van-button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

const brandsToSelect = productsStore.brandsFiltered();
</script>
