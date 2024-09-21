<template>
    <span :class="chipClasses">
        <input type="checkbox" :id="uid" @change="changeSelected" :checked="isActive" v-if="isToggleable" />
        <label :for="uid">
            <SvgComponentCheck
                :class="{
                    'svg-icon': true,
                    'icon-check': true,
                    hidden: !isToggleable || !isActive,
                }"
                :aria-hidden="true"
            />
            <p>
                <slot />
            </p>
            <SvgComponentClear
                :class="{
                    'svg-icon': true,
                    'icon-clear': true,
                    hidden: !isClearable,
                }"
                :aria-hidden="true"
                v-if="isClearable"
                @click="$emit('clear')"
            />
        </label>
    </span>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue";
import { generateUid } from "@/utilities/generateUid";

const uid = "chip-" + generateUid();

import SvgComponentCheck from "@/common/assets/icons/material-check.svg?component";
import SvgComponentClear from "@/common/assets/icons/material-close.svg?component";

const props = defineProps({
    selected: {
        type: Boolean,
        required: false,
        default: false,
    },
    type: {
        type: String,
        required: true,
        default: "filter",
    },
    hidden: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(["change", "clear"]);

const isToggleable = ["filter"].indexOf(props.type) >= 0;
const isClearable = ["input"].indexOf(props.type) >= 0;

const isHidden = computed(() => props.hidden);
watch(
    () => props.hidden,
    () => (isActive.value = !props.hidden && (!isToggleable || isActive.value)),
);
const isActive = ref((props.selected || !isToggleable) && !props.hidden);

const chipClasses = reactive({
    chip: true,
    filter: props.type === "filter",
    active: isActive,
    hidden: isHidden,
});

const changeSelected = () => {
    if (!isToggleable) {
        return;
    }

    isActive.value = !isActive.value;
    emit("change", isActive.value);
};
</script>
