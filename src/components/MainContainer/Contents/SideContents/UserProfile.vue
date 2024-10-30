<template>
  <div class="flex flex-col items-center bg-[#ffffff]">
    <!-- v-if 토큰 정보로 조건부 렌더링 -->
    <form
      v-if="true"
      @submit.prevent="signin"
      class="w-full max-w-md bg-white p-4 flex flex-col items-center border border-gray-300 rounded-xl"
    >
      <div class="mb-2 w-full">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >이메일</label
        >
        <input
          type="email"
          id="email"
          v-model="userData.email"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent"
        />
      </div>
      <div class="mb-2 w-full">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >비밀번호</label
        >
        <input
          type="password"
          id="password"
          v-model="userData.password"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent"
        />
      </div>
      <AppButton
        button-type="ellipse-filled"
        text="로그인"
        class="w-full mb-2"
      />
      <RouterLink to="/signup" class="font-semibold text-xs"
        >회원가입</RouterLink
      >
    </form>
    <div
      v-else
      class="w-full max-w-md bg-white p-4 flex flex-col items-center border-[1px] rounded-xl"
    >
      <div class="flex flex-row w-full space-x-2 mb-1">
        <img
          src="https://picsum.photos/100"
          alt="프로필"
          class="w-14 h-14 rounded-full"
        />
        <div>
          <div class="font-bold text-sm">risingGyu</div>
          <div class="font-medium text-sm">test@test.com</div>
          <div class="w-full flex flex-row justify-between">
            <RouterLink to="/mypage" class="text-xs">게시글</RouterLink>
            <span class="border-r h-6 border-gray-300"></span>
            <RouterLink to="/mypage" class="text-xs">댓글</RouterLink>
          </div>
        </div>
      </div>
      <AppButton
        button-type="ellipse-filled"
        text="게시글 작성"
        class="w-full"
      />
    </div>
  </div>
</template>
<script setup>
import { AppButton } from "@/components";
import { ref } from "vue";
const userData = ref({
  email: "",
  password: "",
});

const signin = () => {
  console.log(userData.value.email);
  console.log(userData.value.password);
};
</script>
<style scoped></style>
