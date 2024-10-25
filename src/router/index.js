import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/MainView.vue"),
      children: [
        {
          path: "/board",
          component: () =>
            import("@/components/MainContainer/Contents/Boards/TestBoard.vue"),
        },
        {
          path: "/",
          component: () =>
            import("@/components/MainContainer/Contents/MainHome.vue"),
        },
      ],
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("@/views/SignupView.vue"),
    },
  ],
});

export default router;
