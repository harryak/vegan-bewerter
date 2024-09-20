import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStateStore = defineStore("appState", () => {
    const isLoading = ref(false);

    return {
        isLoading,
    };
});
