import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore, useUserStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/MainView.vue"),
      children: [
        {
          path: "/",
          component: () =>
            import(
              "@/components/MainView/Contents/MainContentViews/MainHome.vue"
            ),
        },
        {
          path: "/board",
          component: () =>
            import(
              "@/components/MainView/Contents/MainContentViews/MainBoard.vue"
            ),
          beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            if (!authStore.token) {
              // 토큰이 없으면 로그인 페이지로 리다이렉트
              next({ name: "Signin" });
            } else {
              // 토큰이 있으면 다음 페이지로 이동
              next();
            }
          },
        },
        {
          path: "/info",
          component: () =>
            import(
              "@/components/MainView/Contents/MainContentViews/MainInfo.vue"
            ),
        },
        {
          path: "/challenge",
          component: () =>
            import(
              "@/components/MainView/Contents/MainContentViews/MainChallenge.vue"
            ),
          beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            if (!authStore.token) {
              // 토큰이 없으면 로그인 페이지로 리다이렉트
              next({ name: "Signin" });
            } else {
              // 토큰이 있으면 다음 페이지로 이동
              next();
            }
          },
        },
        {
          path: "/util",
          component: () =>
            import(
              "@/components/MainView/Contents/MainContentViews/MainUtil.vue"
            ),
          beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            if (!authStore.token) {
              // 토큰이 없으면 로그인 페이지로 리다이렉트
              next({ name: "Signin" });
            } else {
              // 토큰이 있으면 다음 페이지로 이동
              next();
            }
          },
        },
      ],
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/views/SignupView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (!authStore.token) {
          // 토큰이 없으면 로그인 페이지로 리다이렉트
          next();
        } else {
          // 토큰이 있으면 다음 페이지로 이동
          next({ name: "Home" });
        }
      },
    },
    {
      path: "/signin",
      name: "Signin",
      component: () => import("@/views/SigninView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (!authStore.token) {
          // 토큰이 없으면 로그인 페이지로 리다이렉트
          next();
        } else {
          // 토큰이 있으면 다음 페이지로 이동
          next({ name: "Home" });
        }
      },
    },
    {
      path: "/user/:id",
      component: () => import("@/views/MainUserView.vue"),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (!authStore.token) {
          // 토큰이 없으면 로그인 페이지로 리다이렉트
          next({ name: "Signin" });
        } else {
          // 토큰이 있으면 다음 페이지로 이동
          next();
        }
      },
      children: [
        {
          path: "",
          name: "User",
          component: () => import("@/components/MainUser/UserMain.vue"),
        },
        {
          path: "board",
          name: "UserBoard",
          component: () => import("@/components/MainUser/UserBoard.vue"),
        },
        {
          path: "setting-userinfo",
          name: "UserInfoSetting",
          component: () =>
            import("@/components/MainUser/UserModifyUserData.vue"),
          beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            if (to.params.id == userStore.userData.id) {
              next();
            } else {
              next({ name: "NotFound" });
            }
          },
        },
        {
          path: "setting-user-password",
          name: "UserPasswordSetting",
          component: () =>
            import("@/components/MainUser/UserModifyUserPassword.vue"),
          beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            if (to.params.id == userStore.userData.id) {
              next();
            } else {
              next({ name: "NotFound" });
            }
          },
        },
        {
          path: "setting-readme",
          name: "UserReadmeSetting",
          component: () => import("@/components/MainUser/UserModifyReadme.vue"),
          beforeEnter: (to, from, next) => {
            const userStore = useUserStore();
            if (to.params.id == userStore.userData.id) {
              next();
            } else {
              next({ name: "NotFound" });
            }
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*", // 모든 정의되지 않은 경로에 매칭
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;
