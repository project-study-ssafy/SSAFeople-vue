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
        <span class="font-semibold">회원가입</span></RouterLink
      >
    </form>
    <div
      v-else
      class="w-full max-w-md bg-white p-4 flex flex-col items-center border border-gray-300 rounded-xl"
    >
      <div
        class="flex flex-row w-full justify-center items-center space-x-6 mb-4"
      >
        <img
          src="https://picsum.photos/100"
          alt="프로필"
          class="w-12 h-12 rounded-full"
        />
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-bold text-sm">{{ userData.username }}</span>
            <RouterLink :to="`/user/${userData.id}`" class="text-xs h-fit"
              >마이페이지</RouterLink
            >
          </div>
          <div class="font-medium text-xs mb-2">{{ userData.email }}</div>
        </div>
      </div>
      <AppButton
        button-type="ellipse-filled"
        text="게시글 작성"
        class="w-full mb-2"
      />
      <button @click="logout" class="font-semibold text-xs">로그아웃</button>
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
