import { createRouter, createWebHashHistory, Router } from "vue-router";

const StoreChooser = () => import("@views/StoreChooser.vue");

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      component: StoreChooser,
    },
  ],
});

export default router;
