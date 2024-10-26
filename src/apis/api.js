// src/apis/api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_MAIN_API_SERVER_URL, // API의 기본 URL을 설정하세요.
  headers: {
    "Content-Type": "application/json",
  },
});

// API 정의 부분

// 회원가입
export const postRegister = async (data) => {
  try {
    const response = await apiClient.post(process.env.VUE_APP_REGISTER, data);
    return response.data;
  } catch (error) {
    console.log("API 요청 에러:", error);
    throw error;
  }
};

// 이메일 검증 코드 요청
export const postEmailVerificationCode = async (data) => {
  try {
    const response = await apiClient.post(
      process.env.VUE_APP_SEND_EMAIL_VERIFICATION_CODE,
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
      process.env.VUE_APP_EMAIL_VERIFY,
      data,
    );
    return response.data;
  } catch (error) {
    console.log("API 요청 에러:", error);
    throw error;
  }
};
