<template>
    <div :class="{ 'chip-input-wrapper': true, open: isDropdownOpen }" :id="uid">
        <TextInput
            v-model="newItemInput"
            :class="{ 'chip-input-new': true, disabled: disabled }"
            :disabled="disabled"
            :label="props.label"
            :isActive="isDropdownOpen"
            submitButton="add"
            @focus="openDropdown()"
            @click="openDropdown()"
            @blur="closeDropdown()"
            @submit="addNewItem(newItemInput)"
            @keydown.down.stop.prevent="focusFirstDropdownItem()"
            @keydown.up.stop.prevent="focusLastDropdownItem()"
        />
        <SvgComponentDown
            v-if="!disabled"
            :class="{ 'chip-input-dropdown-toggle': true, open: isDropdownOpen }"
            @click="toggleDropdown()"
            v-ripple
        />
        <div :class="{ 'chip-input-dropdown-wrapper': true, open: isDropdownOpen }" ref="dropdownElement">
            <DropdownList
                :disabled="disabled"
                :items="items"
                :selectedItems="modelValue"
                :isOpen="isDropdownOpen"
                @focus="openDropdown()"
                @blur="closeDropdown()"
                @selected="toggleItemSelection"
            />
        </div>
        <div class="chip-input">
            <ChipElement
                :key="inputItem.id"
                :hidden="modelValue.indexOf(inputItem.id) < 0"
                :disabled="disabled"
                type="input"
                @clear="removeChip(inputItem.id)"
                v-for="inputItem in chipElements"
            >
                {{ inputItem.label }}
            </ChipElement>
        </div>
        <div class="chip-input-messages">
            <p class="validation-message" v-if="validationMessage">
                {{ validationMessage }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";

import SvgComponentDown from "@/common/assets/icons/material-down.svg?component";

import { generateUid } from "@/utilities/generateUid";

import ChipElement from "./ChipElement.vue";
import DropdownList from "./DropdownList.vue";
import TextInput from "./TextInput.vue";

const uid = "dropdown-" + generateUid();

const props = defineProps({
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
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
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
    validation: {
        type: Function,
        required: false,
    },
});
const emit = defineEmits(["add-item", "update:modelValue"]);

onMounted(() => {
    document.getElementById(uid)?.parentElement?.classList.add("preserve-3d");
});

const dropdownElement = ref<HTMLElement | null>(null);
const isDropdownOpen = ref(false);
const chipElements = ref(props.items);
const newItemInput = ref("");
const isValid = defineModel<boolean>("isValid", { default: false });

const recheckIsValid = (modelValue: string[]) =>
    (!props.required || modelValue.length > 0) && (!props.validation || props.validation(modelValue) === "");

isValid.value = recheckIsValid(props.modelValue);

watch(
    () => props.modelValue,
    newModelValue => {
        isValid.value = recheckIsValid(newModelValue);
    },
);

const openDropdown = () => {
    if (props.disabled) {
        return;
    }

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

const addChip = (chipId: string) => {
    if (props.modelValue.indexOf(chipId) >= 0) {
        return;
    }

    emit("update:modelValue", [...props.modelValue, chipId]);
};

const removeChip = (id: string) => {
    const index = props.modelValue.indexOf(id);
    emit("update:modelValue", props.modelValue.toSpliced(index, 1));
};

const addNewItem = (newItemLabel: string) => {
    if (newItemLabel === "") {
        return;
    }

    emit("add-item", newItemLabel);
};

const toggleItemSelection = (itemId: string) => {
    if (props.modelValue.indexOf(itemId) < 0) {
        addChip(itemId);
    } else {
        removeChip(itemId);
    }
};

const focusFirstDropdownItem = () => {
    (dropdownElement.value?.querySelectorAll("li[tabindex='0']")[0] as HTMLElement).focus();
};

const focusLastDropdownItem = () => {
    (dropdownElement.value?.querySelectorAll("li[tabindex='0']:last-child")[0] as HTMLElement).focus();
};

const validationMessage = computed<string>(() => {
    if (props.required && props.modelValue.length < 1) {
        return "Required";
    }
    return props.validation ? props.validation(props.modelValue) : "";
});
</script>
