<template>
    <div class="chip-input-wrapper">
        <p class="chip-input-label">{{ props.label }}</p>
        <div class="chip-input">
            <chip-element
                @clear="updateModel(inputItem.id)"
                :key="inputItem.id"
                :hidden="modelValue.indexOf(inputItem.id) < 0"
                type="input"
                v-for="inputItem in items"
            >
                {{ inputItem.label }}
            </chip-element>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    items: {
        type: Array<{ id: string; label: string }>,
        required: true,
    },
    modelValue: {
        type: Array<string>,
        default: [],
    },
});
const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
    emit(
        "update:modelValue",
        props.items.map(item => item.id),
    );
});

const updateModel = (id: string) => {
    const index = props.modelValue.indexOf(id);
    emit("update:modelValue", props.modelValue.toSpliced(index, 1));
};
</script>
