<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="menu-box">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item, index) in menuPhoneList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children">
                <ul v-for="(item, index) in menuTvList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
              <div class="children">
                <ul v-for="(item, index) in menuPadList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
              <div class="children">
                <ul v-for="(item, index) in menuHouseList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
              <div class="children">
                <ul v-for="(item, index) in menuTravelList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
              <div class="children">
                <ul v-for="(item, index) in menuAiList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
              <div class="children">
                <ul v-for="(item, index) in menuSouceList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children">
                <ul v-for="(item, index) in menuLifeList" :key="index">
                  <li v-for="(subitem, j) in item" :key="j">
                    <a :href="'/#/product/' + subitem.id">
                      <img :src="subitem.img" alt="" />
                      {{ subitem.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :loop="true"
          :autoplay="{ disableOnInteraction: false, delay: 3000 }"
          :pagination="{ clickable: true }"
          :effect="'cube'"
          :cubeEffect="{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }"
        >
          <swiper-slide v-for="(item, index) in slideList" :key="index">
            <a :href="'/#/product/' + item.id">
              <img :src="item.img" alt="" />
            </a>
          </swiper-slide>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a
          v-for="(item, index) in adsList"
          :key="index"
          :href="'/#/product/' + item.id"
        >
          <img :src="item.img" alt="" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img src="/imgs/banner-1.png" />
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img src="/imgs/mix-alpha.jpg" />
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr, i) in phoneList" :key="i">
              <div class="item" v-for="(item, j) in arr" :key="j">
                <span :class="{ 'new-pro': j % 2 == 0 }">新品</span>
                <div class="item-img">
                  <img :src="item.mainImage" />
                </div>
                <div class="item-info">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.subtitle }}</p>
                  <p class="price" @click="addCart(item.id)">
                    {{ item.price }}元
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      :showModal="showModal"
      modalType="middle"
      title="提示"
      btnType="1"
      sureText="查看购物车"
      @submit="goToCart"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue.js";
import "swiper/swiper.min.css";
import { Navigation, Autoplay, Pagination, EffectCube } from "swiper";
import "swiper/modules/navigation/navigation.min.css";
import "swiper/modules/autoplay/autoplay.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/effect-cube/effect-cube.min.css";
import ServiceBar from "@/common/ServiceBar.vue";
import Modal from "@/common/Modal.vue";
import { init, toAddCart } from "@/api/index";
import { getMenuList, getSlideList, getAdsList } from "@/api2/index";
export default {
  name: "HomeIndex",
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    Modal,
  },
  setup() {
    return {
      modules: [Navigation, Autoplay, Pagination, EffectCube],
    };
  },
  data() {
    return {
      // 轮播数据
      slideList: [],
      // 目录数据
      menuPhoneList: [],
      menuTvList: [],
      menuPadList: [],
      menuHouseList: [],
      menuTravelList: [],
      menuAiList: [],
      menuSouceList: [],
      menuLifeList: [],
      // banner广告数据
      adsList: [],
      // 手机产品手机
      phoneList: [],
      showModal: false,
    };
  },
  mounted() {
    getMenuList().then((res) => {
      this.menuPhoneList = res.phoneList;
      this.menuTvList = res.tvList;
      this.menuPadList = res.padList;
      this.menuHouseList = res.houseList;
      this.menuTravelList = res.travelList;
      this.menuAiList = res.aiList;
      this.menuSouceList = res.souceList;
      this.menuLifeList = res.lifeList;
    });
    getSlideList().then((res) => {
      this.slideList = res.list;
    });
    getAdsList().then((res) => {
      this.adsList = res.list;
    });
    init().then((res) => {
      res.list = res.list.slice(6, 14);
      this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
    });
  },
  methods: {
    // 全局$axios获取
    /*init() {
      this.$axios
        .get("/api/products", {
          params: {
            categoryId: 100012,
            pageSize: 14,
          },
        })
        .then((res) => {
          res.list = res.list.slice(6, 14);
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)];
          // console.log(this.phoneList);
        });
    },*/
    // 加入购物车
    addCart(id) {
      toAddCart(id, true)
        .then((res) => {
          this.showModal = true;
          this.$store.dispatch("saveCartCount", res.cartTotalQuantity);
        })
        .catch(() => {
          this.showModal = true;
        });
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";

.index {
  .container {
    .swiper-box {
      .menu-box {
        position: absolute;
        box-sizing: border-box;
        z-index: 9;
        @include wH(264px, 451px);
        padding: 20px 0;
        background-color: #55585a80;
        .menu-wrap {
          .menu-item {
            @include hL(50px);
            a {
              display: block;
              position: relative;
              padding-left: 30px;
              font-size: $fontI;
              color: $colorG;
              &::after {
                position: absolute;
                right: 30px;
                top: 17.5px;
                content: "";
                @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
              }
            }
            &:hover {
              background-color: $colorA;
              .children {
                display: block;
              }
            }
            .children {
              display: none;
              position: absolute;
              top: 0;
              left: 264px;
              box-sizing: border-box;
              border: 1px solid $colorH;
              @include wH(962px, 451px);
              background-color: $colorG;
              ul {
                display: flex;
                justify-content: space-between;
                height: 75px;
                li {
                  flex: 1;
                  @include hL(75px);
                  padding-left: 23px;
                  a {
                    color: $colorB;
                    font-size: $fontJ;
                    img {
                      vertical-align: middle;
                      @include wH(42px, 35px);
                      margin-right: 15px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .swiper {
        height: 451px;
        .swiper-button-prev {
          left: 274px;
        }
        .swiper-slide {
          img {
            @include wH(100%, 451px);
          }
        }
      }
    }
    .ads-box {
      @include flex();
      margin: 14px 0 31px;
      a {
        @include wH(296px, 167px);
      }
    }
    .banner {
      margin-bottom: 50px;
      a {
        display: block;
        height: 130px;
      }
    }
  }
  .product-box {
    background-color: $colorJ;
    .container {
      padding: 30px 0 50px 0;
      h2 {
        font-size: $fontF;
        @include hL(21px);
        margin-bottom: 20px;
        color: $colorB;
      }
      .wrapper {
        display: flex;
        .banner-left {
          margin-right: 16px;
          img {
            @include wH(224px, 619px);
          }
        }
        .list-box {
          .list {
            @include flex();
            width: 986px;
            margin-bottom: 14px;
            &:last-child {
              margin-bottom: 0;
            }
            .item {
              @include wH(236px, 302px);
              background-color: $colorG;
              text-align: center;
              span {
                display: inline-block;
                width: 67px;
                height: 24px;
                line-height: 24px;
                font-size: $fontJ;
                &.new-pro {
                  background-color: #7ecf68;
                  color: #ffffff;
                }
                &.kill-pro {
                  background-color: #e82626;
                  color: #ffffff;
                }
              }
              .item-img {
                height: 195px;
                img {
                  @include wH(100%, 100%);
                }
              }
              .item-info {
                h3 {
                  font-size: $fontJ;
                  line-height: $fontJ;
                  font-weight: bold;
                  color: $colorB;
                }
                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price {
                  font-size: $fontJ;
                  font-weight: bold;
                  color: #f20a0a;
                  &::after {
                    content: "";
                    @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                    vertical-align: middle;
                    margin-left: 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
