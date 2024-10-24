<template>
    <div class="choice-wrapper col-2">
        <router-link :to="{ name: 'products' }" class="choice choice-search col-left col-bottom">
            <CardElement>
                <template v-slot:image><SvgComponentSearch /></template>
                <template v-slot:title>Search</template>
            </CardElement>
        </router-link>
        <router-link :to="{ name: 'scan' }" class="choice choice-filter col-right col-top">
            <CardElement>
                <template v-slot:image><SvgComponentBarcodeScanner /></template>
                <template v-slot:title>Scan</template>
            </CardElement>
        </router-link>
    </div>
</template>

<script lang="ts" setup>
import SvgComponentSearch from "@/common/assets/icons/material-search.svg?component";
import SvgComponentBarcodeScanner from "@/common/assets/icons/material-barcode-scanner.svg?component";

import CardElement from "@/components/Components/CardElement.vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();

await productsStore.synchronizeData();
</script>
