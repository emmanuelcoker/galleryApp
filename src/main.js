import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { auth } from "./includes/firebase";
// import UnsplashPlugin from "@/includes/unsplash";

import "./assets/main.css";
import "./assets/base.css";

//vee validate validation
import VeeValidationPlugin from "./validation";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(createPinia());
    app.use(router);
    app.use(VeeValidationPlugin);
    // app.use(UnsplashPlugin);

    app.mount("#app");
  }
});
