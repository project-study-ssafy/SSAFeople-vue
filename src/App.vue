<script setup>
import {
  MainHeader,
  MainNavigation,
  MainFooter,
  MainTopbar,
} from "./components";
</script>

<template>
  <div
    class="min-w-[1280px] grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] gap-x-3 bg-white"
  >
    <MainTopbar class="col-span-3" />
    <MainHeader class="col-span-3" />
    <MainNavigation class="col-span-3" />
    <RouterView class="col-span-3" />
    <MainFooter class="col-span-3" />
  </div>
</template>

<style scoped></style>
