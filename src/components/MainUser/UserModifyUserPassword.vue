<template>
  <div class="w-full">
    <AppHeader :type="2" text="비밀번호 수정" class="h-fit" />
    <hr />
    <form
      @submit.prevent="modifyPassword"
      class="w-1/2 mx-auto mt-10 rounded-lg bg-white"
      novalidate
    >
      <div class="my-4">
        <label for="username" class="block text-sm font-extrabold text-gray-700"
          >사용자 이름</label
        >
        <input
          type="text"
          id="username"
          v-model="userData.username"
          :disabled="true"
          required
          :class="{ 'border-red-500': errors.username }"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent h-10"
        />
        <span v-if="errors.username" class="text-red-500 text-sm">{{
          errors.username
        }}</span>
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-extrabold text-gray-700"
          >이메일</label
        >
        <div class="flex items-center">
          <input
            type="email"
            id="email"
            v-model="userData.email"
            autocomplete="off"
            required
            :disabled="true"
            :class="{ 'border-red-500': errors.email }"
            class="mt-1 block basis-4/5 p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent h-10"
          />
          <AppButton
            type="button"
            button-type="ellipse-filled"
            text="인증"
            @click="emailValidation"
            class="basis-1/5 mt-1 ml-2"
            :disabled="status.emailVerify"
          />
        </div>
        <span v-if="errors.email" class="text-red-500 text-sm">{{
          errors.email
        }}</span>
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-extrabold text-gray-700"
          >새로운 비밀번호</label
        >
        <input
          type="password"
          id="password"
          v-model="userData.password"
          autocomplete="off"
          required
          :class="{ 'border-red-500': errors.password }"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent h-10"
        />
        <span
          v-if="errors.password"
          v-html="errors.password"
          class="text-red-500 text-sm"
        ></span>
      </div>

      <div class="mb-4">
        <label
          for="passwordconfirm"
          class="block text-sm font-extrabold text-gray-700"
          >비밀번호 확인</label
        >
        <input
          type="password"
          id="passwordconfirm"
          v-model="userData.passwordconfirm"
          autocomplete="off"
          required
          :class="{ 'border-red-500': errors.passwordconfirm }"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent h-10"
        />
        <span v-if="errors.passwordconfirm" class="text-red-500 text-sm">{{
          errors.passwordconfirm
        }}</span>
      </div>
      <AppButton
        type="submit"
        button-type="ellipse-filled"
        text="저장"
        class="w-full"
      />
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { AppHeader, AppButton } from "@/components";
import Swal from "sweetalert2";
import {
  postEmailVerification,
  postEmailVerificationCodeForPassword,
  modifyUserPassword,
} from "@/apis";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  userInfo: {},
});

const userData = ref({
  password: "",
  passwordconfirm: "",
});

const status = ref({
  emailVerify: false,
  verificationCode: "",
});

onMounted(async () => {
  userData.value = JSON.parse(JSON.stringify(props.userInfo));
  console.log(userData);
});

const errors = ref({
  password: "",
  passwordconfirm: "",
});

const validatePassword = () => {
  // 오류 메시지 초기화
  errors.value = {
    password: "",
    passwordconfirm: "",
  };

  // 유효성 검사

  // 비밀번호: 6~12자, 특수문자 포함
  const passwordPattern = /^(?=.*[\W_]).{6,12}$/;
  if (!passwordPattern.test(userData.value.password)) {
    errors.value.password =
      "비밀번호는 6자리 이상 12자리 이하이며,<br>특수문자가 최소 1개 이상 포함되어야 합니다.";
  }

  // 비밀번호 확인: 6~12자, 특수문자 포함
  if (userData.value.password != userData.value.passwordconfirm) {
    errors.value.passwordconfirm = "비밀번호가 일치하지 않습니다.";
  }

  // 오류가 있는지 확인
  return Object.values(errors.value).some((error) => error !== "");
};

const emailValidation = () => {
  // 이메일 검증코드 받는 요청 들어가야 함
  try {
    const response = postEmailVerificationCodeForPassword(
      JSON.stringify({
        email: userData.value.email,
        username: userData.value.username,
      }),
    );
    console.log(response);
  } catch (error) {
    console.log(error);
    return false;
  }

  // CSS 스타일 추가
  const style = document.createElement("style");
  style.innerHTML = `
    .swal2-title {
      font-size: 24px; /* 원하는 크기로 설정 */
    }
    .swal2-confirm {
      background-color: #3396F4;
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
    preConfirm: async (inputCode) => {
      if (!inputCode) {
        Swal.showValidationMessage("코드를 입력해주세요");
        return false;
      }
      try {
        const response = await postEmailVerification({
          email: userData.value.email,
          code: inputCode,
        });
        return response.data;
      } catch (error) {
        if (error.response) {
          Swal.showValidationMessage(
            `${JSON.stringify(error.response.data.message)}`,
          );
        } else {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        }
        return false;
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
      status.value.emailVerify = true;
    }
  });
};

const modifyPassword = async () => {
  // 유효성 검사
  if (validatePassword()) {
    return; // 유효성 검사에서 오류가 있을 경우 등록 중단
  }

  // 이메일 인증 확인 후 회원가입 진행
  if (status.value.emailVerify) {
    try {
      const response = await modifyUserPassword({
        email: userData.value.email,
        password: userData.value.password,
      });

      Swal.fire({
        icon: "success",
        title: "비밀번호 변경",
        text: "비밀번호 변경 완료되었습니다!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        console.log("비밀번호 변경", response.data);
        router.push(`/user/${route.params.id}`);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "비밀번호 변경 실패",
        text:
          error.response?.data?.message ||
          "문제가 발생했습니다. 다시 시도해주세요.",
      });
      console.error("비밀번호 변경 실패", error.response?.data);
    }
  } else {
    Swal.fire({
      title: "이메일 인증을 완료해주세요!",
      icon: "error",
    });
  }
};
</script>
