<template>
  <div class="flex h-[2000px]">
    <RouterView class="bg-[#f0f0f0] p-5 flex-none basis-4/5" />
    <SideBanner class="bg-[#d0d0d0] p-5 flex-none basis-1/5" />
  </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import { SideBanner } from "..";
</script>
<style scoped></style>
