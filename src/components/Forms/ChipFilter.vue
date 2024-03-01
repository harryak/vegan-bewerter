<template>
    <div class="chip-filter-wrapper">
        <p class="chip-filter-label">{{ props.label }}</p>
        <div class="chip-filter">
            <chip-element
                :selected="modelValue.indexOf(filterItem.id) >= 0"
                @change="updateModel(filterItem.id)"
                v-for="filterItem in items"
                :key="filterItem.id"
                type="filter"
                >{{ filterItem.label }}</chip-element
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
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

const updateModel = (id: string) => {
    const index = props.modelValue.indexOf(id);

    if (index >= 0) {
        emit("update:modelValue", props.modelValue.toSpliced(index, 1));
    } else {
        emit("update:modelValue", [...props.modelValue, id]);
    }
};
</script>
