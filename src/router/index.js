// router index.js

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

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
              "@/components/MainView/MainContent/MainContentViews/MainHome.vue"
            ),
        },
        {
          path: "/board",
          component: () =>
            import(
              "@/components/MainView/MainContent/MainContentViews/MainBoard.vue"
            ),
          // beforeEnter: (to, from, next) => {
          //   const authStore = useAuthStore();
          //   if (!authStore.token) {
          //     // 토큰이 없으면 로그인 페이지로 리다이렉트
          //     next({ name: "Signin" });
          //   } else {
          //     // 토큰이 있으면 다음 페이지로 이동
          //     next();
          //   }
          // },
        },
        // 싸뮤니티 게시판 리스트
        {
          // C:\SSAFY\SSAFeople-vue\src\views\Ssammunity\SsammunityLayout.vue
          path: "/ssammunity",
          component: () =>
            import("@/components/MainView/MainUser/UserBoard.vue"),
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
              component: () =>
                import("@/components/MainView/MainUser/UserBoardList.vue"),
            },
            {
              path: "/board/:boardId",
              name: "BoardList",
              component: () =>
                import("@/components/MainView/MainUser/UserBoardList.vue"),
              props: true, // URL 파라미터를 props로 전달
            },
            {
              path: "board/:boardId/:postId",
              name: "BoardDetail",
              component: () =>
                import("@/components/MainView/MainUser/UserBoardDetail.vue"),
              props: true, // URL의 파라미터를 props로 전달
            },
            {
              path: "/board/:boardId/write",
              name: "PostForm",
              component: () =>
                import("@/components/MainView/MainUser/UserBoardPostForm.vue"),
              props: true,
            },
            {
              path: "/board/edit/:boardId/:postId",
              name: "PostEdit",
              component: () =>
                import("@/components/MainView/MainUser/UserBoardPostForm.vue"),
              props: true,
            },
            // {
            //   path: "free",
            //   component: () => import("@/views/Ssammunity/FreeBoardView.vue"),
            // },
            // {
            //   path: "greeting",
            //   component: () =>
            //     import("@/views/Ssammunity/GreetingBoardView.vue"),
            // },
            // {
            //   path: "anonymous",
            //   component: () =>
            //     import("@/views/Ssammunity/AnonymousBoardView.vue"),
            // },
          ],
        },
        // 싸뮤니티 게시판 상세 보기

        {
          path: "/info",
          component: () =>
            import(
              "@/components/MainView/MainContent/MainContentViews/MainInfo.vue"
            ),
        },
        {
          path: "/challenge",
          component: () =>
            import(
              "@/components/MainView/MainContent/MainContentViews/MainChallenge.vue"
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
              "@/components/MainView/MainContent/MainContentViews/MainUtil.vue"
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
      component: () => import("@/views/Home/MainUserView.vue"),
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
        // {
        //   path: "setting-userinfo",
        //   name: "UserInfoSetting",
        //   component: () =>
        //     // import("@/components/MainUser/UserModifyUserData.vue"), // 오류 발생으로 임시 주석 : yeon
        // },
        {
          path: "setting-readme",
          name: "UserReadmeSetting",
          component: () => import("@/components/MainUser/UserModifyReadme.vue"),
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
