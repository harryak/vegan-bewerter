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
        />
        <label class="text-input-label" :for="uid">{{ props.label }}</label>
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
import { computed, reactive } from "vue";

const uid = "text-input-" + Date.now().toString(36) + Math.random().toString(36).substring(2, 12);

const props = defineProps({
    label: {
        type: String,
        required: true,
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
});

const inputModel = defineModel<string>({ default: "" });

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
});
</script>
