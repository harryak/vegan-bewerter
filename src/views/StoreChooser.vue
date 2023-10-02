<template>
  <card-grid clickable>
    <card-element
      v-for="store in productsStore.stores"
      :key="store.id"
      :tabindex="store.id + 1"
      :imageUrl="goVeganUrl"
      @click="chooseStore(store.id)"
      @keypress.enter.prevent="chooseStore(store.id)"
    >
      <template v-slot:title>
        {{ store.name }}
      </template>
    </card-element>
  </card-grid>
</template>

<script lang="ts" setup>
//import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products";

import goVeganUrl from "@/common/assets/example_food.jpg";

//const router = useRouter();

const productsStore = useProductsStore();

productsStore.resetFilter("stores");

const chooseStore = (storeId: string): void => {
  productsStore.storesFilter = [storeId];
  //router.push({ path: "/brands", query: { storeIds: [storeId] } });
};
</script>
