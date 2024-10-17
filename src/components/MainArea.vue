<template>
  <div id="main-area">
    <MainContent />
  </div>
</template>
<script setup>
import { MainContent } from ".";
</script>
<style scoped>
#main-area {
  border: 1px solid black;
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
}
</style>
