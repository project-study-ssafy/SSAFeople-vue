import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import VueCookies from "vue3-cookies";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies, { expireTimes: "1d", secure: true });

app.mount("#app");
