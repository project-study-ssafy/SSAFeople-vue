<template>
  <div class="flex flex-col items-center bg-[#ffffff]">
    <form
      @submit.prevent="signin"
      class="w-full max-w-md bg-white p-4 flex flex-col items-center border-[1px] rounded-3xl"
    >
      <div class="mb-2">
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
      <div class="mb-2">
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
