<template>
    <span :class="chipClasses">
        <input
            v-if="isToggleable"
            :checked="isSelected"
            :disabled="disabled"
            :id="uid"
            type="checkbox"
            @change="changeSelected"
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
                v-if="isClearable"
                :aria-hidden="true"
                :class="{
                    'svg-icon': true,
                    'icon-clear': true,
                    hidden: !isClearable,
                }"
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
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    hidden: {
        type: Boolean,
        required: false,
        default: false,
    },
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
});

const emit = defineEmits(["change", "clear"]);

const isToggleable = computed(() => ["filter"].indexOf(props.type) >= 0 && !props.disabled);
const isClearable = computed(() => ["input"].indexOf(props.type) >= 0 && !props.disabled);

const isDisabled = computed(() => props.disabled);
const isHidden = computed(() => props.hidden);

const isSelected = computed(() => !props.disabled && (props.selected || !isToggleable.value) && !props.hidden);

const chipClasses = reactive({
    chip: true,
    filter: props.type === "filter",

    active: isSelected,
    disabled: isDisabled,
    hidden: isHidden,
});

const changeSelected = () => {
    if (!isToggleable.value) {
        return;
    }

    emit("change", !isSelected.value);
};
</script>
