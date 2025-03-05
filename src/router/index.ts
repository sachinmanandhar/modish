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
          meta: {
            title: "Modish Era - Fashion & Style Store",
            description:
              "Your premier destination for fashion, style, and trendy clothing.",
            sitelink: true,
          },
        },
        {
          path: "/product",
          name: "product",
          component: () => import("@/views/ProductView.vue"),
          // children: [
          //   {
          //     path: "",
          //     component: () => import("@/views/ProductView.vue"),
          //     meta: {
          //       title: "Shop All Products - Modish Era",
          //       description: "Browse our collection of trendy fashion items.",
          //       sitelink: true,
          //     },
          //   },
          // ],
        },
        // {
        //   path: "dashboard",
        //   name: "dashboard",
        //   component: () => import("@/views/DashboardView.vue"),
        // },
        {
          path: "/product-detail/:productId",
          name: "product-detail",
          component: () => import("@/views/ProductDetailPage.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("@/views/AboutPage.vue"),
        },

        {
          path: "/checkout",
          name: "checkout",
          component: () => import("@/views/CheckoutView.vue"),
        },
        {
          path: "/faqs",
          name: "faqs",
          component: () => import("@/views/FAQsPage.vue"),
        },
      ],
    },
    // {
    //   path: "/product",
    //   name: "product",
    //   component: () => import("@/views/layouts/NoFooterLayout.vue"),
    //   children: [
    //     {
    //       path: "",
    //       component: () => import("@/views/ProductView.vue"),
    //       meta: {
    //         title: "Shop All Products - Modish Era",
    //         description: "Browse our collection of trendy fashion items.",
    //         sitelink: true,
    //       },
    //     },
    //   ],
    // },
    // {
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If there's a saved position (when using browser back/forward buttons)
      return savedPosition;
    } else {
      // Scroll to top for all other navigation
      return { top: 0 };
    }
  },
});

// Update page title and meta description
router.beforeEach((to, from, next) => {
  // document.title = to.meta?.title ?? 'Modish Era';

  // Type the meta element correctly
  let metaDescription = document.querySelector(
    'meta[name="description"]'
  ) as HTMLMetaElement;
  if (!metaDescription) {
    metaDescription = document.createElement("meta") as HTMLMetaElement;
    metaDescription.name = "description";
    document.head.appendChild(metaDescription);
  }

  next();
});

export default router;
