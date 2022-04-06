<template>
  <div class="login">
    <div class="container">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="header-title">
        <h2>小米商城</h2>
        <p>让每个人都能享受科技的乐趣</p>
      </div>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登录</span>
            <span class="sep-line">|</span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input
              type="text"
              placeholder="请输入帐号"
              v-model="username"
              @keyup.enter="login"
            />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
              @keyup.enter="login"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <nav-footer></nav-footer>
    </div>
  </div>
</template>

<script>
import NavFooter from "@/common/NavFooter.vue";
import { toLogin, toRegister } from "@/api/index";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "@vue/runtime-core";
export default {
  name: "Login",
  components: {
    NavFooter,
  },
  setup() {
    let username = ref("");
    let password = ref("");
    let userId = ref("");
    let store = useStore();
    let router = useRouter();
    let { proxy } = getCurrentInstance();
    const login = () => {
      if (!username.value || !password.value) {
        proxy.$errorMsg("请输入正确的用户名和密码");
        return;
      }
      toLogin(username.value, password.value).then((res) => {
        document.cookie = "userId=" + res.id;
        store.commit("saveUserName", res.username);
        router.push({ name: "HomeIndex" });
      });
    };
    const register = () => {
      toRegister();
    };
    return {
      username,
      password,
      userId,
      login,
      register,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";

.login {
  & > .container {
    display: flex;
    align-items: center;
    height: 113px;
    .header-title {
      padding-left: 20px;
      h2 {
        padding-bottom: 10px;
        font-size: 40px;
        font-weight: 600;
      }
      p {
        font-size: $fontJ;
        color: $colorD;
        font-weight: 200;
      }
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      position: relative;
      height: 576px;
      .login-form {
        position: absolute;
        box-sizing: border-box;
        bottom: 29px;
        right: 0;
        @include wH(410px, 510px);
        padding: 0 31px;
        background-color: $colorG;
        h3 {
          line-height: 23px;
          margin: 40px auto 49px;
          font-size: $fontE;
          text-align: center;
          .checked {
            color: $colorA;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          @include wH(348px, 50px);
          @include border();
          margin-bottom: 20px;
          input {
            box-sizing: border-box;
            @include wH(100%, 100%);
            border: none;
            padding: 18px;
          }
        }
        .btn-box {
          .btn {
            width: 100%;
            line-height: 50px;
            margin-top: 10px;
            font-size: $fontI;
          }
        }
        .tips {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          font-size: $fontJ;
          cursor: pointer;
          .sms {
            color: $colorA;
          }
          .reg {
            color: $colorD;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
}
</style>
