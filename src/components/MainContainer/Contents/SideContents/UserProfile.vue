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
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
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
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200 mb-2"
      >
        로그인
      </button>
      <RouterLink to="/signup" class="font-semibold text-xs"
        >회원가입</RouterLink
      >
    </form>
  </div>
</template>
<script setup>
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
