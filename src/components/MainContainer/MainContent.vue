<template>
  <div class="flex h-[700px]">
    <RouterView v-slot="{ Component }">
      <transition name="fade-only" mode="out-in">
        <component
          :is="Component"
          class="bg-[#f0f0f0] p-5 m-5 flex-none basis-4/5 border-[1px] rounded-3xl"
        />
      </transition>
    </RouterView>
    <SideContent class="basis-1/5 my-5" />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { SideContent } from "@/components";
</script>

<style scoped>
/* Fade 애니메이션 */
.fade-only-enter-active,
.fade-only-leave-active {
  transition: opacity 0.2s ease; /* 애니메이션 시간 조절 */
}
.fade-only-enter {
  opacity: 0; /* 처음에 투명하게 시작 */
}
.fade-only-leave-to {
  opacity: 0; /* 사라질 때도 투명하게 */
}
</style>
