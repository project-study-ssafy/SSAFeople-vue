<template>
  <MainHeader class="col-span-3" />
  <MainNavigation class="col-span-3" />
  <div
    class="col-span-3 grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white"
  >
    <div class="col-span-1"></div>
    <MainContent class="col-span-1" />
    <!-- <AdditionalContent class="col-span-1" /> -->
    <div class="col-span-1"></div>
  </div>
</template>
<script setup>
import { MainContent, MainHeader, MainNavigation } from "@/components";
</script>
<style scoped></style>
