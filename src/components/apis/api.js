// src/apis/api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://your-api-url.com/api", // API의 기본 URL을 설정하세요.
  headers: {
    "Content-Type": "application/json",
  },
});

// API 요청을 위한 함수들을 정의합니다.
export const getExampleData = async () => {
  try {
    const response = await apiClient.get("/example"); // 엔드포인트를 수정하세요.
    return response.data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
};

export const postExampleData = async (data) => {
  try {
    const response = await apiClient.post("/example", data); // 엔드포인트를 수정하세요.
    return response.data;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
};

// 추가적인 API 요청 함수들을 여기에 작성하세요.
