import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/layout/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: 'list',
          name: 'List',
          component: () => import('../views/ListView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/auth/LoginView.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('../views/auth/RegisterView.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: '404',
          name: '404',
          component: () => import('../views/PageNotFound.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0, behavior: 'smooth' }
  },
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (authStore.isLoading) {
    try {
      await authStore.refreshToken()
      await authStore.getMe()
    } catch {
      authStore.clearAuth()
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) next({ name: 'Login' })
  else if (to.meta.requiresGuest && authStore.isAuthenticated) next({ name: 'Home' })
  else next()
})

export default router
