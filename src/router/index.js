import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import About from "@/views/AboutView.vue";
import UserGallery from "@/views/UserGalleryView.vue";
import ShowImage from "@/views/ShowImage.vue";
import useUserStore from "@/stores/user";
import AppPageNotFound from "@/views/AppPageNotFound.vue";
import UploadView from "@/views/UploadView.vue";
import useModalStore from "@/stores/modal";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/my-gallery",
    name: "my-gallery",
    component: UserGallery,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/vectors",
    name: "vectors",
    component: UserGallery,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/music",
    name: "music",
    component: UserGallery,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/ilustrations",
    name: "illustrations",
    component: UserGallery,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/effects",
    name: "effects",
    component: UserGallery,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/upload",
    name: "upload",
    component: UploadView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/show-image/:id",
    name: "show-image",
    component: ShowImage,
  },
  //app not found page
  {
    path: "/not-found",
    name: "not-found",
    component: AppPageNotFound,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "not-found" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "bg-blue-500 text-gray-200",
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  const store = useUserStore();
  const modal = useModalStore();
  if (store.userLoggedIn) {
    next();
  } else {
    modal.registerModal = true;
  }
});

export default router;
