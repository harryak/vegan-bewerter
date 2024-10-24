<template>
    <div class="rating-star-wrapper">
        <span class="star-numbers">{{ formattedRating }}</span>

        <div class="rating-star">
            <SvgComponentStarFilled class="icon star-filler" :style="'--clip-width: ' + scaledClipFill + '%'" />
            <SvgComponentStar class="icon star-outline" />
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgComponentStar from "@/common/assets/icons/material-star.svg?component";
import SvgComponentStarFilled from "@/common/assets/icons/material-star-filled.svg?component";
import { computed } from "vue";

const props = defineProps({
    rating: {
        type: Number,
        required: true,
    },
});

const formatter = Intl.NumberFormat(navigator.language, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const formattedRating = computed(() => formatter.format(props.rating));
const scaledClipFill = computed(() => 30 + Math.round(props.rating * 8));
</script>
