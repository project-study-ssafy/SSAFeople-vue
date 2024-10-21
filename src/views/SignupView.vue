<template>
  <div class="col-span-1"></div>
  <div
    class="col-span-1 flex flex-col items-center justify-center min-h-[700px] bg-gray-100"
  >
    <h1 class="text-2xl font-bold mb-6">회원가입</h1>
    <form
      @submit.prevent="register"
      class="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
    >
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-gray-700"
          >사용자 이름</label
        >
        <input
          type="text"
          id="username"
          v-model="username"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700"
          >이메일</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700"
          >비밀번호</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        가입하기
      </button>
    </form>
  </div>
  <div class="col-span-1"></div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      // 회원가입 로직 추가
      console.log("회원가입 정보:", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
/* 추가적인 스타일이 필요하면 여기에 작성 */
</style>
