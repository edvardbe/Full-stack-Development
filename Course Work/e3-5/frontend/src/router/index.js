import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

import LoginView from "@/views/LoginView.vue";
import HomeView from '../views/HomeView.vue';
import FeedbackView from '../views/FeedbackView.vue';
import SuccessView from '../views/SuccessView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", 
      name: 'Login',
      component: LoginView },
    {
      path: '/',
      name: 'Home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/feedback',
      name: 'feedback-view',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FeedbackView,
      meta: { requiresAuth: true },
    },
    {
      path: '/success',
      name: 'success-view',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SuccessView,
      meta: { requiresAuth: true },
    },
  ]
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user && to.path !== '/login') {
    next('/login'); // Send ikke-loggede brukere til login
  } else {
    next();
  }
});



export default router
