<template>
  <div class="bg-[#f7f7f7] py-8 px-8 rounded-[16px]">
    <AppHeader :type="4" :text="props.title" class="mb-4" />
    <div class="swiper-wrap relative">
      <Swiper
        :modules="modules"
        :slides-per-view="4.2"
        :space-between="16"
        :navigation="{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }"
        :loop="true"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: true,
          pauseOnMouseEnter: true, // hover시 일시정지
        }"
        :scrollbar="{ draggable: true }"
        class="w-full h-[170px] cursor-pointer"
      >
        <!-- :pagination="{ clickable: true }" -->
        <SwiperSlide
          class="rounded-xl overflow-hidden"
          v-for="(image, index) in images"
          :key="index"
        >
          <img class="h-full" :src="image" alt="slider image" />
        </SwiperSlide>
      </Swiper>

      <button
        class="custom-prev absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg shadow-gray-500/30 z-10 flex items-center justify-center"
        @click="handlePrev"
      >
        <span class="text-sm font-bold">❮</span>
      </button>
      <button
        class="custom-next absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg shadow-gray-500/30 z-10 flex items-center justify-center"
        @click="handleNext"
      >
        <span class="text-sm font-bold">❯</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { AppHeader } from "@/components";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const modules = [Autoplay, Pagination, Navigation];

const props = defineProps({
  title: String,
  contexts: Array,
});

// 이미지 배열을 작성하거나 props로 받아 사용할 수 있습니다.
const images = [
  "https://picsum.photos/400/300",
  "https://picsum.photos/400/300?2",
  "https://picsum.photos/400/300?3",
  "https://picsum.photos/400/300?4",
  "https://picsum.photos/400/300?5",
  "https://picsum.photos/400/300?6",
];
</script>

<style></style>
