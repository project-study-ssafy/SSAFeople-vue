<template>
  <div
    class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] border-[#EEEEEE] border-b-2 top-0 sticky z-20 bg-white"
  >
    <div class="col-span-1"></div>
    <nav class="col-span-1 w-full text-black flex flex-col">
      <!-- 이부분에 v-show로 로고 : 스크롤이 특정 길이 이상 내려갔을 때 -->
      <div class="flex items-center h-16 relative">
        <RouterLink v-show="showLogo" to="/" class="mx-10">
          <img :src="LogoImage" alt="로고" />
        </RouterLink>
        <div
          class="hamburger flex flex-col cursor-pointer mr-12"
          :class="showLogo ? 'hidden' : 'block'"
          @click="toggleMenu"
        >
          <div
            class="bg-[#454545] mb-1.5 h-0.5 w-6 transition-all duration-300 ease-in-out"
            :class="{ 'transform rotate-45 translate-y-2': isMenuOpen }"
          ></div>
          <div
            class="bg-[#454545] mb-1.5 h-0.5 w-4 transition-all duration-300 ease-in-out"
            :class="{ 'opacity-0': isMenuOpen }"
          ></div>
          <div
            class="bg-[#454545] h-0.5 w-6 transition-all duration-300 ease-in-out"
            :class="{ 'transform -rotate-45 -translate-y-2': isMenuOpen }"
          ></div>
        </div>
        <nav class="flex gap-10 text-center text-lg text-[#333]">
          <RouterLink
            active-class="router-active"
            to="/info"
            class="navbar-item hover:text-[var(--ssafy-blue)] transition rounded font-[600] px-2 text-start"
            >싸피 Info</RouterLink
          >
          <RouterLink
            active-class="router-active"
            to="/ssammunity"
            class="navbar-item hover:text-[var(--ssafy-blue)] transition rounded font-[600] px-2 text-start"
            >싸뮤니티</RouterLink
          >
          <RouterLink
            active-class="router-active"
            to="/challenge"
            class="navbar-item hover:text-[var(--ssafy-blue)] transition rounded font-[600] px-2 text-start"
            >코딩 Challenge</RouterLink
          >
          <RouterLink
            active-class="router-active"
            to="/util"
            class="navbar-item hover:text-[var(--ssafy-blue)] transition rounded font-[600] px-2 text-start"
            >싸피 Util</RouterLink
          >
        </nav>
      </div>

      <!-- 햄버거 메뉴가 열렸을 때 세부 항목 -->
      <div
        :class="{
          'opacity-0 translate-y-[-20px] invisible': !isMenuOpen,
          'opacity-100 translate-y-0 visible': isMenuOpen,
        }"
        class="flex justify-center w-full absolute left-0 right-0 bg-white top-full transition-all duration-[500ms] ease-in-out z-20 border-solid border-b-2 border-gray-200"
      >
        <div class="min-w-[1280px] flex justify-start gap-4 mt-6 mb-8">
          <div
            class="navbar-item-box flex flex-col space-y-2 justify-start items-center border-solid border-r-2 border-gray-300"
          >
            <RouterLink
              to="/info"
              class="inline-block navbar-item rounded text-[#222] font-[600] text-base w-full pr-10"
              >싸피 Info</RouterLink
            >
            <div class="pl-1 flex flex-col gap-1">
              <RouterLink to="/info/detail1" class="rounded pr-10"
                >세부 Info 1</RouterLink
              >
              <RouterLink to="/info/detail2" class="rounded pr-10"
                >세부 Info 2</RouterLink
              >
              <RouterLink to="/info/detail3" class="rounded pr-10"
                >세부 Info 3</RouterLink
              >
            </div>
          </div>
          <div
            class="navbar-item-box flex flex-col space-y-2 justify-start items-center border-solid border-r-2 border-gray-300"
          >
            <RouterLink
              to="/ssammunity"
              class="navbar-item rounded text-[#222] font-[600] text-base w-full pr-10"
              >싸뮤니티</RouterLink
            >
            <div class="pl-1 flex flex-col gap-1">
              <RouterLink to="/board/detail1" class="rounded pr-10"
                >세부 커뮤니티 1</RouterLink
              >
              <RouterLink to="/board/detail2" class="rounded pr-10"
                >세부 커뮤니티 2</RouterLink
              >
              <RouterLink to="/board/detail3" class="rounded pr-10"
                >세부 커뮤니티 3</RouterLink
              >
            </div>
          </div>
          <div
            class="navbar-item-box flex flex-col space-y-2 justify-center items-center border-solid border-r-2 border-gray-300"
          >
            <RouterLink
              to="/challenge"
              class="navbar-item rounded text-[#222] font-[600] text-base w-full pr-10"
              >코딩 Challenge</RouterLink
            >
            <div class="pl-1 flex flex-col gap-1">
              <RouterLink to="/challenge/detail1" class="rounded pr-10"
                >세부 Challenge 1</RouterLink
              >
              <RouterLink to="/challenge/detail2" class="rounded pr-10"
                >세부 Challenge 2</RouterLink
              >
              <RouterLink to="/challenge/detail3" class="rounded pr-10"
                >세부 Challenge 3</RouterLink
              >
            </div>
          </div>
          <div
            class="navbar-item-box flex flex-col space-y-2 justify-center items-center border-solid border-r-2 border-gray-300"
          >
            <RouterLink
              to="/util"
              class="navbar-item rounded text-[#222] font-[600] text-base w-full pr-10"
              >싸피 Util</RouterLink
            >
            <div class="pl-1 flex flex-col gap-1">
              <RouterLink to="/util/detail1" class="rounded w-full pr-10"
                >세부 Util 1</RouterLink
              >
              <RouterLink to="/util/detail2" class="rounded pr-10"
                >세부 Util 2</RouterLink
              >
              <RouterLink to="/util/detail3" class="rounded pr-10"
                >세부 Util 3</RouterLink
              >
            </div>
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value; // 메뉴 상태 토글
};

const handleScroll = () => {
  if (window.scrollY > 130) {
    showLogo.value = true;
    isMenuOpen.value = false;
  } else {
    showLogo.value = false;
  }
};

window.addEventListener("scroll", handleScroll);
</script>

<style scoped>
.navbar-item:hover {
  color: var(--ssafy-blue);
  transition: all 0.3s;
}
.navbar-item-box:hover .navbar-item {
  color: var(--ssafy-blue);
  transition: all 0.3s;
}
.navbar-item-box > div > *:hover {
  color: var(--ssafy-blue);
  transition: all 0.3s;
}
.router-active {
  color: var(--ssafy-blue);
}
</style>
