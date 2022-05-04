import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import quasarUserOptions from "./quasar-user-options";

router.beforeEach((to) => {
  const isAuth = localStorage.getItem("isAuth");
  if (isAuth) {
    store.commit("setAuth", isAuth);
  }
  if (!store.getters["getAuth"] && to.name !== "auth") return { name: "auth" };
});

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .mount("#app");
