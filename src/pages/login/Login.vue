<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <!-- 先用图片 -->
        <img src="/imgs/login-logo.png" alt="" />
      </a>
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
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
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
export default {
  name: "Login",
  components: {
    NavFooter,
  },
  data() {
    return {
      username: "",
      password: "",
      userId: "",
    };
  },
  methods: {
    // 全局$axios登录
    /*login() {
      let { username, password } = this;
      this.$axios
        .post("/api/user/login", {
          username,
          password,
        })
        .then((res) => {
          document.cookie = "userId=" + res.id;
          this.$store.dispatch("saveUserName", res.username);
          console.log("123");
          this.$router.push("/index");
        });
    },*/
    login() {
      let { username, password } = this;
      toLogin(username, password).then((res) => {
        document.cookie = "userId=" + res.id;
        this.$store.dispatch("saveUserName", res.username);
        this.$router.push("/index");
      });
    },
    // 全局$axios注册
    /*register() {
      this.$axios
        .post("/api/user/register", {
          username: "admin",
          password: "admin",
          email: "admin@163.com",
        })
        .then(() => {
          alert("注册成功！");
        });
    },*/
    register() {
      toRegister();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";

.login {
  & > .container {
    height: 113px;
    img {
      @include wH(auto, 100%);
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
