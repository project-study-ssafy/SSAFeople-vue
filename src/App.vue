<script setup>
import { MainFooter, MainTopbar } from "@/components";
</script>

<template>
  <div
    class="min-w-[1280px] grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] gap-x-3 bg-white"
  >
    <MainTopbar class="col-span-3" />
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
    <MainFooter class="col-span-3" />
  </div>
</template>

<style scoped></style>
