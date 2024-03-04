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
        <dropdown-element label="Brand" :items="possibleBrands" :required="true" v-model="brand" />
        <chip-input label="Stores" :items="possibleStores" :required="true" v-model="stores" />
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

const possibleBrands = [
    { id: "vegeta", label: "Vegeta" },
    { id: "vogan", label: "Vogan" },
];
const possibleStores = [
    { id: "aldi", label: "Aldi" },
    { id: "edeka", label: "Edeka" },
];
const possibleProductAttributes = [
    { id: "cheesy", label: "Cheesy" },
    { id: "hearty", label: "Hearty" },
];

const ean = ref(props.eanCode);
const name = ref<string>("");
const brand = ref<string>("");
const stores = ref<string[]>([]);
const productAttributes = ref<string[]>([]);

const validations: { [inputName: string]: (value: string) => string } = {
    ean: (value: string) =>
        value === parseInt(value).toString()
            ? value.length === 13
                ? ""
                : "Is exactly 13 digits."
            : "Has to be numeric.",
};
</script>
