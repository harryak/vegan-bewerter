<template>
    <div class="chip-input-wrapper">
        <TextInput
            :label="props.label"
            submitButton="add"
            class="chip-input-new"
            :isActive="isDropdownOpen"
            v-model="newItemInput"
            @focus="openDropdown()"
            @click="openDropdown()"
            @blur="closeDropdown()"
            @submit="addNewItem(newItemInput)"
            @keydown.down.stop.prevent="focusFirstDropdownItem()"
            @keydown.up.stop.prevent="focusLastDropdownItem()"
        />
        <div :class="{ 'chip-input-dropdown-wrapper': true, open: isDropdownOpen }" ref="dropdownElement">
            <DropdownList
                :items="items"
                :selectedItems="modelValue"
                :isOpen="isDropdownOpen"
                @focus="openDropdown()"
                @blur="closeDropdown()"
                @selected="toggleItemSelection"
            />
        </div>
        <div class="chip-input">
            <chip-element
                :key="inputItem.id"
                :hidden="modelValue.indexOf(inputItem.id) < 0"
                type="input"
                @clear="removeItem(inputItem.id)"
                v-for="inputItem in chipElements"
            >
                {{ inputItem.label }}
            </chip-element>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

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

const dropdownElement = ref<HTMLElement | null>(null);
const isDropdownOpen = ref(false);
const chipElements = ref(props.items);
const newItemInput = ref("");

const openDropdown = () => {
    isDropdownOpen.value = true;
};

const closeDropdown = () => {
    isDropdownOpen.value = false;
};

const addChip = (chipId: string) => {
    if (props.modelValue.indexOf(chipId) >= 0) {
        return;
    }

    emit("update:modelValue", [...props.modelValue, chipId]);
};

const addNewItem = (newItemLabel: string) => {
    if (newItemLabel === "") {
        return;
    }

    newItemInput.value = "";

    let idCandidate: string;
    do {
        idCandidate = Math.random().toString(36).substring(2, 12);
    } while (chipElements.value.find(item => item.id === idCandidate) !== undefined);

    chipElements.value.push({ id: idCandidate, label: newItemLabel });

    setTimeout(() => {
        addChip(idCandidate);
    }, 50);
};

const toggleItemSelection = (itemId: string) => {
    if (props.modelValue.indexOf(itemId) < 0) {
        addChip(itemId);
    } else {
        removeItem(itemId);
    }
};

const removeItem = (id: string) => {
    const index = props.modelValue.indexOf(id);
    emit("update:modelValue", props.modelValue.toSpliced(index, 1));
};

const focusFirstDropdownItem = () => {
    (dropdownElement.value?.querySelectorAll("li[tabindex='0']")[0] as HTMLElement).focus();
};

const focusLastDropdownItem = () => {
    (dropdownElement.value?.querySelectorAll("li[tabindex='0']:last-child")[0] as HTMLElement).focus();
};
</script>
