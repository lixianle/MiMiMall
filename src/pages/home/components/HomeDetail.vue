<template>
  <div class="detail">
    <product-param></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper fl">
          <element-swiper></element-swiper>
        </div>
        <div class="content fr">
          <h2 class="product-name">{{ product.name }}</h2>
          <div class="product-desc">
            <span
              >「4月6日
              0点/10点/20点/22点购机赢小米定制品，详见活动规则；+99元得小米手环6；MiCare限时5折特惠」
            </span>
            全新一代 骁龙8 移动平台｜2K AMOLED 屏幕｜5000万超清三主摄 |
            CyberFocus 万物追焦｜全焦段夜景｜120W 澎湃秒充
          </div>
          <div class="delivery">小米自营</div>
          <div class="product-price">
            {{ product.price }}元<span class="del">1999元</span>
          </div>
          <div class="product-discount">
            <p>
              <span>赠品一</span>满1件赠价值79元致敬大师系列手机支架 互联网
              赠完即止
            </p>
            <p>
              <span>赠品二</span>满1件赠价值299元小米50W立式风冷无线充套装 黑色
              赠完即止
            </p>
          </div>
          <div class="address">
            <p>
              <span>北京</span>
              <span>北京市</span>
              <span>海定区</span>
              <span>清河接到</span>
              <span>修改</span>
            </p>
            <p>有现货</p>
          </div>
          <div class="select-version">
            <h2>选择版本</h2>
            <div class="gb">
              <span>12G+256G</span>
              <span>8G+128G</span>
              <span>8G+256G</span>
            </div>
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
import ProductParam from "@/common/ProductParam.vue";
import ElementSwiper from "@/common/ElementSwiper.vue";
import { getProductInfo, toAddCart } from "@/api/index";
export default {
  name: "Detail",
  components: {
    ServiceBar,
    ProductParam,
    ElementSwiper,
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
      padding: 32px 0 12px;
      .content {
        @include wH(600px, auto);
        padding-bottom: 50px;
        .product-name {
          height: 26px;
          padding-bottom: 16px;
          font-size: $fontE;
          font-weight: 400;
        }
        .product-desc {
          line-height: 1.5;
          font-size: $fontJ;
          color: $colorC;
          span {
            color: $colorA;
          }
        }
        .delivery {
          height: 15px;
          margin-top: 14px;
          font-size: $fontJ;
          color: $colorA;
        }
        .product-price {
          height: 19px;
          line-height: 19px;
          padding: 12px 0;
          // margin-bottom: 50px;
          font-size: 20px;
          color: $colorA;
          border-bottom: 1px solid $colorH;
          .del {
            margin-left: 10px;
            font-size: $fontI;
            color: $colorD;
            text-decoration: line-through;
          }
        }
        .product-discount {
          font-size: $fontJ;
          color: $colorB;
          p {
            margin-top: 14px;
            &:last-child {
              padding-bottom: 14px;
              border-bottom: 1px solid $colorH;
            }

            span {
              display: inline-block;
              padding: 2px 18px;
              margin-right: 10px;
              background-color: $colorA;
            }
          }
        }
        .address {
          box-sizing: border-box;
          width: 100%;
          height: 104px;
          padding: 30px 50px;
          margin-top: 14px;
          @include border();
          background-color: #fafafa;
          font-size: $fontJ;
          p {
            &:last-child {
              color: $colorA;
            }
          }
          span {
            margin-right: 14px;
            &:last-child {
              color: $colorA;
              cursor: pointer;
            }
          }
        }
        .select-version {
          margin-top: 14px;
          h2 {
            font-size: $fontH;
            font-weight: 500;
          }
          .gb {
            display: grid;
            gap: 10px;
            grid-template-columns: auto auto;
            margin-top: 10px;
            margin-bottom: 30px;
            span {
              @include border();
              height: 40px;
              line-height: 40px;
              font-size: $fontJ;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>
