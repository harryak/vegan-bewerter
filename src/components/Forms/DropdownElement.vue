<template>
    <div :class="{ 'dropdown-element': true, open: isDropdownOpen }" :id="uid">
        <div class="text-input-wrapper">
            <text-input
                :label="label"
                :required="required"
                :validation="validation"
                v-model="inputValue"
                @focus="openDropdown()"
                @click="openDropdown()"
                @blur="closeDropdown()"
            />
            <SVGDownComponent
                :class="{ 'dropdown-toggle': true, open: isDropdownOpen }"
                @click="toggleDropdown()"
                v-ripple
            />
        </div>
        <div :class="{ 'dropdown-wrapper': true, open: isDropdownOpen }">
            <dropdown-list
                :items="items"
                :selectedItems="[modelValue]"
                :isOpen="isDropdownOpen"
                @focus="openDropdown()"
                @blur="closeDropdown()"
                @selected="selectItem"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import SVGDownComponent from "@/common/assets/icons/material-down.svg?component";

import { generateUid } from "@/utilities/generateUid";

const uid = "dropdown-" + generateUid();

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    items: {
        type: Array<{ id: string; label: string }>,
        required: true,
    },
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
    validation: {
        type: Function,
        required: false,
    },
    modelValue: {
        type: String,
        default: "",
    },
});
const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
    document.getElementById(uid)?.parentElement?.classList.add("preserve-3d");
});

const inputValue = ref("");
const isDropdownOpen = ref(false);

const openDropdown = () => {
    isDropdownOpen.value = true;

    document.addEventListener("click", closeDropdown, false);
};

const closeDropdown = (event: MouseEvent | undefined = undefined) => {
    if (event?.target && document.getElementById(uid)?.contains(event.target as HTMLElement)) {
        return;
    }

    isDropdownOpen.value = false;
    document.removeEventListener("click", closeDropdown, false);
};

const toggleDropdown = () => {
    if (isDropdownOpen.value) {
        closeDropdown(undefined);
    } else {
        openDropdown();
    }
};

const selectItem = (itemId: string) => {
    emit("update:modelValue", itemId);
    closeDropdown();

    const item = props.items.find(item => item.id === itemId);

    if (item) {
        inputValue.value = item.label;
    }
};
</script>
