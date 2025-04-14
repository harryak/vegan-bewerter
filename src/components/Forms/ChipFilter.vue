<template>
    <div
        :class="{
            'chip-filter-wrapper': true,
            collapsible: isCollapsible,
            collapsed: isCollapsed,
        }"
    >
        <p class="chip-filter-label" @click="onClickLabel">
            <SvgComponentSearch class="filter-icon" />
            <span>{{ props.label + (selectedItemCount > 0 ? " (" + selectedItemCount + ")" : "") }}</span>
            <SvgComponentDropDown class="collapse-indicator" v-if="isCollapsible" />

            <SvgComponentDelete class="filter-delete" @click.stop="updateModel()" v-if="showDeleteButton" />
        </p>
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
import { computed, Reactive, ref } from "vue";
import ChipElement from "./ChipElement.vue";

import SvgComponentDelete from "@/common/assets/icons/material-delete.svg?component";
import SvgComponentDropDown from "@/common/assets/icons/material-drop-down.svg?component";
import SvgComponentSearch from "@/common/assets/icons/material-search.svg?component";

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
    isCollapsible: {
        type: Boolean,
        required: false,
        default: false,
    },
    isCollapsed: {
        type: Boolean,
        required: false,
        default: false,
    },
});
const emit = defineEmits(["add-item", "update:modelValue"]);

const modelValue = defineModel<ChipFilterItem[]>({ required: true });

const updateModel = (item?: ChipFilterItem) => {
    if (!item) {
        for (const item of modelValue.value) {
            item.isSelected = false;
        }

        emit("update:modelValue");
        return;
    }

    const index = modelValue.value.indexOf(item);

    modelValue.value[index].isSelected = !modelValue.value[index].isSelected;
    emit("update:modelValue");
};

const isCollapsed = ref(props.isCollapsed);
const showDeleteButton = computed(() => modelValue.value.some(item => item.isSelected));
const selectedItemCount = computed(() => modelValue.value.filter(item => item.isSelected).length);

const onClickLabel = () => {
    if (!props.isCollapsible) {
        return;
    }

    isCollapsed.value = !isCollapsed.value;
};
</script>
