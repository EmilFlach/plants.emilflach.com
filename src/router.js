import * as VueRouter from "vue-router"

import PlantDetail from "./components/PlantDetail";
import Plants from "./components/Plants";

const routes = [
    { path: '/', component: Plants },
    { path: '/plants/:id', component: PlantDetail },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router;