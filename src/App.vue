<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import { getMock } from "./api2/index";
export default {
  name: "App",
  // mounted() {
  //   getMock().then((res) => {
  //     console.log(res);
  //   });
  // },
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
</style>
