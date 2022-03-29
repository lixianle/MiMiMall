<template>
  <div class="order-list">
    <div class="container">
      <div class="list-wrap">
        <loading v-if="loading"></loading>
        <!-- 一个list -->
        <div class="order" v-for="(item, index) in list" :key="index">
          <div class="order-title">
            <div class="item-info fl">
              {{ item.createTime }}
              <span>|</span>
              {{ item.receiverName }}
              <span>|</span>
              订单号：{{ item.orderNo }}
              <span>|</span>
              {{ item.paymentTypeDesc }}
            </div>
            <div class="item-money fr">
              <span>应付金额：</span>
              <span class="money">{{ item.payment }}</span>
              <span>元</span>
            </div>
          </div>
          <div class="order-content clearfix">
            <div class="good-box fl">
              <div
                class="good-list"
                v-for="(subitem, i) in item.orderItemVoList"
                :key="i"
              >
                <div class="good-img">
                  <img :src="subitem.productImage" alt="" />
                </div>
                <div class="good-name">
                  <div class="p-name">{{ subitem.productName }}</div>
                  <div class="p-money">
                    {{ subitem.currentUnitPrice }} X {{ subitem.quantity }}元
                  </div>
                </div>
              </div>
            </div>
            <div class="good-state fr" v-if="item.status == 20">
              <a href="javascript:;">{{ item.statusDesc }}</a>
            </div>
            <div class="good-state fr" v-else>
              <a href="javascript:;" @click="goPay(item.orderNo)">{{
                item.statusDesc
              }}</a>
            </div>
          </div>
        </div>
        <no-data v-if="!loading && list.length == 0"></no-data>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from "@/api/index";
import Loading from "@/common/Loading.vue";
import NoData from "@/common/NoData.vue";
export default {
  name: "OrderList",
  data() {
    return {
      list: [],
      loading: true,
    };
  },
  components: {
    Loading,
    NoData,
  },
  mounted() {
    getOrderList()
      .then((res) => {
        this.loading = false;
        this.list = res.list;
      })
      .catch(() => {
        this.loading = false;
      });
  },
  methods: {
    goPay(orderNo) {
      this.$router.push({
        path: "/order/pay",
        query: { orderNo },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.order-list {
  padding: 30px 0 84px;
  background-color: $colorJ;
  .container {
    .list-wrap {
      .order {
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include hL(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: $fontI;
          color: $colorC;
        }
        .item-info {
          span {
            margin: 0 9px;
          }
        }
        .money {
          font-size: $fontD;
          color: $colorB;
        }
      }
      .order-content {
        padding: 0 43px;
        .good-box {
          width: 88%;
          .good-list {
            display: flex;
            align-items: center;
            height: 145px;
            .good-img {
              width: 112px;
              img {
                width: 100%;
              }
            }
            .good-name {
              font-size: $fontG;
              color: $colorB;
            }
          }
        }
        .good-state {
          @include hL(145px);
          font-size: $fontG;
          color: $colorA;
          a {
            color: $colorA;
          }
        }
      }
    }
  }
}
</style>
