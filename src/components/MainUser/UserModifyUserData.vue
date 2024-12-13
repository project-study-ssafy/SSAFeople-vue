<template>
  <div class="w-full">
    <AppHeader :type="2" text="회원정보 수정" />
    <hr />
    <form
      @submit.prevent="modifyData"
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
        <label for="nickname" class="block text-sm font-extrabold text-gray-700"
          >닉네임</label
        >
        <input
          type="text"
          id="nickname"
          v-model="userData.nickname"
          autocomplete="off"
          required
          :class="{ 'border-red-500': errors.nickname }"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent h-10"
        />
        <span v-if="errors.nickname" class="text-red-500 text-sm">{{
          errors.nickname
        }}</span>
      </div>

      <div class="mb-4">
        <label
          for="biography"
          class="block text-sm font-extrabold text-gray-700"
          >한 줄 소개</label
        >
        <input
          type="text"
          id="biography"
          v-model="userData.biography"
          autocomplete="off"
          required
          :class="{ 'border-red-500': errors.biography }"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black outline-none focus:bg-transparent h-10"
        />
        <span
          v-if="errors.biography"
          v-html="errors.biography"
          class="text-red-500 text-sm"
        ></span>
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
import { modifyUserData } from "@/apis";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  userInfo: {},
});
const emit = defineEmits(["updateUserInfo"]);

const userData = ref({
  username: "",
  nickname: "",
  biography: "",
});

onMounted(async () => {
  userData.value = JSON.parse(JSON.stringify(props.userInfo));
  console.log(userData);
});

const errors = ref({
  username: "",
  nickname: "",
});

const validateUserData = () => {
  // 오류 메시지 초기화
  errors.value = {
    username: "",
    nickname: "",
  };

  // 유효성 검사
  if (
    !userData.value.username ||
    userData.value.username.length < 2 ||
    userData.value.username.length > 12
  ) {
    errors.value.username = "이름은 2 ~ 12글자까지 가능합니다.";
  }

  if (
    !userData.value.nickname ||
    userData.value.nickname.length < 2 ||
    userData.value.nickname.length > 20
  ) {
    errors.value.nickname = "별명은 2 ~ 20글자까지 가능합니다.";
  }

  if (userData.value.biography && userData.value.biography.length > 255) {
    errors.value.biography = "한줄 소개는 255자까지 가능합니다.";
  }

  // 오류가 있는지 확인
  return Object.values(errors.value).some((error) => error !== "");
};

const modifyData = async () => {
  // 유효성 검사
  if (validateUserData()) {
    return; // 유효성 검사에서 오류가 있을 경우 등록 중단
  }

  try {
    const response = await modifyUserData({
      username: userData.value.username,
      nickname: userData.value.nickname,
      biography: userData.value.biography,
    });

    emit("updateUserInfo", userData.value);

    Swal.fire({
      icon: "success",
      title: "수정 성공",
      text: "회원정보가 수정되었습니다!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.push(`/user/${route.params.id}`);
    });
    return response;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "수정 실패",
      text:
        error.response?.data?.message ||
        "문제가 발생했습니다. 다시 시도해주세요.",
    });
  }
};
</script>
