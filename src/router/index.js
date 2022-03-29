import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/home/Home.vue";
import HomeIndex from "../pages/home/components/HomeIndex.vue";
import HomeProduct from "../pages/home/components/HomeProduct.vue";
import HomeDetail from "../pages/home/components/HomeDetail.vue";

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
      {
        path: "/product/:id",
        name: "HomeProduct",
        component: HomeProduct,
      },
      {
        path: "/detail/:id",
        name: "HomeDetail",
        component: HomeDetail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
