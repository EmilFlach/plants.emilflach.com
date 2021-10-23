import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App);
window.vm = app;
app.mount('#app');


