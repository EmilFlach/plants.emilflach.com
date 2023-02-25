import * as VueRouter from "vue-router"

import PlantDetail from "./components/PlantDetail";
import Plants from "./components/Plants";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Plants
    },
    {
        path: '/plants/:id',
        name: 'plant_detail',
        component: PlantDetail
    }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
    scrollBehavior (to) {
        if(to.name === "home") {
            // Apply the scroll position which was stored before navigating
            if (window.scrollOffset) {
                return { top: window.scrollOffset };
            }
            return { top: 0 };
        }
    }
});

// Store the scroll position before navigating away from the plant list
router.beforeEach((to, from) => {
    if(from.name === "home") {
        const container = document.querySelector('html');
        if(container) {
            window.scrollOffset = container.scrollTop;
        }
    }
});

router.afterEach((to, from) => {
   if(from.name === "home") {
       to.meta.transition = "slide-right";
   }
    if(from.name === "plant_detail") {
        to.meta.transition = "slide-left";
    }
});

export default router;