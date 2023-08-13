import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./styles/index.scss";
import { useProductsStore } from "./stores/products";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia).use(router).mount("#app");

//TODO: Do this intelligently.
const productsStore = useProductsStore();
await productsStore.fetchData();
