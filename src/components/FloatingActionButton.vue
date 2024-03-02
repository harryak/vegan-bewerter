<template>
    <div class="floating-action-button-container">
        <PlusSVGComponent class="icon" :aria-hidden="true" v-if="icon === 'plus'" />
        <div role="button" class="floating-action-button" v-ripple />
    </div>
</template>

<script lang="ts" setup>
import PlusSVGComponent from "@/common/assets/icons/material-add.svg?component";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
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
