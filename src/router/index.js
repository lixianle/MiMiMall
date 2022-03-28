import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/home/Home.vue";
import HomeIndex from "../pages/home/components/HomeIndex.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "HomeIndex",
        component: HomeIndex,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
