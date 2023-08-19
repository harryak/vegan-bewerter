<template>
  <menu-grid clickable>
    <menu-grid-item
      v-for="store in productsStore.stores"
      :key="store.id"
      @click="chooseStore(store.id)"
    >
      {{ store.name }}
    </menu-grid-item>
  </menu-grid>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";

const router = useRouter();

const productsStore = useProductsStore();

productsStore.resetFilter("stores");

const chooseStore = (storeId: string): void => {
  productsStore.storesFilter = [storeId];
  router.push({ path: "/brands", query: { storeIds: [storeId] } });
};
</script>
