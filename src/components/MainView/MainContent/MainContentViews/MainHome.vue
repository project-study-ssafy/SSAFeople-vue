<!-- MainHome.vue -->
<template>
  <div class="grid grid-cols-4 gap-x-10">
    <div class="col-span-3 space-y-6">
      <AppImageSlider class="col-span-2" />
      <div class="grid grid-cols-2 gap-4">
        <!-- BoardCard들을 위한 새로운 grid 컨테이너 -->
        <BoardCard title="🔥실시간 인기글" :contexts="myContexts" />
        <BoardCard title="🔥인기 스터디" :contexts="myContexts" />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4">
        <LiveChatCard title="HOT 익명 채팅방" />
        <RestaurantRank title="SSAFY 주변 맛집 랭킹" />
      </div>
      <UsedTrade title="삽니다/팝니다" class="col-span-2" />
    </div>
    <SideContent class="col-span-1" />
  </div>
  <!-- <div class="grid grid-col-2 gap-5"></div> -->
</template>

<script setup>
import {
  AppImageSlider,
  BoardCard,
  LiveChatCard,
  RestaurantRank,
  UsedTrade,
  SideContent,
} from "@/components";
const myContexts = [
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
];
</script>
<style scoped></style>

<!-- 메인페이지 구조 style 변경 및 요소 추가 -->
