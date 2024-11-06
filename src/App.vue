<script setup>
import { MainFooter, MainTopbar } from "@/components";
</script>

<template>
  <div
    class="min-w-[1280px] grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] gap-x-3 bg-white"
  >
    <MainTopbar class="col-span-3" />
    <RouterView />
    <MainFooter class="col-span-3" />
  </div>
</template>

<style scoped></style>
