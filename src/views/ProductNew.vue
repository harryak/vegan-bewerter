<template>
  <scanner-element @codeDetected="codeDetected" v-if="!currentEANCode" />
  <product-form :ean-code="currentEANCode" v-else />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const currentEANCode = ref<string | undefined>(undefined);
const codeDetected = (code: string) => {
  currentEANCode.value = code;
};
</script>
