<template>
  <div class="order-pay">
    <div class="container">
      <div class="order-wrap">
        <div class="item-order">
          <div class="icon-succ"></div>
          <div class="order-info">
            <h2>订单提交成功！去付款咯~~~</h2>
            <p>请在<span>30分</span>内完成支付，超市将取消订单</p>
            <p>收货信息:{{ addressInfo }}</p>
          </div>
          <div class="order-total">
            <p>
              应付总额：<span>{{ payment }}</span
              >元
            </p>
            <p>
              订单详情<em
                class="icon-down"
                :class="{ up: showDetail }"
                @click="showDetail = !showDetail"
              ></em>
            </p>
          </div>
        </div>
        <div class="item-detail" v-if="showDetail">
          <div class="item">
            <div class="detail-title">订单号：</div>
            <div class="detail-info theme-color">{{ orderNo }}</div>
          </div>
          <div class="item">
            <div class="detail-title">收货信息：</div>
            <div class="detail-info">{{ addressInfo }}</div>
          </div>
          <div class="item good">
            <div class="detail-title">商品名称：</div>
            <div class="detail-info">
              <ul>
                <li v-for="(item, index) in orderDetail" :key="index">
                  <img :src="item.productImage" />{{ item.productName }}
                </li>
              </ul>
            </div>
          </div>
          <div class="item">
            <div class="detail-title">发票信息：</div>
            <div class="detail-info">电子发票 个人</div>
          </div>
        </div>
      </div>
      <div class="pay-wrap">
        <h3>选择以下支付方式付款</h3>
        <div class="pay-way">
          <p>支付平台</p>
          <div
            class="pay pay-ali"
            :class="{ checked: payType == 1 }"
            @click="paySubmit(1)"
          ></div>
          <div
            class="pay pay-wechat"
            :class="{ checked: payType == 2 }"
            @click="paySubmit(2)"
          ></div>
        </div>
      </div>
    </div>
    <scan-pay-code
      v-if="showPay"
      :img="payImg"
      @close="closePayModal"
    ></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal = false"
      @submit="goOrderList"
    >
      <template v-slot:body>
        <p>您确认是否完成支付？</p>
      </template>
    </modal>
  </div>
</template>

<script>
import QrCode from "qrcode";
import ScanPayCode from "@/common/ScanPayCode.vue";
import Modal from "@/common/Modal.vue";
import { getOrderDetail, paySubmit } from "@/api/index";
export default {
  name: "OrderPay",
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      addressInfo: "",
      orderDetail: [],
      showDetail: false,
      payType: "",
      showPay: false,
      payImg: "",
      showPayModal: false,
      payment: 0,
      T: "",
    };
  },
  components: {
    ScanPayCode,
    Modal,
  },
  mounted() {
    getOrderDetail(this.orderNo).then((res) => {
      let item = res.shippingVo;
      this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress} ${item.receiverZip}`;
      this.orderDetail = res.orderItemVoList;
      this.payment = res.payment;
    });
  },
  methods: {
    paySubmit(payTypeId) {
      this.payType = payTypeId;
      if (payTypeId == 1) {
        window.open("/#/order/alipay?orderId=" + this.orderNo, "_blank");
      } else {
        paySubmit(this.orderNo, 2).then((res) => {
          QrCode.toDataURL(res.content)
            .then((url) => {
              this.showPay = true;
              this.payImg = url;
              this.loopOrderStatus();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    },
    closePayModal() {
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.T);
    },
    loopOrderStatus() {
      this.T = setInterval(() => {
        getOrderDetail(this.orderNo).then((res) => {
          if (res.status == 20) {
            clearInterval(this.T);
            this.$router.push("/order/list");
          }
        });
      }, 1000);
    },
    goOrderList() {
      this.$router.push("/order/list");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/base.scss";
.order-pay {
  padding: 30px 0 84px;
  background-color: $colorJ;
  .container {
    .order-wrap {
      padding: 62px 50px 50px 30px;
      margin-bottom: 30px;
      background-color: $colorG;
      font-size: $fontJ;
      .item-order {
        display: flex;
        align-items: center;
        padding-bottom: 60px;
        .icon-succ {
          @include wH(90px, 90px);
          margin-right: 40px;
          border-radius: 50%;
          background: url("/imgs/icon-gou.png") #80c58a no-repeat center;
          background-size: 60px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: $fontE;
            color: $colorB;
            margin-bottom: 20px;
          }
          p {
            color: $colorC;
            span {
              color: $colorA;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: $fontC;
            color: $colorA;
          }
          .icon-down {
            display: inline-block;
            margin-left: 9px;
            @include bgImg(14px, 10px, "/imgs/icon-down.png");
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        padding: 47px 0 0 130px;
        border-top: 1px solid #e5e5e5;
        font-size: $fontJ;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .pay-wrap {
      padding: 26px 50px 72px;
      background-color: $colorG;
      color: $colorB;
      h3 {
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
        font-size: 20px;
        font-weight: 200;
        color: $colorB;
      }
      .pay-way {
        font-size: $fontH;
        .pay {
          display: inline-block;
          @include wH(188px, 64px);
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          margin-top: 19px;
          background: url("/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 103px 38px;
        }
        .pay-wechat {
          background: url("/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>
