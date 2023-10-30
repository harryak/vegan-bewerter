<template>
  <div class="text-input-wrapper">
    <input
      :class="inputClasses"
      type="text"
      :id="uid"
      name="uid"
      v-model="inputModel"
    />
    <label class="text-input-label" :for="uid">{{ props.label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";

const uid =
  "text-input-" +
  Date.now().toString(36) +
  Math.random().toString(36).substring(2, 12);

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  initialValue: {
    type: String,
    required: false,
  },
});

const inputModel = ref<string>(props.initialValue ?? "");

const inputClasses = reactive({
  "text-input": true,
  filled: computed(() => inputModel.value !== ""),
});
</script>
