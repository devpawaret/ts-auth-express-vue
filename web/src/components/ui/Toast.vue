<script setup lang="ts">
import * as IconOutline from '@/components/icon/outline'
import { useToast } from '@/composables'

const { toasts } = useToast()

const classLists = {
  fill: {
    success: 'fill-green-600',
    error: 'fill-red-600',
    warning: 'fill-yellow-600',
    info: 'fill-blue-600',
  },
  bg: {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  },
  icon: {
    success: IconOutline.CheckCircleIcon,
    error: IconOutline.XCircleIcon,
    info: IconOutline.InfoCircleIcon,
  },
}
</script>

<template>
  <div
    class="fixed pointer-events-none bottom-4 md:bottom-auto md:top-1/2 md:left-aut left-1/2 md:right-4 transform -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2 z-40"
  >
    <div class="flex flex-col items-center md:items-end gap-2">
      <div
        v-for="item in toasts"
        :key="item.id"
        class="relative px-3 py-2 text-xs md:text-sm bg-background/80 dark:bg-background/40 backdrop-blur drop-shadow-2xl border rounded-md animate-fade-slide-up"
        :class="classLists.fill[item.type]"
      >
        <div class="flex items-center gap-2 truncate">
          <component :is="classLists.icon[item.type]" class="mb-0.5" />
          {{ item.message }}
        </div>
        <div
          class="absolute top-1/2 left-0 w-[2px] md:w-[3px] h-1/2 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          :class="classLists.bg[item.type]"
        ></div>
      </div>
    </div>
  </div>
</template>
