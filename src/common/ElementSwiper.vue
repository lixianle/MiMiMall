<template>
  <div class="block">
    <el-carousel trigger="click" height="560px">
      <el-carousel-item v-for="item in src" :key="item">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import "element-plus/theme-chalk/el-carousel.css";
import "element-plus/theme-chalk/el-carousel-item.css";
export default {
  name: "ElementSwiper",
  data() {
    return {
      src: [
        "/imgs/detail-swiper/detail-swiper-1.png",
        "/imgs/detail-swiper/detail-swiper-2.png",
        "/imgs/detail-swiper/detail-swiper-3.png",
        "/imgs/detail-swiper/detail-swiper-4.png",
      ],
    };
  },
};
</script>

<style>
.block {
  width: 560px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>
