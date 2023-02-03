import { createApp } from 'vue'
import App from './App.vue'
import Plants from './components/Plants.vue'
import PlantDetail from './components/PlantDetail.vue'
import * as VueRouter from "vue-router";

const routes = [
    { path: '/', component: Plants },
    { path: '/plants/:id', component: PlantDetail },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

let app = createApp(App);
app.use(router);
window.vm = app;
app.mount('#app');



