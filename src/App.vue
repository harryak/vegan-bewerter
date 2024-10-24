<template>
    <LoadingOverlay :class="{ 'is-visible': appState.isLoading }" />

    <title-bar>
        <div>VeScan</div>
    </title-bar>

    <main>
        <RouterView :key="$route.fullPath" v-slot="{ Component }">
            <template v-if="Component">
                <Transition mode="out-in">
                    <KeepAlive>
                        <Suspense>
                            <component :is="Component"></component>
                            <template #fallback
                                ><LoadingOverlay :class="{ 'is-visible': appState.isLoading }"
                            /></template>
                        </Suspense>
                    </KeepAlive>
                </Transition>
            </template>
        </RouterView>
    </main>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";

import LoadingOverlay from "@/components/Components/LoadingOverlay.vue";

import { useAppStateStore } from "@/stores/appState";

const appState = useAppStateStore();
</script>
