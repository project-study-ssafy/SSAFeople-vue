<template>
  <div>
    <AppHeader :type="1" text="게시판 화면" />
    <RouterView v-slot="{ Component }">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <!-- <RouterView /> -->
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { AppHeader } from "@/components";
</script>
<style scoped></style>
