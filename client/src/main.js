import "./assets/main.css";

import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import vue3GoogleLogin from "vue3-google-login";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(vue3GoogleLogin, {
  clientId: "960890795720-smujeb2rkle5dpjneab3hh8h5mb6ugm6.apps.googleusercontent.com",
});
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

app.use(pinia);
app.use(router);

app.mount("#app");
