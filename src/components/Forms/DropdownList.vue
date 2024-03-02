<template>
    <ul :class="{ 'dropdown-list': true, open: isOpen }">
        <li
            v-for="item in items"
            :key="item.id"
            tabindex="0"
            :class="{ selected: selectedItems.indexOf(item.id) >= 0 }"
            @focus="$emit('focus', item.id)"
            @blur="$emit('blur')"
            @keydown.down.stop.prevent="focusNextItem($event)"
            @keydown.up.stop.prevent="focusPreviousItem($event)"
            @click="$emit('selected', item.id, item.label)"
        >
            <span>{{ item.label }}</span>
            <SVGCheckComponent v-if="selectedItems.indexOf(item.id) >= 0" />
        </li>
    </ul>
</template>

<script lang="ts" setup>
import SVGCheckComponent from "@/common/assets/icons/material-check.svg?component";

defineProps({
    items: {
        type: Array<{ id: string; label: string }>,
        required: true,
    },
    selectedItems: {
        type: Array<string>,
        required: false,
        default: [],
    },
});

defineEmits(["focus", "blur", "selected"]);

const isOpen = defineModel("isOpen");

const focusNextItem = (event: KeyboardEvent): void => {
    console.log("NEXT", event);
    const next = (event.currentTarget as HTMLElement)?.nextElementSibling;
    if (next) {
        (next as HTMLElement).focus();
    }
};

const focusPreviousItem = (event: KeyboardEvent): void => {
    const next = (event.currentTarget as HTMLElement)?.previousElementSibling;
    if (next) {
        (next as HTMLElement).focus();
    }
};
</script>
