<template>
    <div :class="cssClasses" v-ripple>
        <div class="card-image" :style="'background-image: url(\'' + props.imageUrl + '\''" v-if="imageUrl"></div>
        <div class="card-image" v-else>
            <slot name="image" />
        </div>

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
import { PropType } from "vue";

const props = defineProps({
    imageUrl: {
        type: String,
        required: false,
    },
    class: {
        type: Object as PropType<string | string[]>,
        required: false,
        default: () => [] as string[],
    },
});

const cssClasses = ["card"];
if (typeof props.class === "string") {
    cssClasses.push(...props.class.split(" "));
} else {
    cssClasses.push(...props.class);
}
</script>
