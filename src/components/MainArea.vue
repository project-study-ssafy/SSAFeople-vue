<template>
  <div
    class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] gap-x-3 bg-blue-400"
  >
    <div class="col-span-1"></div>
    <MainContent class="col-span-1" />
    <AdditionalContent class="col-span-1" />
  </div>
</template>
<script setup>
import { MainContent, AdditionalContent } from ".";
</script>
<style scoped></style>
