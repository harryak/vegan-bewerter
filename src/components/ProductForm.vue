<template>
  <div class="w-50">
    <text-input
      label="EAN"
      type="text"
      :initialValue="ean"
      :required="true"
      :maxlength="13"
      :validation="
        (value: string) =>
          value === parseInt(value).toString() ? '' : 'Muss numerisch sein.'
      "
    />
    <text-input label="Name" :initialValue="ean" />
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
