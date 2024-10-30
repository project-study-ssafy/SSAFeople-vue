<template>
  <div class="flex h-[1000px]">
    <RouterView
      class="bg-[#f0f0f0] p-5 m-5 flex-none basis-4/5 border-[1px] rounded-xl"
    />
    <SideContent class="basis-1/5 my-5" />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { SideContent } from "@/components";
</script>

<style scoped></style>
