<template>
  <ul>
    <li v-for="store in productsStore.stores" :key="store.id">
      <van-button>{{ store.name }}</van-button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useProductsStore } from "../stores/products";

const productsStore = useProductsStore();
</script>
