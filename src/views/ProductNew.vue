<template>
    <!-- <scanner-element @codeDetected="codeDetected" v-if="!currentEANCode" /> -->
    <ProductForm :ean-code="currentEANCode" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

import ProductForm from "@/components/ProductForm.vue";

const currentEANCode = ref<string | undefined>(undefined);
// const codeDetected = (code: string) => {
//   currentEANCode.value = code;
// };
</script>
