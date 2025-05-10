<template>
    <div class="text-input-wrapper">
        <input
            v-model="inputValue"
            :class="inputClasses"
            :disabled="disabled"
            :id="uid"
            :maxlength="props.maxlength"
            name="uid"
            :required="props.required"
            type="text"
            @blur.stop.prevent="$emit('blur')"
            @focus="$emit('focus')"
            @keypress.enter="$emit('submit')"
        />
        <label class="text-input-label" :for="uid" v-if="props.label">{{ props.label }}</label>
        <button
            v-if="submitButton"
            class="text-input-submit-button"
            type="submit"
            @blur="$emit('blur')"
            @click.prevent="$emit('submit')"
            @focus="$emit('focus')"
            v-ripple
        >
            <SvgComponentAdd v-if="submitButton === 'add'" />
        </button>
        <div class="text-input-messages">
            <p v-if="!disabled && validationMessage" class="validation-message">
                {{ validationMessage }}
            </p>
            <p v-if="!disabled && props.maxlength" class="character-counter">
                {{ `${inputValue.length}/${props.maxlength}` }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";

import SvgComponentAdd from "@/common/assets/icons/material-add.svg?component";

import { generateUid } from "@/utilities/generateUid";

const uid = "text-input-" + generateUid();

const props = defineProps({
    active: {
        type: Boolean,
        required: false,
        default: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    label: {
        type: String,
        required: false,
        default: "",
    },
    maxlength: {
        type: Number,
        required: false,
    },
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
    submitButton: {
        type: String,
        required: false,
        default: "",
        validator(value: unknown): boolean {
            return typeof value === "string" && ["", "submit", "add"].indexOf(value) >= 0;
        },
    },
    validation: {
        type: Function,
        required: false,
    },
});

defineEmits(["submit", "focus", "blur"]);

const inputValue = defineModel<string>({ default: "" });
const isValid = defineModel<boolean>("isValid", { default: false });

const recheckIsValid = (modelValue: string) =>
    (!props.required || !!modelValue) && (!props.validation || props.validation(modelValue) === "");

isValid.value = recheckIsValid(inputValue.value);

watch(inputValue, newInputValue => {
    isValid.value = recheckIsValid(newInputValue);
});

const validationMessage = computed<string>(() => {
    if (props.required && !inputValue.value) {
        return "Required";
    }
    return props.validation ? props.validation(inputValue.value) : "";
});

const inputClasses = reactive({
    "text-input": true,
    filled: computed(() => inputValue.value !== ""),
    "has-message": computed(() => validationMessage.value !== ""),
    active: computed(() => props.active),
    "is-invalid": computed(() => inputValue.value !== "" && !isValid.value),
});
</script>
