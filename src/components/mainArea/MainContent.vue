<template>
<div id="main-content">
  <RouterView id="main-view"/>
  <SideContents id="side-view"/>
</div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import SideContents from './contents/SideContents.vue';
</script>
<style scoped>
#main-content {
  display: flex; /* Flexbox로 배치 */
  height: 2000px;
}

#main-view {
  flex: 0 0 80%; /* 8:2 비율의 80% */
  padding: 20px; /* 패딩 추가 */
  background-color: #f0f0f0; /* 배경색으로 구분 */
}

#side-view {
  flex: 0 0 20%; /* 8:2 비율의 20% */
  padding: 20px; /* 패딩 추가 */
  background-color: #d0d0d0; /* 배경색으로 구분 */
}
</style>