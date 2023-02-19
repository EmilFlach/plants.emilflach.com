import * as VueRouter from "vue-router"

import pinia from "./store.js";
import { usePlantsStore } from "./stores/plants";
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

router.beforeEach(async() => {
    const store = usePlantsStore(pinia);
    store.fetchPlants();
});

export default router;