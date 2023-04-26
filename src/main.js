import { createApp } from 'vue';
import SvgIcon from "vue3-icon";
import VueYtframe from "vue3-ytframe";
import App from './App.vue';
import './assets/css/index.css';
import router from "./routes/index.js";

const app = createApp(App);
app.use(router);
app.component("SvgIcon", SvgIcon);
app.use(VueYtframe);
app.mount('#app')


