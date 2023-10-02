<template>
  <div class="card" v-ripple>
    <div
      class="card-image"
      :style="'background-image: url(\'' + props.imageUrl + '\''"
      v-if="imageUrl"
    ></div>
    <div class="card-content">
      <div class="card-title">
        <slot name="title" />
      </div>
      <div class="card-subtitle">
        <slot name="subtitle" />
      </div>
      <slot />
      <div class="card-buttons">
        <slot name="card-buttons" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  imageUrl: {
    type: String,
    required: false,
  },
});
</script>
