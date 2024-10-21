<script setup>
import { MainHeader, MainNavigation, MainFooter, MainView } from "./components";
</script>

<template>
  <div
    class="min-w-[1750px] grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] gap-x-3 bg-blue-400"
  >
    <MainHeader class="col-span-3" />
    <MainNavigation class="col-span-3" />
    <MainView class="col-span-3" />
    <MainFooter class="col-span-3" />
  </div>
</template>

<style scoped></style>
