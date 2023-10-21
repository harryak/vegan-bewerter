import { createRouter, createWebHistory, Router } from "vue-router";

const ProductGrid = () => import("@views/ProductGrid.vue");
// const QuaggaTest = () => import("@views/QuaggaTest.vue");

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: ProductGrid,
    },
    // {
    //   path: "/",
    //   alias: "/products",
    //   name: "products",
    //   component: QuaggaTest,
    // },
  ],
});

export default router;
