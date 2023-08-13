<template>
  <van-grid square clickable column-num="2">
    <van-grid-item
      v-for="store in productsStore.stores"
      :key="store.id"
      :text="store.name"
      @click="chooseStore(store.id)"
    />
  </van-grid>
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
