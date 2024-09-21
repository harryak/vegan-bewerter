<template>
    <div class="floating-action-button-container">
        <SvgComponentPlus class="icon" :aria-hidden="true" v-if="icon === 'plus'" />
        <div role="button" class="floating-action-button" v-ripple />
    </div>
</template>

<script lang="ts" setup>
import SvgComponentPlus from "@/common/assets/icons/material-add.svg?component";

defineProps({
    icon: {
        type: String,
        required: true,
        default: "plus",

        validator(value: unknown): boolean {
            return typeof value === "string" && ["plus"].includes(value);
        },
    },
});
</script>
