<template>
  <div
    class="grid grid-cols-[minmax(200px,_1fr)_minmax(1148px,_1280px)_minmax(200px,_1fr)] bg-lime-300"
  >
    <div class="col-span-1"></div>
    <div
      class="col-span-1 w-full bg-orange-400 text-white flex flex-row justify-center items-center"
    >
      <!-- 로고 -->
      <RouterLink to="/" class="mx-10">
        <img :src="LogoImage" alt="로고" />
      </RouterLink>
      <!-- 검색창 -->
      <div class="border border-[#3396F4] p-3 mx-10 rounded-full">
        <input
          type="text"
          name="search"
          id="search"
          class="w-[300px] mx-5 text-3xl text-black"
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
