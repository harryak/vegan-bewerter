<template>
  <!-- <p v-if="cameraError">
      ERROR INITIALIZING CAMERA ${JSON.stringify(cameraError)} -- DO YOU HAVE
      PERMISSION?
    </p>
    <p v-if="cameras.length === 0">
      Enumerating Cameras, browser may be prompting for permissions beforehand
    </p>
    <form v-else>
      <select @change="(event) => (cameraId = event.target?.value)">
        <option
          v-for="camera of cameras"
          :key="camera.deviceId"
          :value="camera.deviceId"
        >
          {{ camera.label || camera.deviceId }}
        </option>
      </select>
    </form>
    <ul className="results"></ul> -->
  <scanner-element />
</template>

<script lang="ts" setup></script>
