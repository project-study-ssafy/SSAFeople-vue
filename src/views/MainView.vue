<template>
  <div class="col-span-3">
    <MainHeader />
    <MainNavigation />
    <div class="grid grid-cols-[1fr_minmax(auto,_1280px)_1fr] pt-5 pb-[70px]">
      <div class="col-span-1"></div>
      <RouterView v-slot="{ Component }" :key="$route.fullPath">
        <Transition
          enter-active-class="transition-opacity duration-200 ease-in-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200 ease-in-out"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>

      <div class="col-span-1"></div>
    </div>
  </div>
</template>
<script setup>
import { MainHeader, MainNavigation, AdditionalContent } from "@/components";
</script>
<style scoped></style>
