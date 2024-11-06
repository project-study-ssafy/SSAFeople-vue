import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies"; // 쿠키를 관리하기 위한 패키지

const { cookies } = useCookies();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: cookies.get("access-token") || null, // 쿠키에서 토큰 가져오기
  }),
  actions: {
    setToken(token) {
      this.token = token; // 상태 업데이트
      cookies.set("access-token", token, { expires: "10h" }); // 쿠키에 저장
    },
    clearToken() {
      this.token = null; // 상태 초기화
      cookies.remove("access-token"); // 쿠키 삭제
    },
    isAuthenticated() {
      const cookieToken = cookies.get("access-token");
      if (!cookieToken) {
        this.clearToken();
      }
      return !!cookieToken && !!this.token;
    },
  },
});

export const useUserStore = defineStore("userData", {
  state: () => ({
    userData: JSON.parse(sessionStorage.getItem("userData")) || {
      id: null,
      username: "",
      email: "",
      nickname: "",
      role: "",
    },
  }),
  actions: {
    setUserData(data) {
      this.userData = data;
    },
    clearUserData() {
      this.userData = {
        id: null,
        username: "",
        email: "",
        nickname: "",
        role: "",
      };
    },
  },
});
