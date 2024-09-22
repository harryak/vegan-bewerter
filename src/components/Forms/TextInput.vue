<template>
    <div class="text-input-wrapper">
        <input
            :class="inputClasses"
            :id="uid"
            :maxlength="props.maxlength"
            :required="props.required"
            type="text"
            name="uid"
            v-model="inputModel"
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
                {{ `${inputModel.length}/${props.maxlength}` }}
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

const inputModel = defineModel<string>({ default: "" });
const isValid = defineModel<boolean>("isValid", { default: false });

watch(inputModel, newInput => {
    isValid.value = (!props.required || !!newInput) && (!props.validation || props.validation(newInput) === "");
});

defineEmits(["submit", "focus", "blur"]);

const validationMessage = computed<string>(() => {
    if (props.required && !inputModel.value) {
        return "Required";
    }
    return props.validation ? props.validation(inputModel.value) : "";
});

const inputClasses = reactive({
    "text-input": true,
    filled: computed(() => inputModel.value !== ""),
    "has-message": computed(() => validationMessage.value !== ""),
    active: computed(() => props.isActive),
    "is-invalid": computed(() => inputModel.value !== "" && !isValid.value),
});
</script>
