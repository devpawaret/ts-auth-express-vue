<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as IconOutline from '@/components/icon/outline'
import { useToast } from '@/composables'

import { logout } from '@/services/auth.service'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const { toast } = useToast()

const authStore = useAuthStore()

const mainRoutes = [
  {
    to: '/',
    name: 'หน้าแรก',
    icon: IconOutline.HomeIcon,
  },
  {
    to: '/list',
    name: 'รายการผู้ใช้',
    icon: IconOutline.BoxIcon,
  },
  {
    to: 'https://www.facebook.com/ppm.pawaret/',
    name: 'ติดต่อ',
    icon: IconOutline.PhoneIcon,
  },
]

const accountRoutes = [
  {
    to: '/login',
    name: 'เข้าสู่ระบบ',
    icon: IconOutline.LoginIcon,
  },
  {
    to: '/register',
    name: 'สมัครสมาชิก',
    icon: IconOutline.UserPlusIcon,
  },
]

const isLoading = ref(false)

const handleLogout = async () => {
  if (isLoading.value) return
  isLoading.value = true

  try {
    const result = await authStore.logout()

    router.push('/')
    toast.success(result.message)
  } catch (err: any) {
    toast.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="sticky px-4 top-5 z-50">
    <div
      class="relative mx-auto px-4 max-w-4xl h-14 bg-background/90 border backdrop-blur-sm rounded-2xl z-40"
    >
      <div class="flex justify-between h-full">
        <nav class="flex items-center justify-center">
          <ul class="group flex items-center justify-center space-x-1 list-none">
            <li v-for="(item, index) in mainRoutes" :key="index" class="text-sm">
              <component
                :is="/^https?:\/\//.test(item.to) ? 'a' : 'RouterLink'"
                v-bind="
                  /^https?:\/\//.test(item.to)
                    ? { href: item.to, target: '_blank', rel: 'noopener noreferrer' }
                    : { to: item.to }
                "
                class="group/menu-item select-none flex items-center px-3 py-2"
              >
                <span
                  class="flex items-center gap-1.5 transition-colors duration-300 group-hover/menu-item:text-primary"
                >
                  <component :is="item.icon" />
                  <span class="sr-only lg:not-sr-only">
                    {{ item.name }}
                  </span>
                </span>
              </component>
            </li>
          </ul>
        </nav>
        <div class="flex items-center justify-center">
          <div
            v-if="authStore.isAuthenticated"
            class="group flex items-center justify-center space-x-1"
          >
            <button
              type="button"
              class="group/menu-item select-none flex items-center px-3 py-2 text-sm"
              @click.prevent="handleLogout"
            >
              <span
                class="flex items-center gap-1.5 transition-colors duration-300 group-hover/menu-item:text-primary"
              >
                <IconOutline.LogoutIcon />
                <span class="sr-only lg:not-sr-only"> ออกจากระบบ </span>
              </span>
            </button>
          </div>
          <ul v-else class="group flex items-center justify-center space-x-1 list-none">
            <li v-for="(item, index) in accountRoutes" :key="index" class="text-sm">
              <RouterLink
                :to="item.to"
                class="group/menu-item select-none flex items-center px-3 py-2"
              >
                <span
                  class="flex items-center gap-1.5 transition-colors duration-300 group-hover/menu-item:text-primary"
                >
                  <component :is="item.icon" />
                  <span class="sr-only lg:not-sr-only">
                    {{ item.name }}
                  </span>
                </span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
