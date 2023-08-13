import { createRouter, createWebHistory, Router } from "vue-router";

const StoreChooser = () => import("@views/StoreChooser.vue");
const BrandChooser = () => import("@views/BrandChooser.vue");

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/stores",
      name: "stores",
      component: StoreChooser,
    },
    {
      path: "/brands",
      name: "brands",
      component: BrandChooser,
      props: { storeIds: [""] },
    },
  ],
});

export default router;
