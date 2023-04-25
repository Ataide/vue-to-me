import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import VueYtframe from "vue3-ytframe"
import router from "./routes/index.js";

const app = createApp(App);
app.use(router);
app.use(VueYtframe);
app.mount('#app')


