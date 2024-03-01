<template>
    <div class="chip-input-wrapper">
        <p class="chip-input-label">{{ props.label }}</p>
        <TextInput v-model="newItemInput" @submit="addItem()" submitButton="add" />
        <div class="chip-input">
            <chip-element
                @clear="removeItem(inputItem.id)"
                :key="inputItem.id"
                :hidden="modelValue.indexOf(inputItem.id) < 0"
                type="input"
                v-for="inputItem in chipElements"
            >
                {{ inputItem.label }}
            </chip-element>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

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

const chipElements = ref(props.items);
const newItemInput = ref("");

const addItem = () => {
    const newItem = newItemInput.value;
    if (newItem === "") {
        return;
    }

    newItemInput.value = "";
    let newItemId: string;

    do {
        newItemId = Math.random().toString(36).substring(2, 12);
    } while (chipElements.value.find(item => item.id === newItemId) !== undefined);

    chipElements.value.push({ id: newItemId, label: newItem });

    setTimeout(() => {
        emit("update:modelValue", [...props.modelValue, newItemId]);
    }, 50);
};

const removeItem = (id: string) => {
    const index = props.modelValue.indexOf(id);
    emit("update:modelValue", props.modelValue.toSpliced(index, 1));
};
</script>
