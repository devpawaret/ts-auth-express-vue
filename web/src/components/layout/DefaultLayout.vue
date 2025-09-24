<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main class="overflow-hidden min-h-screen px-6 py-21 sm:py-23 md:py-29 lg:px-16 xl:px-20">
    <RouterView />
  </main>
  <AppFooter />
</template>
