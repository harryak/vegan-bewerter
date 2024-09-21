import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";

import { vRipple } from "@/directives/vRipple";

import App from "./App.vue";
import { initializeRouter } from "./router";

import "./styles/index.scss";
//import AuthStorePlugin from "@/plugins/authStore";
//import { useProductsStore } from "@/stores/products";
import { useAuthStore } from "@/stores/auth";

const pinia = createPinia();
const installPersistedStatePlugin = createPersistedStatePlugin();
pinia.use(context => installPersistedStatePlugin(context));

const app = createApp(App);
app.directive("ripple", vRipple);
app.use(pinia);

const authStore = useAuthStore();
await authStore.initialize(() => {});

app.use(initializeRouter());
app.mount("#app");

//TODO: Do this intelligently.
//const productsStore = useProductsStore();
