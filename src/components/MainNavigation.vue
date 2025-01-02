<template>
  <div
    class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] border-b border-gray-300 top-0 sticky z-20 bg-white"
  >
    <div class="col-span-1"></div>
    <nav class="col-span-1 w-full text-black flex flex-col">
      <!-- 이부분에 v-show로 로고 : 스크롤이 특정 길이 이상 내려갔을 때 -->
      <div class="flex items-center h-16 relative">
        <RouterLink v-show="showLogo" to="/" class="mx-10">
          <img :src="LogoImage" alt="로고" />
        </RouterLink>
        <div
          ref="menuArea"
          class="hamburger flex flex-col cursor-pointer mr-8"
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
        <nav
          v-for="menu in Menus"
          :key="menu.name"
          class="flex gap-10 text-center text-lg text-[#333]"
        >
          <RouterLink
            active-class="router-active"
            :to="menu.to"
            class="navbar-item hover:text-[var(--ssafy-blue)] transition rounded font-[600] px-4 text-start"
            >{{ menu.name }}</RouterLink
          >
          <!-- <RouterLink
            active-class="router-active"
            to="/info"
            class="navbar-item hover:text-[var(--ssafy-blue)] transition rounded font-[600] px-2 text-start"
            >싸피 Info</RouterLink
          >
          <RouterLink
            active-class="router-active"
            to="/board"
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
          > -->
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
        <!-- 여기부터 -->
        <div class="min-w-[1280px] ml-28 flex text-center w-[600px] pt-4 pb-5">
          <div
            v-for="menu in Menus"
            :key="menu.name"
            class="flex flex-col space-y-2 items-start pr-5 mr-5 border-r-[1px]"
          >
            <RouterLink
              :to="menu.to"
              class="navbar-item rounded text-start text-[#222] font-[600] text-base w-full pr-10"
              >{{ menu.name }}</RouterLink
            >

            <div class="flex flex-col space-y-2 items-center">
              <RouterLink
                v-for="item in menu.subItems"
                :key="item.name"
                :to="item.to"
                class="navbar-item rounded"
              >
                {{ item.name }}
              </RouterLink>
              <!-- 여기까지  -->
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
const menuArea = ref(null);

const Menus = [
  {
    name: "싸피 Info",
    to: "/info",
    subItems: [
      { name: "info 1", to: "/info/detail1" },
      { name: "info 2", to: "/info/detail2" },
      { name: "info 3", to: "/info/detail3" },
    ],
  },
  {
    name: "싸뮤니티",
    to: "/board",
    subItems: [
      { name: "community 1", to: "/community/detail1" },
      { name: "community 2", to: "/board/chat/1" },
      { name: "community 3", to: "/board/chat/2" },
    ],
  },
  {
    name: "코딩 Challenge",
    to: "/challenge",
    subItems: [
      { name: "challenge 1", to: "/challenge/detail1" },
      { name: "challenge 2", to: "/challenge/detail2" },
      { name: "challenge 3", to: "/challenge/detail3" },
    ],
  },
  {
    name: "싸피 Util",
    to: "/util",
    subItems: [
      { name: "util 1", to: "/util/detail1" },
      { name: "util 2", to: "/util/detail2" },
      { name: "util 3", to: "/util/detail3" },
    ],
  },
];

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
