<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span class="slot"
          >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
        >
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span
                class="checkbox"
                :class="{ checked: allChecked }"
                @click="toggleAll"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li v-for="(item, index) in list" :key="index" class="cart-item">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{ checked: item.productSelected }"
                  @click="updateCart(item, '')"
                ></span>
                &nbsp; &nbsp;&nbsp;
              </div>
              <div class="item-name">
                <img :src="item.productMainImage" alt="" />
                <span>{{
                  item.productName + " , " + item.productSubtitle
                }}</span>
              </div>
              <div class="item-price">{{ item.productPrice }}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <div class="item-total">{{ item.productTotalPrice }}元</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{ list.length }}</span
            >件商品，已选择<span>{{ checkedNum.length }}</span
            >件
          </div>
          <div class="total fr">
            合计：<span>{{ cartTotalPrice }}</span
            >元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "@/common/OrderHeader.vue";
import ServiceBar from "@/common/ServiceBar.vue";
import NavFooter from "@/common/NavFooter.vue";
import {
  getCartList,
  toggleGetCartList,
  toUpdateCart,
  toDelProduct,
} from "@/api/index";
export default {
  name: "Cart",
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar,
  },
  data() {
    return {
      list: [], // 商品列表
      allChecked: false, // 是否全选
      cartTotalPrice: 0, // 商品总金额
      checkedNum: 0, // 选中商品数量
      productSelected: false,
    };
  },
  mounted() {
    getCartList().then((res) => {
      this.renderData(res);
    });
  },
  methods: {
    toggleAll() {
      let url = this.allChecked ? "/carts/unSelectAll" : "/carts/selectAll";
      toggleGetCartList(url).then((res) => {
        this.renderData(res);
      });
    },
    renderData(res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.checkedNum = this.list.filter((item) => {
        return item.productSelected;
      });
    },
    updateCart(item, type) {
      let quantity = item.quantity;
      let selected = item.productSelected;
      if (type == "-") {
        if (quantity == 1) {
          alert("商品至少保留一件");
          return;
        }
        --quantity;
      } else if (type == "+") {
        if (quantity > item.productStock) {
          alert("购买数量不能超过库存数量");
          return;
        }
        ++quantity;
      } else {
        selected = !item.productSelected;
      }
      toUpdateCart(item.productId, quantity, selected).then((res) => {
        this.renderData(res);
      });
    },
    // 后面删除可加一个弹框modal,待做
    delProduct(item) {
      toDelProduct(item.productId).then((res) => {
        this.renderData(res);
      });
    },
    order() {
      let isChecked = this.list.every((item) => {
        return !item.productSelected;
      });
      if (isChecked) {
        alert("请选择商品！");
      } else {
        this.$router.push("/order/comfirm");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.cart {
  .slot {
    margin-left: 17px;
    font-size: $fontJ;
    color: $colorD;
    font-weight: 200;
  }
  .wrapper {
    padding: 30px 0 114px;
    background-color: $colorJ;
    .cart-box {
      background-color: $colorG;
      text-align: center;
      font-size: $fontJ;
      color: $colorD;
      .checkbox {
        display: inline-block;
        box-sizing: border-box;
        @include wH(22px, 22px);
        @include border();
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        @include hL(79px);
        user-select: none;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
    }
    .cart-item-list {
      .cart-item {
        display: flex;
        align-items: center;
        height: 125px;
        border-top: 1px solid #e5e5e5;
        font-size: $fontI;
        .item-check {
          flex: 1;
        }
        .item-name {
          display: flex;
          align-items: center;
          flex: 3;
          font-size: $fontH;
          color: $colorB;
          img {
            @include wH(80px, 80px);
            vertical-align: middle;
          }
          span {
            margin-left: 30px;
          }
        }
        .item-price {
          flex: 1;
          color: $colorB;
        }
        .item-num {
          flex: 2;
          .num-box {
            display: inline-block;
            width: 150px;
            height: 40px;
            line-height: 40px;
            @include border();
            font-size: $fontJ;
            a {
              display: inline-block;
              width: 50px;
              color: $colorB;
            }
            span {
              display: inline-block;
              width: 50px;
              color: $colorB;
            }
          }
        }
        .item-total {
          flex: 1;
          color: $colorA;
        }
        .item-del {
          flex: 1;
          @include wH(14px, 12px);
          background: url("/imgs/icon-close.png") no-repeat center;
          background-size: contain;
          cursor: pointer;
        }
      }
    }
  }
  .order-wrap {
    @include hL(50px);
    margin-top: 20px;
    font-size: $fontJ;
    color: $colorC;

    .cart-tip {
      margin-left: 29px;
      a {
        margin-right: 37px;
        color: $colorC;
      }
      span {
        color: $colorA;
        margin: 0 5px;
      }
    }
    .total {
      font-size: $fontJ;
      color: $colorA;
      span {
        font-size: $fontE;
      }
      a {
        width: 202px;
        @include hL(50px);
        font-size: $fontH;
        margin-left: 37px;
      }
    }
  }
}
</style>
