<template>
  <div class="grid grid-col-2 gap-5">
    <AppImageSlider class="col-span-2" />

    <BoardCard title="🔥 인기글" :contexts="myContexts" class="col-span-1" />
    <BoardCard title="🔥 인기글" :contexts="myContexts" class="col-span-1" />
  </div>
</template>

<script setup>
import { AppImageSlider, BoardCard } from "@/components";
const myContexts = [
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
  "안녕하세요. 인기글의 제목입니다.",
];
</script>
<style scoped></style>
