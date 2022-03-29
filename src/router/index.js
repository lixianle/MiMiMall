import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/home/Home.vue";
import HomeIndex from "@/pages/home/components/HomeIndex.vue";
import HomeProduct from "@/pages/home/components/HomeProduct.vue";
import HomeDetail from "@/pages/home/components/HomeDetail.vue";
import Login from "@/pages/login/Login.vue";
import Cart from "@/pages/cart/Cart.vue";
import Order from "@/pages/order/Order.vue";
import OrderList from "@/pages/order/components/OrderList.vue";
import OrderComfirm from "@/pages/order/components/OrderComfirm.vue";
import OrderPay from "@/pages/order/components/OrderPay.vue";
import AliPay from "@/pages/order/components/AliPay.vue";

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
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    children: [
      {
        path: "list",
        name: "OrderList",
        component: OrderList,
      },
      {
        path: "comfirm",
        name: "OrderComfirm",
        component: OrderComfirm,
      },
      {
        path: "pay",
        name: "OrderPay",
        component: OrderPay,
      },
      {
        path: "alipay",
        name: "AliPay",
        component: AliPay,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
