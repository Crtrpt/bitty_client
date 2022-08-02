import { createApp } from "vue";

import BittyVue from "./BittyVue.vue";
import route from "./route/index.js";
import { createI18n } from "vue-i18n";
import { message } from "./i18n";

import { createRouter, createWebHashHistory } from "vue-router";
import { appStore } from "./store/appStore";

import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";

import confirm from "./directives/confirm.js";
import tooltip from "./directives/tooltip";

library.add(fas);

const app = createApp(BittyVue);

const i18n = createI18n({
  locale: "zh",
  fallbackLocale: "zh",
  messages: message,
});

app.use(i18n);

app.use(createPinia());

app.component("font-awesome-icon", FontAwesomeIcon);

var componentsList = [];

var components = import.meta.globEager("./components/*.vue");
for (const idx in components) {
  componentsList.push(components[idx].default);
}

var layout = import.meta.globEager("./layout/*.vue");
for (const idx in layout) {
  componentsList.push(layout[idx].default);
}

var widget = import.meta.globEager("./widget/*.vue");
for (const idx in widget) {
  componentsList.push(widget[idx].default);
}

componentsList.forEach((component) => {
  app.component(component.name, component);
});

const store = appStore();


const router = createRouter({
  history: createWebHashHistory(),
  routes: route,
});

router.beforeEach((to, form) => {
  if (!store.userInfo && to.name !== "login") {
    return { name: "login" };
  }
});

app.use(router);

app.directive("confirm",confirm)
app.directive("tooltip",tooltip)
app.mount("#app");
