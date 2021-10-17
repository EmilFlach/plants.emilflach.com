import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import { VueMasonryPlugin } from "vue-masonry/src/masonry-vue3.plugin";

const emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(VueMasonryPlugin);
app.mount('#app');

