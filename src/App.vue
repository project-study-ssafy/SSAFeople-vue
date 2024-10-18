<script setup>
import { TopBar, NavBar, Footer, MainArea } from "./components";
</script>

<template>
  <div
    class="min-w-[1750px] grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] gap-x-3 bg-blue-400"
  >
    <TopBar class="col-span-3" />
    <NavBar class="col-span-3" />
    <MainArea class="col-span-3" />
    <Footer class="col-span-3" />
  </div>
</template>

<style scoped></style>
