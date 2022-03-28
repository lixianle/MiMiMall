import { createApp } from "vue";
// import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
// 配置全局axios
// app.config.globalProperties.$axios = axios;
app.use(store).use(router).mount("#app");
