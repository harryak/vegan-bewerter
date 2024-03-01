<template>
    <div class="floating-action-button-container">
        <object class="icon" :data="iconPath" type="image/svg+xml" :aria-hidden="true" />
        <div role="button" class="floating-action-button" v-ripple />
    </div>
</template>

<script lang="ts" setup>
import iconPathPlus from "@/common/assets/icons/material-add.svg";

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

const iconPath = props.icon === "plus" ? iconPathPlus : "";
</script>
