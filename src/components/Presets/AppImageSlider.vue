<template>
  <Swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    :centeredSlides="true"
    navigation
    :autoplay="{
      delay: 3500,
      disableOnInteraction: false,
    }"
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    class="rounded-xl w-full h-[170px]"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <img :src="image" alt="slider image" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Autoplay, Pagination, Navigation];

// 이미지 배열을 작성하거나 props로 받아 사용할 수 있습니다.
const images = [
  "https://picsum.photos/1100/200",
  "https://picsum.photos/1100/200?2",
  "https://picsum.photos/1100/200?3",
];
</script>

<style></style>
