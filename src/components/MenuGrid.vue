<template>
  <div
    :class="{
      'menu-grid': true,
      clickable: props.clickable,
      selectable: props.selectable,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  clickable: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
});
</script>
