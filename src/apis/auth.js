// src/apis/auth.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_MAIN_API_SERVER_URL, // API의 기본 URL을 설정하세요.
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// API 정의 부분

// 회원가입
export const postRegister = async (data) => {
  try {
    const response = await apiClient.post(import.meta.env.VITE_USERS, data);
    return response.data;
  } catch (error) {
    console.log("API 요청 에러:", error);
    throw error;
  }
};

// 이메일 검증 코드 요청
export const postEmailVerificationCode = async (data) => {
  try {
    console.log(
      import.meta.env.VITE_MAIN_API_SERVER_URL +
        import.meta.env.VITE_SEND_EMAIL_VERIFICATION_CODE,
    );
    // console.log(data)
    const response = await apiClient.post(
      import.meta.env.VITE_SEND_EMAIL_VERIFICATION_CODE,
      data,
    );
    return response.data;
  } catch (error) {
    console.log("API 요청 에러:", error);
    throw error;
  }
};

// 이메일 검증
export const postEmailVerification = async (data) => {
  try {
    const response = await apiClient.post(
      import.meta.env.VITE_EMAIL_VERIFY,
      data,
    );
    return response.data;
  } catch (error) {
    console.log("API 요청 에러:", error);
    throw error;
  }
};

// 로그인
export const postSignIn = async (data) => {
  try {
    const response = await apiClient.post(import.meta.env.VITE_SIGNIN, data);

    return response;
  } catch (error) {
    console.log("API 요청 에러:", error);
    throw error;
  }
};

// 회원 정보 조회
export const getUserData = async () => {
  try {
    const authStore = useAuthStore();
    const token = authStore.token;

    const response = await apiClient.get(import.meta.env.VITE_USERS, {
      headers: {
        "access-token": token, // 헤더에 토큰 추가
      },
    });

    return response.data;
  } catch (error) {
    console.log("API 요청 에러:", error);
    throw error;
  }
};
