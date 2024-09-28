<template>
    <div class="chip-filter-wrapper">
        <p class="chip-filter-label">{{ props.label }}</p>
        <div class="chip-filter">
            <ChipElement
                :selected="filterItem.isSelected"
                :hidden="filterItem.isHidden"
                :disabled="filterItem.isDisabled"
                @change="updateModel(filterItem)"
                v-for="filterItem in modelValue"
                :key="filterItem.id"
                type="filter"
                >{{ filterItem.name }}</ChipElement
            >
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Reactive } from "vue";
import ChipElement from "./ChipElement.vue";

type ChipFilterItem = Reactive<{
    id: string;
    name: string;
    isSelected: boolean;
    isDisabled: boolean;
    isHidden: boolean;
}>;

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(["add-item", "update:modelValue"]);

const modelValue = defineModel<ChipFilterItem[]>({ required: true });

const updateModel = (item: ChipFilterItem) => {
    const index = modelValue.value.indexOf(item);

    modelValue.value[index].isSelected = !modelValue.value[index].isSelected;
    emit("update:modelValue");
};
</script>
