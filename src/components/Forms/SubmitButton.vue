<template>
    <div class="submit-button">
        <button type="submit" v-ripple @click="$emit('submit')" @submit="$emit('submit')">{{ label }}</button>
    </div>
</template>

<script setup lang="ts">
defineEmits(["submit"]);

defineProps({
    label: {
        type: String,
        required: true,
    },
});
</script>
