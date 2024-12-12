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
              "@/components/MainContainer/Contents/MainContentViews/MainHome.vue"
            ),
        },
        {
          path: "/board",
          component: () =>
            import(
              "@/components/MainContainer/Contents/MainContentViews/MainBoard.vue"
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
          component: () => import("@/views/Ssammunity/SsammunityLayout.vue"),
          children: [
            {
              path: "",
              component: () => import("@/views/Ssammunity/AllPostsView.vue"),
            },
            {
              path: "free",
              component: () => import("@/views/Ssammunity/FreeBoardView.vue"),
            },
            {
              path: "greeting",
              component: () =>
                import("@/views/Ssammunity/GreetingBoardView.vue"),
            },
            {
              path: "anonymous",
              component: () =>
                import("@/views/Ssammunity/AnonymousBoardView.vue"),
            },
            {
              path: "board/:postId",
              name: "BoardDetail",
              component: () => import("@/views/Ssammunity/BoardDetailView.vue"),
              props: true, // URL의 파라미터를 props로 전달
            },
            {
              path: "/board/write",
              name: "PostForm",
              component: () => import("@/views/Ssammunity/PostFormView.vue"),
            },
            {
              path: "/board/edit/:postId",
              name: "PostEdit",
              component: () => import("@/views/Ssammunity/PostFormView.vue"),
            },
          ],
        },
        // 싸뮤니티 게시판 상세 보기

        {
          path: "/info",
          component: () =>
            import(
              "@/components/MainContainer/Contents/MainContentViews/MainInfo.vue"
            ),
        },
        {
          path: "/challenge",
          component: () =>
            import(
              "@/components/MainContainer/Contents/MainContentViews/MainChallenge.vue"
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
              "@/components/MainContainer/Contents/MainContentViews/MainUtil.vue"
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
    },
    {
      path: "/signin",
      name: "Signin",
      component: () => import("@/views/SigninView.vue"),
    },
    {
      path: "/user/:id",
      component: () => import("@/views/MainUser.vue"),
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
});

export default router;
