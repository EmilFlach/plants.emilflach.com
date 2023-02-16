// 3rd party dependencies
import { createApp } from 'vue'
import * as VueRouter from "vue-router";
import { createPinia } from 'pinia'

// Project dependencies
import App from './App.vue'
import Plants from './components/Plants.vue'
import PlantDetail from './components/PlantDetail.vue'
import {usePlantsStore} from "./stores/plants";


const routes = [
    { path: '/', component: Plants },
    { path: '/plants/:id', component: PlantDetail },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

router.beforeEach(() => {
    const store = usePlantsStore();
    store.fetchPlants();
});

let pinia = createPinia();
let app = createApp(App);
app.use(router);
app.use(pinia);
window.vm = app;
app.mount('#app');



