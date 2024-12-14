<template>
  <div
    class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white h-10 border-b border-gray-300"
  >
    <div class="col-span-1"></div>
    <div
      class="col-span-1 w-full text-black m-1 flex flex-row items-center px-10 justify-between"
    >
      <a
        href="https://edu.ssafy.com"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-row justify-between items-center text-center"
      >
        <img :src="ssafyLogo" alt="에듀싸피" class="h-6 mr-2" />
        <span class="font-semibold text-sm">EDU SSAFY 바로가기</span>
      </a>
      <div class="flex flex-row justify-between w-60">
        <a
          href="https://job.ssafy.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-row justify-between items-center text-center"
        >
          <img :src="briefcase" alt="" class="h-6 mr-2" />
          <span class="font-semibold text-sm">JOB SSAFY</span>
        </a>
        <span class="border-r h-6 border-gray-300"></span>
        <a
          href="https://project.ssafy.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-row justify-between items-center text-center"
        >
          <img :src="pencil" alt="" class="h-4 mr-2" />
          <span class="font-semibold text-sm">실습실 바로가기</span>
        </a>
      </div>
    </div>
    <div class="col-span-1"></div>
  </div>
</template>
<script setup>
import ssafyLogo from "@/assets/icons/edu_ssafy.svg";
import pencil from "@/assets/icons/pencil.svg";
import briefcase from "@/assets/icons/briefcase.svg";
</script>
<style scoped></style>
