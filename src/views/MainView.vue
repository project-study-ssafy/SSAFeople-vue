<template>
  <div class="col-span-3">
    <MainHeader class="col-span-3" />
    <MainNavigation class="col-span-3" />
    <div
      class="col-span-3 grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white"
    >
      <div class="col-span-1"></div>
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
      <AdditionalContent class="col-span-1" />
      <div class="col-span-1"></div>
    </div>
  </div>
</template>
<script setup>
import { MainHeader, MainNavigation, AdditionalContent } from "@/components";
</script>
<style scoped></style>
