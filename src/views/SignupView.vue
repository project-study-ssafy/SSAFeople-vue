<template>
  <div class="grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white">
    <div class="col-span-1"></div>
    <div
      class="col-span-1 flex flex-col items-center justify-center min-h-[700px] bg-white"
    >
      <AppHeader :type="1" text="회원가입" />
      <form
        @submit.prevent="register"
        class="w-full max-w-md p-8 rounded-lg shadow-md"
      >
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700"
            >사용자 이름</label
          >
          <input
            type="text"
            id="username"
            v-model="userData.username"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 h-10"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >이메일</label
          >
          <div class="flex items-center">
            <input
              type="email"
              id="email"
              v-model="userData.email"
              required
              class="mt-1 block basis-4/5 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 h-10"
            />
            <AppButton
              type="ellipse-filled"
              text="인증"
              @click="emailValidation"
              class="basis-1/5 mt-1 ml-2"
            />
          </div>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >비밀번호</label
          >
          <input
            type="password"
            id="password"
            v-model="userData.password"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 h-10"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AppHeader, AppButton } from "@/components";
import Swal from "sweetalert2";

// const status = ref({
//   emailVerify: false,
//   verificationCode: "",
// })

const userData = ref({
  username: "",
  email: "",
  password: "",
});

const register = () => {
  console.log("회원가입 정보", userData.value.username);
};

const emailValidation = () => {
  // CSS 스타일 추가
  const style = document.createElement("style");
  style.innerHTML = `
    .swal2-title {
      font-size: 16px; /* 원하는 크기로 설정 */
    }
  `;
  document.head.appendChild(style);
  let timerInterval;
  const totalTime = 5 * 60 * 1000; // 5분을 밀리초로 변환
  let remainingTime = totalTime;

  Swal.fire({
    title: "이메일로 전송된 인증 코드를 입력해주세요",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    html: "남은 시간: <b></b>",
    showCancelButton: true,
    confirmButtonText: "인증",
    didOpen: () => {
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        remainingTime -= 1000; // 1초 감소
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          Swal.close();
        }
      }, 1000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
    preConfirm: async (login) => {
      if (!login) {
        Swal.showValidationMessage("코드를 입력해주세요");
        return false;
      }
      try {
        const githubUrl = `https://api.github.com/users/${login}`;
        const response = await fetch(githubUrl);
        if (!response.ok) {
          return Swal.showValidationMessage(
            `${JSON.stringify(await response.json())}`,
          );
        }
        return response.json();
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "인증 완료",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};
</script>

<style scoped>
/* 추가적인 스타일이 필요하면 여기에 작성 */
</style>
