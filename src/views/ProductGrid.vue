<template>
  <product-grid-filter />
  <card-grid clickable>
    <card-element
      v-for="(product, index) in productsStore.products"
      :key="product.id"
      :tabindex="index + 1"
      :imageUrl="exampleImageUrl"
      @click="console.log('click')"
      @keypress.enter.prevent="console.log('click')"
    >
      <template v-slot:title>
        {{ product.name }}
      </template>
    </card-element>
  </card-grid>
</template>

<script lang="ts" setup>
import { useProductsStore } from "@/stores/products";

import exampleImageUrl from "@/common/assets/example_food.jpg";

const productsStore = useProductsStore();
</script>
