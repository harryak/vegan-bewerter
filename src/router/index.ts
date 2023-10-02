import { createRouter, createWebHistory, Router } from "vue-router";

const ProductGrid = () => import("@views/ProductGrid.vue");

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: ProductGrid,
    },
  ],
});

export default router;
