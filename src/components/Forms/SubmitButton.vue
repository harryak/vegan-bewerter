<template>
    <div class="submit-button">
        <button type="submit" v-ripple @click="$emit('submit')" @submit="$emit('submit')"><slot /></button>
    </div>
</template>

<script setup lang="ts">
defineEmits(["submit"]);
</script>
