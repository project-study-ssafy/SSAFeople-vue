<template>
  <div
    class="grid grid-cols-[minmax(200px,_1fr)_minmax(1148px,_1280px)_minmax(200px,_1fr)] bg-blue-400"
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
