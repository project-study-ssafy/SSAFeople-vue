<template>
  <div
    class="grid grid-cols-[minmax(200px,_1fr)_minmax(1148px,_1280px)_minmax(200px,_1fr)] bg-[#424242] h-40"
  >
    <div class="col-span-1">a</div>
    <div class="col-span-1 w-full mx-auto text-white flex items-center">
      <RouterLink to="/" class="mx-10">
        <img :src="LogoImage" alt="로고" />
      </RouterLink>
      <div>
        본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포
        등을 금합니다.<br />
        Copyright 2024. 우리 팀 이름 뭐로하지 All Rights Reserved.
      </div>
    </div>
    <div class="col-span-1">b</div>
  </div>
</template>
<script setup>
import LogoImage from "@/assets/logo_white.svg";
</script>
<style scoped></style>
