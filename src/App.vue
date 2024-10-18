<script setup>
import {
  TopBar,
  NavBar,
  Footer,
  MainArea,
  AdditionalContent,
} from "./components";
</script>

<template>
  <TopBar />
  <NavBar />
  <div class="app-container flex mx-auto w-[1280px] border-2 border-rose-300">
    <MainArea />
    <AdditionalContent />
  </div>
  <Footer />
</template>

<style scoped>
#main-area {
  width: 1280px;
  min-width: 1280px;
}

#additional-area {
  width: 200px; /* 고정 너비 (필요에 따라 조정) */
  min-width: 200px;
  height: 300px; /* 전체 화면 높이 */
  background-color: #f0f0f0; /* 배경색 (선택적) */
}
</style>
