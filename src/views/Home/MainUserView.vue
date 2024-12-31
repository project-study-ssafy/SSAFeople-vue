<template>
  <div class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white">
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
          <div class="text-center">
            <AppHeader
              :type="4"
              :text="userinfo.nickname + ' (' + userinfo.username + ')'"
              class="font-semibold"
            />
            <AppHeader :type="6" :text="userinfo.email" class="font-semibold" />
            <p>{{ userinfo.biography }}</p>
          </div>
        </div>
        <!-- 정보, 게시글, 회원수정, 등 -->
        <div class="bg-white rounded-xl border border-gray-300 p-2">
          <RouterLink
            :to="{ name: 'User', params: { id: route.params.id } }"
            class="w-full p-2 flex justify-between"
            ><span class="font-semibold">README.md</span
            ><span class="font-semibold">></span></RouterLink
          >
          <hr />
          <RouterLink
            :to="{ name: 'UserBoard', params: { id: route.params.id } }"
            class="w-full p-2 flex justify-between"
            ><span class="font-semibold">게시글</span
            ><span class="font-semibold">></span></RouterLink
          >
          <div v-if="checkAdministrator()">
            <hr />
            <RouterLink
              :to="{
                name: 'UserReadmeSetting',
                params: { id: route.params.id },
              }"
              class="w-full p-2 flex justify-between"
            >
              <span class="font-semibold">README.md 수정</span>
              <span class="font-semibold">></span>
            </RouterLink>
            <hr />
            <RouterLink
              :to="{ name: 'UserInfoSetting', params: { id: route.params.id } }"
              class="w-full p-2 flex justify-between"
            >
              <span class="font-semibold">회원정보 수정</span>
              <span class="font-semibold">></span>
            </RouterLink>
            <hr />
            <!-- 비밀번호 변경 추가해야 함 -->
            <RouterLink
              :to="{
                name: 'UserPasswordSetting',
                params: { id: route.params.id },
              }"
              class="w-full p-2 flex justify-between"
            >
              <span class="font-semibold">비밀번호 수정</span>
              <span class="font-semibold">></span>
            </RouterLink>
          </div>
        </div>
      </div>
      <RouterView
        v-slot="{ Component }"
        class="col-span-4 bg-white rounded-xl border border-gray-300 p-5 min-h-[450px]"
        :user-info="userinfo"
        @update-readme="updateReadme"
        @update-user-info="updateUserInfo"
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
      <!-- <RouterView
        class="col-span-4 bg-white rounded-xl border border-gray-300 p-5 min-h-[450px]"
        :user-info="userinfo"
        @update-readme="updateReadme"
        @update-user-info="updateUserInfo"
      /> -->
    </div>
    <div class="col-span-1"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppHeader } from "@/components";
import { useUserStore } from "@/stores/auth";
import { getUserData } from "@/apis";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const userinfo = ref({
  username: "",
  nickname: "",
  email: "로딩 중...",
  biography: "",
});

onMounted(async () => {
  try {
    if (checkAdministrator()) {
      userinfo.value = userStore.userData;
    } else {
      const userDataResponse = await getUserData(route.params.id);
      userinfo.value = userDataResponse.data;
    }
  } catch (error) {
    console.log(error);
    router.push({ name: "NotFound" });
  }
});

const checkAdministrator = () => {
  if (route.params.id == userStore.userData.id) {
    return true;
  }
  return false;
};

const updateReadme = (readme) => {
  userinfo.value.readme = readme;
  userStore.setUserData(userinfo.value);
  sessionStorage.setItem("userData", JSON.stringify(userinfo.value));
  console.log(userStore.userData);
};

const updateUserInfo = (data) => {
  userinfo.value = data;
  userStore.setUserData(userinfo.value);
  sessionStorage.setItem("userData", JSON.stringify(userinfo.value));
  console.log(userStore.userData);
};
</script>
<style scoped></style>
