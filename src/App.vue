<template>
    <title-bar>
        <div>Vegan-Bewerter</div>
    </title-bar>

    <main>
        <RouterView />
    </main>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
// import { useProductsStore } from "./stores/products";

// const productsStore = useProductsStore();

// await productsStore.fetchData();
</script>
