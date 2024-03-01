import { createRouter, createWebHistory, Router } from "vue-router";

const ProductGrid = () => import("@views/ProductGrid.vue");
const ProductNew = () => import("@views/ProductNew.vue");

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            alias: "/products",
            name: "products",
            component: ProductGrid,
        },
        {
            path: "/new",
            alias: ["/new-product", "/product-new"],
            name: "product-new",
            component: ProductNew,
        },
    ],
});

export default router;
