import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/layouts/MainLayout.vue"),
      children: [
        {
          path: "/",
          name: "landing-page",
          component: () => import("@/views/LandingPage.vue"),
        },
        // {
        //   path: "dashboard",
        //   name: "dashboard",
        //   component: () => import("@/views/DashboardView.vue"),
        // },
      ],
    },
    // {
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
