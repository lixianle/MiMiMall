<template>
  <div class="home">
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from "../../common/NavHeader.vue";
import NavFooter from "../../common/NavFooter.vue";

export default {
  name: "Home",
  components: {
    NavHeader,
    NavFooter,
  },
};
</script>
