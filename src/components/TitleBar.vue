<template>
  <div
    class="title-bar"
    :style="'clip-path: url(#title-bar-clip-path-' + uid + ');'"
  >
    <div
      class="title-bar-shade"
      :style="'clip-path: url(#title-bar-clip-path-' + uid + ');'"
    />

    <div
      class="title-bar-content-wrapper"
      :style="'clip-path: url(#title-bar-clip-path-' + uid + ');'"
    >
      <div class="title-bar-content">
        <slot />
      </div>
    </div>
    <svg height="0" width="0" viewBox="0 0 1 1">
      <defs>
        <clipPath
          :id="'title-bar-clip-path-' + uid"
          clipPathUnits="objectBoundingBox"
        >
          <path d="M 1 0.8 L 1 0 L 0 0 L 0 0.8 Q 0.25 1 0.5 0.8 T 1 0.8"></path>
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts" setup>
const uid = Date.now().toString(36) + Math.random().toString(36).substring(2);
</script>
