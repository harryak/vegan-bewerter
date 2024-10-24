import { createRouter, createWebHistory, RouterOptions } from "vue-router";

const ProductGrid = () => import("@views/ProductGrid.vue");
const ProductNew = () => import("@views/ProductNew.vue");
const ScanningPage = () => import("@views/ScanningPage.vue");
const StartingPage = () => import("@views/StartingPage.vue");

const routerOptions: Partial<RouterOptions> = {
    routes: [
        {
            path: "/",
            name: "start",
            component: StartingPage,
        },
        {
            path: "/scan",
            name: "scan",
            component: ScanningPage,
        },
        {
            path: "/products",
            alias: ["/search"],
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
};

// With this pattern we get the Keycloak URL rewrites to work properly.
const initializeRouter = () => {
    routerOptions.history = createWebHistory(import.meta.env.BASE_URL);
    return createRouter(routerOptions as RouterOptions);
};

export { initializeRouter };
