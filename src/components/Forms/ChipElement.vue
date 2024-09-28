<template>
    <span :class="chipClasses">
        <input
            type="checkbox"
            :id="uid"
            @change="changeSelected"
            :checked="isSelected"
            :disabled="disabled"
            v-if="isToggleable"
        />
        <label :for="uid">
            <SvgComponentCheck
                :class="{
                    'svg-icon': true,
                    'icon-check': true,
                    hidden: !isToggleable || !isSelected,
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
import { computed, reactive } from "vue";
import { generateUid } from "@/utilities/generateUid";

const uid = "chip-" + generateUid();

import SvgComponentCheck from "@/common/assets/icons/material-check.svg?component";
import SvgComponentClear from "@/common/assets/icons/material-close.svg?component";

const props = defineProps({
    type: {
        type: String,
        required: true,
        default: "filter",
    },
    selected: {
        type: Boolean,
        required: false,
        default: false,
    },
    hidden: {
        type: Boolean,
        required: false,
        default: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(["change", "clear"]);

const isToggleable = ["filter"].indexOf(props.type) >= 0 && !props.disabled;
const isClearable = ["input"].indexOf(props.type) >= 0;

const isDisabled = computed(() => props.disabled);
const isHidden = computed(() => props.hidden);

const isSelected = computed(() => !props.disabled && (props.selected || !isToggleable) && !props.hidden);

const chipClasses = reactive({
    chip: true,
    filter: props.type === "filter",

    active: isSelected,
    disabled: isDisabled,
    hidden: isHidden,
});

const changeSelected = () => {
    if (!isToggleable) {
        return;
    }

    emit("change", !isSelected.value);
};
</script>
