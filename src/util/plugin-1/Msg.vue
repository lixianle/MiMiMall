<template>
  <div class="msg">
    <!-- <div>message</div> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Msg",
};
</script>

<style scoped>
.msg {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  z-index: 999;
  color: #ffffff;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
