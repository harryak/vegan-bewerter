<template>
    <div class="text-input-wrapper">
        <input
            :class="inputClasses"
            :id="uid"
            :maxlength="props.maxlength"
            :required="props.required"
            type="text"
            name="uid"
            v-model="inputValue"
            @focus="$emit('focus')"
            @blur.stop.prevent="$emit('blur')"
            @keypress.enter="$emit('submit')"
        />
        <label class="text-input-label" :for="uid" v-if="props.label">{{ props.label }}</label>
        <button
            type="submit"
            class="text-input-submit-button"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
            @click.prevent="$emit('submit')"
            v-ripple
            v-if="submitButton"
        >
            <SvgComponentAdd v-if="submitButton === 'add'" />
        </button>
        <div class="text-input-messages">
            <p class="validation-message" v-if="validationMessage">
                {{ validationMessage }}
            </p>
            <p class="character-counter" v-if="props.maxlength">
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
    label: {
        type: String,
        required: false,
        default: "",
    },
    validation: {
        type: Function,
        required: false,
    },
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
    maxlength: {
        type: Number,
        required: false,
    },
    submitButton: {
        type: String,
        required: false,
        default: "",
        validator(value: unknown): boolean {
            return typeof value === "string" && ["", "submit", "add"].indexOf(value) >= 0;
        },
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false,
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
    active: computed(() => props.isActive),
    "is-invalid": computed(() => inputValue.value !== "" && !isValid.value),
});
</script>
