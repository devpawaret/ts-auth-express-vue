<script setup lang="ts">
import { Toast } from '@/components/ui'

import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()
</script>

<template>
  <template v-if="authStore.isLoading">
    <div class="grid place-items-center min-h-screen z-50">
      <div
        class="size-16 border-t-4 border-primary dark:border-primary-foreground border-opacity-75 rounded-full animate-spin"
      ></div>
    </div>
  </template>

  <template v-else>
    <RouterView />
    <Toast />
  </template>
</template>
