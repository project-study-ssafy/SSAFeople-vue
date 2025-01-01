<template>
  <div
    class="col-span-3 grid grid-cols-[1fr_minmax(1148px,_1280px)_1fr] bg-white"
  >
    <div class="col-span-1"></div>
    <div
      class="col-span-1 flex flex-row items-center justify-center min-h-[700px] p-5 m-5 space-x-8"
    >
      <form
        @submit.prevent="signin"
        class="w-full max-w-md p-8 flex flex-col items-center rounded-lg shadow-4way bg-white my-10 basis-1/2"
        novalidate
      >
        <RouterLink
          to="/"
          class="mx-auto flex mb-4 justify-center items-center space-x-2"
        >
          <img :src="LogoImage" alt="로고" />
          <AppHeader :type="1" text="로그인" class="h-fit" />
        </RouterLink>

        <div class="mb-2 w-full">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >이메일</label
          >
          <input
            type="email"
            id="email"
            v-model="signinData.email"
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
            v-model="signinData.password"
            required
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent"
          />
        </div>
        <p v-if="error.message" class="text-red-500 text-xs mb-2">
          {{ error.message }}
        </p>
        <AppButton
          button-type="ellipse-filled"
          text="로그인"
          class="w-full mb-4"
        />
        <RouterLink to="/signup" class="text-xs"
          >계정이 없으신가요?
          <span class="font-semibold">회원가입</span></RouterLink
        >
      </form>
      <img
        :src="communication"
        alt="커뮤니케이션이미지"
        class="max-w-2xl basis-1/2"
      />
    </div>
    <div class="col-span-1"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { AppHeader, AppButton } from "@/components";
import communication from "@/assets/communication.svg";
import { postSignIn, getUserData } from "@/apis";
import { useAuthStore, useUserStore } from "@/stores/auth";
import LogoImage from "@/assets/logo.svg";
import router from "@/router";
import Swal from "sweetalert2";

const error = ref({
  message: "",
});

const validation = () => {
  error.value = {
    message: "",
  };

  // 이메일 형식 검사
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[\W_]).{6,12}$/;

  if (!emailPattern.test(signinData.value.email)) {
    error.value.message = "유효한 이메일 주소를 입력하세요.";
    return;
  } else if (!passwordPattern.test(signinData.value.password)) {
    error.value.message =
      "비밀번호는 특수문자가 최소 1개 이상 포함된 6자리 이상 12자리 이하입니다.";
    return;
  }
  return;
};

const signinData = ref({
  email: "",
  password: "",
});

const authStore = useAuthStore();
const userStore = useUserStore();

const signin = async () => {
  if (validation()) {
    return;
  }

  const style = document.createElement("style");
  style.innerHTML = `
    .swal2-title {
      font-size: 24px; /* 원하는 크기로 설정 */
    }
    .swal2-confirm {
      background-color: #3396F4;
    }
  `;

  try {
    const response = await postSignIn(signinData.value);
    // const token = response.headers["access-token"];

    if (response.data.success) {
      const token = response.headers["access-token"];
      if (token) {
        authStore.setToken(token);
        signinData.value = {
          email: "",
          password: "",
        };
        console.log("토큰이 쿠키에 저장되었습니다.");

        try {
          const userDataResponse = await getUserData();
          userStore.setUserData(userDataResponse.data);
          setUserDataToSession(userDataResponse.data);
          router.push("/");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "로그인 실패",
            text:
              error.response?.data?.message ||
              "문제가 발생했습니다. 다시 시도해주세요.",
          });
          console.log(error);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "로그인 실패",
          text:
            error.value.response?.data?.message ||
            "문제가 발생했습니다. 다시 시도해주세요.",
        });
        console.warn("로그인 성공하였으나 토큰이 없습니다.");
      }
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "로그인 실패",
      text:
        error.response?.data?.message ||
        "문제가 발생했습니다. 다시 시도해주세요.",
    });
    console.log(error);
  }
};

// 기존
// const signin = async () => {
//   // 유효성 검사
//   if (validation()) {
//     return;
//   }

//   try {
//     const response = await postSignIn(signinData.value);

//     if (response.data.success) {
//       const token = response.headers["access-token"];
//       if (token) {
//         authStore.setToken(token);
//         signinData.value = {
//           email: "",
//           password: "",
//         };
//         console.log("로그인 성공. 토큰이 쿠키에 저장되었습니다.");

//         try {
//           const userDataResponse = await getUserData();
//           setUserDataToSession(userDataResponse.data);
//           router.push("/");
//         } catch (error) {
//           console.log(error);
//         }
//       } else {
//         console.warn("로그인 성공하였으나 토큰이 없습니다.");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const setUserDataToSession = (userData) => {
  sessionStorage.setItem("userData", JSON.stringify(userData));
};
</script>

<style scoped>
/* 추가적인 스타일이 필요하면 여기에 작성 */
</style>
