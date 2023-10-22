<template>
  <span :class="chipClasses">
    <input
      type="checkbox"
      :id="uid"
      @change="isActive = !isActive"
      :checked="isActive"
    />
    <label :for="uid">
      <object
        :data="CheckmarkSVGUrl"
        type="image/svg+xml"
        :class="{ hidden: !isActive }"
        :aria-hidden="true"
      />
      <p>
        <slot />
      </p>
    </label>
  </span>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const uid =
  Date.now().toString(36) + Math.random().toString(36).substring(2, 12);

import CheckmarkSVGUrl from "@/common/assets/icons/material-check.svg";

const props = defineProps({
  filter: {
    type: Boolean,
    required: false,
    default: false,
  },
  selected: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isActive = ref(props.selected);

const chipClasses = reactive({
  chip: true,
  filter: props.filter,
  active: isActive,
});
</script>
