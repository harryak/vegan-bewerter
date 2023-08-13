<template>
  <div>
    <van-action-bar>
      <van-action-bar-icon
        icon="filter-o"
        text="Stores"
        to="stores"
        :badge="productsStore.storesFilter.length"
      />
      <van-action-bar-icon
        icon="filter-o"
        text="Brands"
        to="brands"
        :badge="productsStore.brandsFilter.length"
      />
    </van-action-bar>

    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
import { useProductsStore } from "./stores/products";

const productsStore = useProductsStore();
</script>
