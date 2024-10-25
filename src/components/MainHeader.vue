<template>
  <div
    class="grid grid-cols-[minmax(200px,_1fr)_minmax(1148px,_1280px)_minmax(200px,_1fr)] bg-white h-32 border-[#EEEEEE] border-b-[1px]"
  >
    <div class="col-span-1"></div>
    <div class="col-span-1 w-full text-white flex flex-row items-center">
      <!-- 로고 -->
      <RouterLink to="/" class="mx-10">
        <img :src="LogoImage" alt="로고" />
      </RouterLink>
      <!-- 검색창 -->
      <div
        class="border border-[#3396F4] p-3 mx-10 rounded-full min-w-[600px] flex items-center"
      >
        <input
          type="text"
          name="search"
          id="search"
          class="w-[500px] mx-5 text-xl text-black border-0 outline-none bg-transparent p-0"
        />
        <button class="w-6 mx-5">
          <img :src="Magnifier" alt="검색" />
        </button>
      </div>
    </div>
    <div class="col-span-1"></div>
  </div>
</template>
<script setup>
import LogoImage from "@/assets/logo.svg";
import Magnifier from "@/assets/magnifier.svg";
</script>
<style scoped></style>
