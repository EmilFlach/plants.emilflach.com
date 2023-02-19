// 3rd party dependencies
import { createApp } from 'vue'

// Project dependencies
import App from './App.vue'
import store from "./store.js";
import router from "./router";

let app = createApp(App);
app.use(store);
app.use(router);
app.mount("#app");



