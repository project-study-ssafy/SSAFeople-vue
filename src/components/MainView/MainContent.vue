<template>
  <div class="flex gap-5 my-5">
    <RouterView class="bg-white flex-none basis-9/12 rounded-xl" />
    <SideContent class="basis-3/12" />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { SideContent } from "@/components";
</script>

<style scoped></style>
