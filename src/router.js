import * as VueRouter from "vue-router"

import PlantDetail from "./components/PlantDetail";

const routes = [
    { path: '/plants/:id', component: PlantDetail }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router;