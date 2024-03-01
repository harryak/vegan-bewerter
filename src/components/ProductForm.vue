<template>
    <div class="w-50">
        <text-input
            label="EAN"
            type="text"
            v-model="ean"
            :required="true"
            :maxlength="13"
            :validation="validations.ean"
        />
        <text-input label="Name" v-model="name" :required="true" />
        <chip-input label="Attributes" :items="possibleProductAttributes" v-model="productAttributes" />
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
    eanCode: {
        type: String,
        required: true,
    },
});

const possibleProductAttributes = [
    { id: "cheesy", label: "Cheesy" },
    { id: "hearty", label: "Hearty" },
];

const ean = ref(props.eanCode);
const name = ref<string>("");
const productAttributes = ref<string[]>([]);

const validations: { [inputName: string]: (value: string) => string } = {
    ean: (value: string) => (value === parseInt(value).toString() ? "" : "Muss numerisch sein."),
};
</script>
