<template>
  <div
    class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] border-b border-gray-300 top-0 sticky z-20 bg-white"
  >
    <div class="col-span-1"></div>
    <nav class="col-span-1 w-full text-black flex flex-col relative">
      <!-- 이부분에 v-show로 로고 : 스크롤이 특정 길이 이상 내려갔을 때 -->
      <div class="flex items-center h-20 relative">
        <RouterLink v-show="showLogo" to="/" class="mx-10">
          <img :src="LogoImage" alt="로고" />
        </RouterLink>
        <div
          ref="menuArea"
          class="hamburger flex flex-col cursor-pointer px-10 py-10 absolute"
          :class="showLogo ? 'hidden' : 'block'"
          @click="toggleMenu"
        >
          <div
            class="bg-black mb-1 h-1 w-8 transition-all duration-300 ease-in-out"
            :class="{ 'transform rotate-45 translate-y-2': isMenuOpen }"
          ></div>
          <div
            class="bg-black mb-1 h-1 w-8 transition-all duration-300 ease-in-out"
            :class="{ 'opacity-0': isMenuOpen }"
          ></div>
          <div
            class="bg-black h-1 w-8 transition-all duration-300 ease-in-out"
            :class="{ 'transform -rotate-45 -translate-y-2': isMenuOpen }"
          ></div>
        </div>
        <div class="w-[600px] grid grid-cols-4 text-center text-base ml-28">
          <RouterLink to="/info" class="navbar-item rounded font-bold px-2"
            >싸피 Info</RouterLink
          >
          <RouterLink to="/board" class="navbar-item rounded font-bold px-2"
            >싸뮤니티</RouterLink
          >
          <RouterLink to="/challenge" class="navbar-item rounded font-bold px-2"
            >코딩 Challenge</RouterLink
          >
          <RouterLink to="/util" class="navbar-item rounded font-bold px-2"
            >싸피 Util</RouterLink
          >
        </div>
      </div>

      <!-- 햄버거 메뉴가 열렸을 때 세부 항목 -->
      <div
        :class="{
          'opacity-0 translate-y-[-20px] invisible': !isMenuOpen,
          'opacity-100 translate-y-0 visible': isMenuOpen,
        }"
        class="absolute left-0 right-0 bg-white top-full transition-all duration-[500ms] ease-in-out z-20"
      >
        <div
          class="ml-28 grid grid-cols-4 text-center w-[600px] justify-between my-2"
        >
          <div class="flex flex-col space-y-2 justify-center items-center">
            <RouterLink
              to="/info/detail1"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Info 1</RouterLink
            >
            <RouterLink
              to="/info/detail2"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Info 2</RouterLink
            >
            <RouterLink
              to="/info/detail3"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Info 3</RouterLink
            >
          </div>
          <div class="flex flex-col space-y-2 justify-center items-center">
            <RouterLink
              to="/board/detail1"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 커뮤니티 1</RouterLink
            >
            <RouterLink
              to="/board/detail2"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 커뮤니티 2</RouterLink
            >
            <RouterLink
              to="/board/detail3"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 커뮤니티 3</RouterLink
            >
          </div>
          <div class="flex flex-col space-y-2 justify-center items-center">
            <RouterLink
              to="/challenge/detail1"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Challenge 1</RouterLink
            >
            <RouterLink
              to="/challenge/detail2"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Challenge 2</RouterLink
            >
            <RouterLink
              to="/challenge/detail3"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Challenge 3</RouterLink
            >
          </div>
          <div class="flex flex-col space-y-2 justify-center items-center">
            <RouterLink
              to="/util/detail1"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Util 1</RouterLink
            >
            <RouterLink
              to="/util/detail2"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Util 2</RouterLink
            >
            <RouterLink
              to="/util/detail3"
              class="navbar-item rounded hover:bg-gray-200"
              >세부 Util 3</RouterLink
            >
          </div>
        </div>
      </div>
    </nav>
    <div class="col-span-1"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LogoImage from "@/assets/logo.svg";

const isMenuOpen = ref(false); // 메뉴 상태를 관리
const showLogo = ref(false);
const menuArea = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value; // 메뉴 상태 토글
};

const handleScroll = () => {
  if (window.scrollY > 167) {
    showLogo.value = true;
    isMenuOpen.value = false;
  } else {
    showLogo.value = false;
  }
};

const handleClick = (e) => {
  if (menuArea.value && !menuArea.value.contains(e.target)) {
    isMenuOpen.value = false;
  }
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("click", handleClick);
</script>

<style scoped></style>
