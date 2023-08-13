import dayjs from "dayjs";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "@/stores";

import "./styles/index.scss";

const app = createApp(App);

dayjs.locale("de-de");
setupStore(app);
app.use(router).mount("#app");
