<template>
    <LoadingOverlay :class="{ 'is-visible': appState.isLoading }" />

    <title-bar>
        <div>Vegan-Bewerter</div>
    </title-bar>

    <main>
        <RouterView />
    </main>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";

import LoadingOverlay from "@/components/Components/LoadingOverlay.vue";

import { useAppStateStore } from "@/stores/appState";

const appState = useAppStateStore();
</script>
