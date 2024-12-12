<template>
  <div class="grid grid-cols-4 gap-x-12">
    <BoardSideBar class="flex-1 col-span-1" />
    <div class="flex-1 col-span-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { BoardSideBar } from "@/components";
</script>

<style scoped></style>
