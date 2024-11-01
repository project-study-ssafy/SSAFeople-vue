<template>
  <MainHeader class="col-span-3" />
  <MainNavigation class="col-span-3" />
  <div
    class="col-span-3 grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white"
  >
    <div class="col-span-1"></div>
    <div class="col-span-1 grid grid-cols-4 min-h-[700px]">
      <div class="col-span-1 bg-red-300">1</div>
      <div class="col-span-3 bg-yellow-300">2</div>
    </div>
    <div class="col-span-1"></div>
  </div>
</template>
<script setup>
import { MainHeader, MainNavigation } from "@/components";
</script>
<style scoped></style>
