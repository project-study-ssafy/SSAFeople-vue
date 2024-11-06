<template>
  <MainHeader class="col-span-3" />
  <MainNavigation class="col-span-3" />
  <div
    class="col-span-3 grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white"
  >
    <div class="col-span-1"></div>
    <div class="col-span-1 grid grid-cols-5 gap-5 my-5">
      <div class="col-span-1 space-y-5">
        <!-- 사용자 프로필 카드 -->
        <div
          class="bg-white rounded-xl p-5 flex flex-col justify-center items-center border border-gray-300"
        >
          <img
            src="https://picsum.photos/100"
            alt="프로필"
            class="w-30 h-30 rounded-full mb-4"
          />
          <div class="w-3/4">
            <AppHeader :type="4" text="이름" class="font-semibold" />
            <AppHeader :type="5" text="이메일" class="font-semibold" />
            <AppHeader :type="5" text="소개" class="font-semibold" />
          </div>
        </div>
        <!-- 정보, 게시글, 회원수정, 등 -->
        <div class="bg-white rounded-xl border border-gray-300 p-2">
          <RouterLink
            :to="{ name: 'User', params: { id: route.params.id } }"
            class="w-full block p-2 flex justify-between"
            ><span class="font-semibold">README.md</span
            ><span class="font-semibold">></span></RouterLink
          >
          <hr />
          <RouterLink
            :to="{ name: 'UserBoard', params: { id: route.params.id } }"
            class="w-full block p-2 flex justify-between"
            ><span class="font-semibold">게시글</span
            ><span class="font-semibold">></span></RouterLink
          >
          <div v-if="checkAdministrator()">
            <hr />
            <RouterLink
              :to="{ name: 'UserInfoSetting', params: { id: route.params.id } }"
              class="w-full block p-2 flex justify-between"
              ><span class="font-semibold">회원정보 수정</span
              ><span class="font-semibold">></span></RouterLink
            >
            <hr />
            <RouterLink
              :to="{
                name: 'UserReadmeSetting',
                params: { id: route.params.id },
              }"
              class="w-full block p-2 flex justify-between"
              ><span class="font-semibold">README.md 수정</span
              ><span class="font-semibold">></span></RouterLink
            >
          </div>
        </div>
      </div>
      <RouterView
        class="col-span-4 bg-white rounded-xl border border-gray-300 p-5 min-h-[450px]"
      />
    </div>
    <div class="col-span-1"></div>
  </div>
</template>
<script setup>
import { RouterView, useRoute } from "vue-router";
import { MainHeader, MainNavigation, AppHeader } from "@/components";
import { useUserStore } from "@/stores/auth";

const route = useRoute();
const userStore = useUserStore();

const checkAdministrator = () => {
  if (route.params.id == userStore.userData.id) {
    return true;
  }
  return false;
};
</script>
<style scoped></style>
