<template><div class=""></div></template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
const products = await productsStore.fetchData();

console.log(products);
</script>
