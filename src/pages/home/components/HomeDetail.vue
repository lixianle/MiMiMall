<template>
  <div class="detail">
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper fl">swiper先不做</div>
        <div class="content fr">
          <h2 class="item-title">{{ product.name }}</h2>
          <div class="delivery">小米自营</div>
          <div class="item-price">
            {{ product.price }}元<span class="del">1999元</span>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">
              加入购物车
            </a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from "@/common/ServiceBar.vue";
import { getProductInfo, toAddCart } from "@/api/index";
export default {
  name: "Detail",
  components: {
    ServiceBar,
  },
  data() {
    return {
      id: this.$route.params.id,
      product: {}, // 商品信息
    };
  },
  mounted() {
    this.productInfo();
  },
  methods: {
    // 这里与Product页面相同，后面可考虑合并
    productInfo() {
      getProductInfo(this.id).then((res) => {
        this.product = res;
      });
    },
    addCart() {
      toAddCart(this.id, true).then((res = { cartProductVoList: 0 }) => {
        this.$store.dispatch("saveCartCount", res.cartProductVoList.length);
        this.$router.push("/cart");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";

.detail {
  .wrapper {
    .container {
      .swiper {
        @include wH(642px, 617px);
        background-color: aqua; //del
      }
      .content {
        @include wH(584px, 870px);
        .item-title {
          height: 26px;
          padding-top: 30px;
          padding-bottom: 16px;
          font-size: $fontC;
        }
        .delivery {
          height: 15px;
          margin: 26px 0 14px;
          font-size: $fontI;
          color: $colorA;
        }
        .item-price {
          height: 19px;
          margin-bottom: 50px;
          font-size: 20px;
          color: $colorA;
          .del {
            margin-left: 10px;
            font-size: $fontI;
            color: $colorD;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
