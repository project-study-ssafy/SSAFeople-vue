<template>
  <div class="relative">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="50"
      :centeredSlides="true"
      :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next',
      }"
      :loop="true"
      :autoplay="{
        delay: 3500,
        disableOnInteraction: false,
      }"
      :scrollbar="{ draggable: true }"
      class="rounded-xl w-full h-[170px] cursor-pointer"
    >
      <!-- :pagination="{ clickable: true }" -->
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <img :src="image" alt="slider image" />
      </SwiperSlide>
    </Swiper>

    <button
      class="custom-prev absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg shadow-gray-500/30 z-10 flex items-center justify-center left-[-20px]"
      @click="handlePrev"
    >
      <span class="text-sm font-bold">❮</span>
    </button>
    <button
      class="custom-next absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg shadow-gray-500/30 z-10 flex items-center justify-center right-[-20px]"
      @click="handleNext"
    >
      <span class="text-sm font-bold">❯</span>
    </button>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Autoplay, Pagination, Navigation];

// 이미지 배열을 작성하거나 props로 받아 사용 가능
const images = [
  "https://picsum.photos/1100/300",
  "https://picsum.photos/1100/300?2",
  "https://picsum.photos/1100/300?3",
  "https://picsum.photos/1100/300?4",
  "https://picsum.photos/1100/300?5",
  "https://picsum.photos/1100/300?6",
];
</script>

<style></style>
