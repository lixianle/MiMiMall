<template>
  <transition name="slide-fade">
    <div class="msg" :class="msgObject" v-show="visible">
      <img
        v-if="type == 'success'"
        class="msg-icon"
        :class="iconObject"
        src="/imgs/icon-gou.png"
        alt=""
      />
      <img
        v-if="type == 'error'"
        class="msg-icon"
        :class="iconObject"
        src="/imgs/icon-close.png"
        alt=""
      />
      <p class="text">{{ text }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Msg",
  // props: {
  //   show: Boolean,
  //   text: String,
  //   type: String,
  //   num: Number,
  // },
  data() {
    return {
      visible: false,
      text: "",
      type: "",
    };
  },
  mounted() {
    // console.log(this.num);
  },
  computed: {
    msgObject() {
      return {
        "msg-success": this.type == "success",
        "msg-error": this.type == "error",
      };
    },
    iconObject() {
      return {
        "icon-success": this.type == "success",
        "icon-error": this.type == "error",
      };
    },
  },
  watch: {
    // num: {
    //   handler() {
    //     console.log(this.num);
    //   },
    // },
    visible: {
      handler() {
        const timer = setTimeout(() => {
          this.visible = false;
          // state.text = "";
          // state.type = "";
          clearTimeout(timer);
        }, 2500);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.msg {
  display: flex;
  align-items: center;
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 345px;
  padding: 15px 15px 15px 20px;
  z-index: 999;
  font-size: 15px;
  font-weight: 500;
  border-radius: 5px;
  .msg-icon {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 8px;
    padding: 4px 0;
    margin-right: 12px;
    border-radius: 50%;
  }
  .text {
    display: inline-block;
    word-wrap: break-word;
    width: 310px;
    line-height: 16px;
  }
  .icon-success {
    background-color: #67c23a;
  }
  .icon-error {
    background-color: #f56d6d;
  }
}
.msg-success {
  color: #67c23a;
  background-color: rgb(240, 249, 235);
}
.msg-error {
  color: #f56d6d;
  background-color: #fef0f0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s linear;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(-50%, -260%);
  opacity: 0;
}
</style>
