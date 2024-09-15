import { Pinia } from "pinia";
import { App } from "vue";

import { useAuthStore } from "@/stores/auth";

export default {
    install(app: App<Element>, options: { pinia: Pinia }) {
        app.config.globalProperties.$auth = useAuthStore(options.pinia);
    },
};
