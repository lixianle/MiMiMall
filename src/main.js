import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Msg from "./util/index";

const app = createApp(App);
app.config.globalProperties.$msg = "/msg";

app.use(Msg).use(store).use(router).mount("#app");
