<template>
  <div>
    <input type="text" v-model="ean" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  eanCode: {
    type: String,
    required: true,
  },
});

const ean = ref(props.eanCode);
</script>
