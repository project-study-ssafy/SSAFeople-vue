<template>
  <div class="grid grid-cols-4 gap-x-12">
    <!-- <AppHeader
      class="h-0 indent-[-9999px] overflow-hidden"
      :type="1"
      text="싸뮤니티 게시판 화면"
    /> -->

    <BoardSideBar class="flex-1 col-span-1" />
    <div class="flex-1 col-span-3">
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
  </div>

  <!--  yeon-ver 비교 필요
     <div>
    <AppHeader
      class="h-0 indent-[-9999px] overflow-hidden"
      :type="1"
      text="싸뮤니티"
    />

   <AppButton button-type="square-border" text="test" />
    <AppButton button-type="ellipse-border" text="test" />
    <AppButton button-type="square-filled" text="test" />
    <AppButton button-type="ellipse-filled" text="test" />

    <BoardList></BoardList>
  </div> -->
</template>

<script setup>
import { AppHeader, BoardSideBar } from "@/components";
</script>
<style scoped></style>
