<template>
  <div>
    <!-- v-if 토큰 정보로 조건부 렌더링 -->
    <form
      v-if="!isAuthenticated"
      @submit.prevent="signin"
      class="w-full max-w-md bg-white p-4 flex flex-col items-center border border-gray-300 rounded-xl"
    >
      <img :src="logoImage" alt="logo" />
      <div class="mb-2 font-medium">
        로그인하고 함께 <span class="font-bold">싸피 Play!</span>
      </div>
      <RouterLink to="/signin" class="w-full">
        <AppButton
          button-type="ellipse-filled"
          text="로그인하기"
          class="w-full mb-2"
        />
      </RouterLink>
      <RouterLink to="/signup" class="font-semibold text-xs"
        >계정이 없으신가요?
        <span class="font-semibold text-[var(--ssafy-blue)]"
          >회원가입</span
        ></RouterLink
      >
    </form>
    <div
      v-else
      class="w-full max-w-md bg-white px-6 py-6 flex flex-col items-center border border-gray-300 rounded-xl"
    >
      <div class="flex w-full justify-center items-center space-x-6 mb-4">
        <div class="flex gap-5 justify-start w-full">
          <div class="flex flex-col items-center relative">
            <img
              src="https://picsum.photos/100"
              alt="프로필"
              class="w-[70px] h-[70px] rounded-full mb-1"
            />
            <RouterLink
              :to="`/user/${userData.id}`"
              class="absolute right-[-12px] bottom-[0px] self-end h-fit border-solid border-[var(--ssafy-blue)] border-[0px] px-2 py-1 rounded-[10px] text-gray-500"
            >
              <i
                class="inline-block text-[14px] i bi-gear-fill bg-white w-[24px] h-[24px] text-center leading-[26px] rounded-[100%] drop-shadow-xl"
              >
                <span
                  class="inline-block w-0 h-0 overflow-hidden indent-[-9999px]"
                >
                </span
              ></i>
            </RouterLink>
          </div>
          <div class="flex flex-col items-start flex-grow pt-2">
            <span class="mb-2 font-bold"> {{ userData.username }}</span>
            <div class="absolute top-6 right-6">
              <button @click="logout" class="font-[600px] text-s text-gray-500">
                <span class="inline-block text-[12px] mr-1"> 로그아웃 </span>
              </button>
            </div>
            <div
              class="font-medium w-full text-[10px] text-gray-600 mb-2 bg-gray-100 px-2 py-1 rounded-[5px]"
            >
              {{ userData.email }}
            </div>
          </div>
        </div>
      </div>

      <RouterLink :to="`/board/board/${currentBoardId}/write`" class="w-full">
        <AppButton
          button-type="ellipse-filled"
          text="게시글 작성"
          class="w-full"
        />
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { AppButton } from "@/components";
import { getUserData } from "@/apis";
import { useAuthStore, useUserStore } from "@/stores/auth"; // Pinia 스토어 임포트
import router from "@/router";
import logoImage from "@/assets/logo.svg";

const currentBoardId = ref(0); // 기본값 설정

const authStore = useAuthStore(); // 스토어 인스턴스 생성
const isAuthenticated = computed(() => !!authStore.token); // token이 존재하면 true

const userStore = useUserStore();

const userData = ref({
  id: userStore.userData.id,
  username: userStore.userData.username,
  email: userStore.userData.email,
});

const logout = () => {
  authStore.clearToken();
  removeUserDataFromsession();
  router.push("/");
};

const setUserDataTosession = (userData) => {
  sessionStorage.setItem("userData", JSON.stringify(userData));
};

const removeUserDataFromsession = () => {
  sessionStorage.removeItem("userData");
};

// 컴포넌트가 마운트될 때 토큰이 있으면 유저 정보를 세션 스토리지에 저장
onMounted(async () => {
  if (authStore.token && !sessionStorage.getItem("userData")) {
    try {
      const userDataResponse = await getUserData();
      setUserDataTosession(userDataResponse.data);
      userData.value = userDataResponse.data;
    } catch (error) {
      console.log("유저 데이터를 불러오지 못했습니다.", error);
    }
  } else if (!authStore.token && sessionStorage.getItem("userData")) {
    removeUserDataFromsession();
  }
});
</script>

<style scoped></style>
