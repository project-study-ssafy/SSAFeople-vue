<template>
  <div class="flex gap-5 my-5">
    <RouterView
      v-slot="{ Component }"
      class="bg-white flex-none basis-9/12 rounded-xl"
    >
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
    <UserProfile class="basis-3/12" />
  </div>
</template>

<script setup>
import { UserProfile } from "@/components";
</script>

<style scoped></style>
