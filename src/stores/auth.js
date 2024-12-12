import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies"; // 쿠키를 관리하기 위한 패키지

const { cookies } = useCookies();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: cookies.get("access-token") || null, // 쿠키에서 토큰 가져오기
  }),
  actions: {
    setToken(token) {
      this.token = token;
      cookies.set("access-token", token, {
        expires: "1d",
        secure: true,
        sameSite: "Lax",
      });
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
