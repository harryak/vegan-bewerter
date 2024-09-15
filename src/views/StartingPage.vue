<template><div class=""></div></template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

await productsStore.fetchData();
</script>
